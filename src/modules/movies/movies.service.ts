import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisService } from '../../config/redis';

@Injectable()
export class MoviesService {
  constructor(
    private readonly redis : RedisService,
    @InjectRepository(Movie)
    private readonly movieRepository : Repository<Movie>
  ){}
  async create(createMovieDto: CreateMovieDto) {
    return await this.movieRepository.save(createMovieDto);
  }

  async findAll() {
    const cachedMovies = await this.redis.get('movies');
    if (!cachedMovies) {
      const movies = await this.movieRepository.find();
      if (movies.length == 0) throw new NotFoundException("Nenhum filme cadastrado");
      else await this.redis.set('movies', JSON.stringify(movies), 'EX', 15);
      // cache com validade de 15 segundos para fins demonstrativos
      return movies;
    }
    console.log('\x1b[36m%s\x1b[0m', 'From Cache');
    return JSON. parse (cachedMovies) ;
  }

  async findOne(id: number) {
    const cachedMovie = await this.redis.get('movie'+id);
    if (!cachedMovie) {
      const movie = await this.movieRepository.findOne({where:{id}});
      if (!movie) throw new NotFoundException("O id informado não corresponde ao id de nenhum filme cadastrado");
      else await this.redis.set('movie'+id, JSON.stringify(movie), 'EX', 60);
      // cache com validade de 15 segundos para fins demonstrativos
      return movie;
    }
    console.log('\x1b[36m%s\x1b[0m', 'From Cache');
    return JSON. parse (cachedMovie) ;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.findOne(id);
    Object.assign(movie,updateMovieDto);
    return await this.movieRepository.save(movie);
  }

  async remove(id: number) {
    return await this.movieRepository.delete(id);
  }
}
