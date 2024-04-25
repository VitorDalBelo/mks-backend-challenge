import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository : Repository<Movie>
  ){}
  async create(createMovieDto: CreateMovieDto) {
    return await this.movieRepository.save(createMovieDto);
  }

  async findAll() {
    const movies = await this.movieRepository.find();
    if (movies.length == 0) throw new NotFoundException("O id informado não corresponde ao id de nenhum filme cadastrado");
    return movies;
  }

  async findOne(id: number) {
    const movie = await this.movieRepository.findOne({where:{id}});
    if (!movie) throw new NotFoundException("O id informado não corresponde ao id de nenhum filme cadastrado");
    return movie;
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
