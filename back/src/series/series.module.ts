import { Module } from '@nestjs/common';
import { SeriesService } from './series.service';

@Module({
  providers: [SeriesService],
  exports: [SeriesService],
})
export class SeriesModule {}
