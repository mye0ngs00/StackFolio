import { Verification } from 'src/auth/entity/verification.entity';
import {
  EntityRepository,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { QuestionComment } from '../entity/question-comment.entity';
import { CreateCommentQuestionDto } from '../dto/create_comment_question';
import { UserProfile } from 'src/users/entity/user-profile.entity';
import { Question } from '../entity/question.entity';

@EntityRepository(QuestionComment)
export class QuestionCommentRepository extends Repository<QuestionComment> {
  async createQuestionComment(
    userId: string,
    question_id: string,
    data: CreateCommentQuestionDto,
  ) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const questionCommentRepository = getRepository(QuestionComment);
      const questionRepository = getRepository(Question);
      const userProfileRepository = getRepository(UserProfile);

      const { id, group, sorts, depth, contents } = data;

      const question = await questionRepository.findOne({ id: question_id });
      if (!question) {
        throw new NotFoundException('댓글 달 질문글이 존재 하지않습니다.');
      }
      const user = await userProfileRepository.findOne({ user_id: userId });
      if (!user) {
        throw new NotFoundException('댓글 달 유저가 존재 하지않습니다.');
      }

      // 대댓글이 아닌 깊이가 0인 댓글인 경우
      if (!group) {
        const { max } = await questionCommentRepository
          .createQueryBuilder('questioncomment')
          .select('MAX(questioncomment.group)')
          .where(`questioncomment.question_id = :question_id`, {
            question_id: question_id,
          })
          .getRawOne();

        const comment = new QuestionComment();
        comment.group = max + 1;
        // comment.sorts = ;
        // comment.depth = ;
        comment.contents = contents;
        comment.user_id = userId;
        comment.question_id = question_id;

        console.log(comment);
        // await questionCommentRepository.save(comment);
        await queryRunner.manager.save(comment);

        // return comment;
      } else {
        //대댓글

        // .from("QuestionComment", "comment")
        // NVL함수 사용 어떻게?

        //   1. SELECT NVL(MIN(SORTS),0) FROM QuestionComment
        //  WHERE  BGROUP = (원글의 GROUP)
        //  AND SORTS > (원글의 SORTS)
        //  AND DEPTH <= (원글의 DEPTH)
        //----------
        // 쿼리 빌더
        let { min } = await questionCommentRepository
          .createQueryBuilder('comment')
          .select('MIN(sorts)')
          .where(
            `comment.group = :group AND comment.sorts > :sorts AND comment.depth <= :depth`,
            { group: group, sorts: sorts, depth: depth },
          )
          .getRawOne();

        min = min ?? 0;

        console.log('--------min------ : ', min);
        //-----------------
        // 생쿼리
        // let min = await questionCommentRepository.query(
        //   `SELECT NVL(MIN(sorts), 0) FROM question_comment WHERE group = ${group} AND sorts >= ${sorts} AND depth <= ${depth}`,
        // );
        if (min === 0) {
          //3. SELECT NVL(MAX(SORTS),0) + 1 FROM BOARD
          // WHERE GROUP = (원글의 BGROUP);

          // 4. INSERT INTO BOARD VALUES
          //    (번호, (원글의 GROUP), (3번값), (원글의 DEPTH +1) ,' 제목')

          let {
            max: max_2,
          } = await questionCommentRepository
            .createQueryBuilder('comment')
            .select('MAX(sorts)')
            .where('comment.group = :group', { group: group })
            .getRawOne();

          console.log('-----------------Before max--------', max_2);

          //   max_2 = (max_2 ?? 0) + 1;

          //-------------------
          // 생쿼리
          //   const max = await questionCommentRepository.query(`
          //         SELECT NVL(MAX(sorts), 0) + 1 FROM question_comment WHERE group = ${group}
          //   `);
          console.log('-----------------After max--------', max_2);
          const comment = new QuestionComment();
          //id 는 자동생성
          comment.group = group;
          comment.sorts = (max_2 ?? 0) + 1;
          //   comment.sorts = max + 1;
          comment.depth = depth + 1;
          comment.contents = contents;

          comment.user_id = userId;
          comment.question_id = question_id;

          console.log('1번', comment);

          //   await questionCommentRepository.save(comment);
          await queryRunner.manager.save(comment);
        } else {
          //3. UPDATE BOARD SET SORTS = SORTS + 1
          // WHERE GROUP =  (원글의 BGROUP)  AND SORTS >= (1번값)

          // 4. INSERT INTO BOARD VALUES
          //    (번호, (원글의 BGROUP), (1번값), (원글의 DEPTH +1) ,' 제목')

          //-------------------------------
          // 왜 + 1이 안될까?
          try {
            // await questionCommentRepository
            //   .createQueryBuilder()
            //   .update(QuestionComment)
            //   //   .set({ sorts: sorts + 1 })
            //   .set({ sorts: () => '"sorts" + 1' })
            //   .where('"group" = :group AND sorts >= :sorts', {
            //     group: group,
            //     sorts: sorts,
            //   })
            //   .execute();
            // ---------------------------
            //   생쿼리 ? 에러 : group에 쌍따움표로 안감싸면 오류 왜? // 쿼리빌더로 하면 제대로 실행안됨 왜?
            await questionCommentRepository.query(
              `UPDATE question_comment SET sorts = sorts + 1 WHERE "group" = ${group} AND "sorts" >= ${min}`,
            );
          } catch (error) {
            console.error(error);
          }

          const comment = new QuestionComment();

          //id 는 자동생성
          comment.group = group;
          comment.sorts = min;
          comment.depth = depth + 1;
          comment.contents = contents;

          comment.user_id = userId;
          comment.question_id = question_id;

          console.log('2번', comment);
          //   await questionCommentRepository.save(comment);

          await queryRunner.manager.save(comment);
        }
        //   await questionCommentRepository.save(comment);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
