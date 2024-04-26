import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { RedisService } from '../../config/redis';

@Module({
  imports:[TypeOrmModule.forFeature([Movie])],
  controllers: [MoviesController],
  providers: [MoviesService,RedisService],
})
export class MoviesModule {}
