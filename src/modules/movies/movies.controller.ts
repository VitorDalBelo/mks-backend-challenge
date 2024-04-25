import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException,HttpCode, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { BadRequest, GetMovie, GetMovies, InternalServerError, MovieCreated, NoContent, NotFound, Unauthorized } from 'src/helpers/serverResponses';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiResponse(MovieCreated)
  @ApiResponse(InternalServerError)
  @ApiResponse(BadRequest)
  @ApiResponse(Unauthorized)
  @ApiSecurity('JWT')
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    await CreateMovieDto.validate(createMovieDto)
    return await this.moviesService.create(createMovieDto);
  }

  @ApiResponse(GetMovies)
  @ApiResponse(InternalServerError)
  @ApiResponse(NotFound)
  @ApiResponse(Unauthorized)
  @ApiSecurity('JWT')
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @ApiResponse(GetMovie)
  @ApiResponse(InternalServerError)
  @ApiResponse(NotFound)
  @ApiResponse(BadRequest)
  @ApiResponse(Unauthorized)
  @ApiSecurity('JWT')
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    if(!id || !(/^\d+$/.test(id))) throw new BadRequestException("Paremetro id inválido, deve-se passar um numero inteiro");
    return this.moviesService.findOne(+id);
  }

  @ApiResponse(GetMovie)
  @ApiResponse(InternalServerError)
  @ApiResponse(NotFound)
  @ApiResponse(BadRequest)
  @ApiResponse(Unauthorized)
  @ApiSecurity('JWT')
  @UseGuards(AuthGuard('jwt'))  
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    if(!id || !(/^\d+$/.test(id))) throw new BadRequestException("Paremetro id inválido, deve-se passar um numero inteiro");
    await UpdateMovieDto.validate(updateMovieDto)
    return this.moviesService.update(+id, updateMovieDto);
  }

  @ApiResponse(NoContent)
  @ApiResponse(InternalServerError)
  @ApiResponse(BadRequest)
  @ApiResponse(Unauthorized)
  @ApiSecurity('JWT')
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if(!id || !(/^\d+$/.test(id))) throw new BadRequestException("Paremetro id inválido, deve-se passar um numero inteiro");
    
    return this.moviesService.remove(+id);
  }
}
