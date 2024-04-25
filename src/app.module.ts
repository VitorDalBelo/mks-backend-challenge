import { Module } from '@nestjs/common';
import { MoviesModule } from './modules/movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './config/datasource';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
      inject: [DatabaseConfigService]
    }),
    MoviesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
