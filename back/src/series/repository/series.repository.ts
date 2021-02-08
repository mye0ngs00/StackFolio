import { EntityRepository, Repository } from 'typeorm';
import { Series } from '../entity/series.entity';

@EntityRepository(Series)
export class SeriesRepository extends Repository<Series> {
  async createSeries() {}
}
