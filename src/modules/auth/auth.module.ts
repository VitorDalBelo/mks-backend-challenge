import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service/auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from './services/users.service/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessToken } from './entities/access-token.entity';
import { User } from './entities/user.entity';
import { BasicAuthStrategy } from './strategies/basic.strategy';
import { JwtAuthStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import "dotenv/config"

@Module({
  imports:[
    TypeOrmModule.forFeature([AccessToken,User]),
    JwtModule.register({
      signOptions:{expiresIn:"3600s"},
      secret:process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService,BasicAuthStrategy,JwtAuthStrategy],
})
export class AuthModule {}
