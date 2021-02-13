import { EntityRepository, Repository } from 'typeorm';
import { Series_posts } from '../entity/series_post.entity';

@EntityRepository(Series_posts)
export class SeriesPostsRepository extends Repository<Series_posts> {
  async createSeriesPosts() {}
}
