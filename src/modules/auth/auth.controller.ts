import { Controller, Post, Body, UseGuards, Req, HttpCode } from '@nestjs/common';
import { AuthService } from './services/auth.service/auth.service';
import { ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { BadRequest, Conflict, InternalServerError, LoginOk, Unauthorized, UserCreated } from '../../helpers/serverResponses';
import { Request } from 'express';
import { SignupAuthDto } from './dto/auth-dtos/signup-auth.dto';
import { User } from './entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('basic'))
  @ApiResponse(LoginOk)
  @ApiResponse(Unauthorized)
  @ApiResponse(BadRequest)
  @ApiResponse(InternalServerError)
  @ApiSecurity("basic")
  @Post("login")
  @HttpCode(200)
  async login(@Req() req : Request) {
    const user = req.user as User;
    return this.authService.login(user);
  }

  @ApiResponse(UserCreated)
  @ApiResponse(BadRequest)
  @ApiResponse(InternalServerError)
  @ApiResponse(Conflict)
  @Post("signup")
  async signup(@Body() singupAuthDto: SignupAuthDto) {

    await SignupAuthDto.validate(singupAuthDto);

    return await this.authService.signup(singupAuthDto)
  }

  @ApiSecurity('JWT')
  @ApiResponse(LoginOk)
  @ApiResponse(Unauthorized)
  @ApiResponse(BadRequest)
  @ApiResponse(InternalServerError)
  @Post("/refresh")
  async refresh(@Req() req : Request){
    const oldToken = req.headers.authorization.replace("Bearer ","");
    return await this.authService.refresh(oldToken);
  }

}
