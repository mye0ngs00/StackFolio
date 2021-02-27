import { Verification } from 'src/auth/entity/verification.entity';
import {
  EntityRepository,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { QuestionComment } from '../entity/question-comment.entity';
import { CreateCommentQuestionDto } from '../dto/create_comment_question';
import { UserProfile } from 'src/users/entity/user-profile.entity';
import { Question } from '../entity/question.entity';

@EntityRepository(QuestionComment)
export class QuestionCommentRepository extends Repository<QuestionComment> {
  async createQuestionComment(userId: string, question_id: string, data: CreateCommentQuestionDto) {
    const questionCommentRepository = getRepository(QuestionComment);
    const questionRepository = getRepository(Question);
    const userProfileRepository = getRepository(UserProfile);

    const {id, group, sorts, depth, contents} = data;

    const question = await questionRepository.findOne({id: question_id});
    if (!question) {
      throw new NotFoundException("댓글 달 질문글이 존재 하지않습니다.");

    }
    const user = await userProfileRepository.findOne({user_id: userId});
    if (!user) {
      throw new NotFoundException("댓글 달 유저가 존재 하지않습니다.");
    }

  //   1. SELECT NVL(MIN(SORTS),0) FROM QuestionComment
  //  WHERE  BGROUP = (원글의 GROUP)
  //  AND SORTS > (원글의 SORTS)
  //  AND DEPTH <= (원글의 DEPTH)

  // 대댓글이 아닌 깊이가 0인 댓글인 경우
  if (!group){

    const {max} = await questionCommentRepository
    .createQueryBuilder("questioncomment")
    .select("MAX(questioncomment.group)")
    .where(`questioncomment.question_id = :question_id`, {question_id: question_id})
    .getRawOne();

    let comment = new QuestionComment();
    comment.group = max + 1;
    // comment.sorts = ;
    // comment.depth = ;
    comment.contents = contents;
    comment.user_id = userId;
    comment.question_id = question_id;

    console.log(comment);
    await questionCommentRepository.save(comment);
    return comment;
  } else {
    // .from("QuestionComment", "comment")
    // NVL함수 사용 어떻게?
    let sorts_num = await questionCommentRepository
      .createQueryBuilder("comment")
      .select("NVL(MIN(sorts), 0)")
      .where(`comment.group = :group AND comment.sorts >= :sorts AND comment.depth <= :depth`, {group: group, sorts: sorts, depth: depth})
      .getRawOne();

      console.log("sorts_num : -------------");
      console.log(sorts_num);

    // if (sorts_num = 0) {
      //3. SELECT NVL(MAX(SORTS),0) + 1 FROM BOARD 
    // WHERE BGROUP = (원글의 BGROUP);

    // 4. INSERT INTO BOARD VALUES 
    //    (번호, (원글의 BGROUP), (3번값), (원글의 DEPTH +1) ,' 제목')
    // } else {
      //3. UPDATE BOARD SET SORTS = SORTS + 1 
  // WHERE BGROUP =  (원글의 BGROUP)  AND SORTS >= (1번값)

  // 4. INSERT INTO BOARD VALUES 
  //    (번호, (원글의 BGROUP), (1번값), (원글의 DEPTH +1) ,' 제목')
    }
    // let comment = new QuestionComment();
  
    // comment.group = ;
    // comment.sorts = ;
    // comment.depth = ;
    // comment.contents = ;

    // comment.user_id = userId;
    // comment.question_id = question_id;
  
  
    // console.log(comment);
    // await questionCommentRepository.save(comment);
  }

    


  }
