import {Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessToken } from '../../entities/access-token.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users.service/users.service';
import { SignupAuthDto } from '../../dto/auth-dtos/signup-auth.dto';
import { User } from '../../entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  
  constructor(
    private usersService : UsersService,
    private jwtService : JwtService,
    @InjectRepository(AccessToken)
    private readonly accessTokenRepository : Repository<AccessToken>
    ){}
    
    async validadeUser(email: string, password: string) {
      const user = await this.usersService.findOne(email);
      if(!user) throw new UnauthorizedException("Email incorreto.");
      const hashValidate = await bcrypt.compare(password , user.hashpassword).catch(e=> {throw new UnauthorizedException("Email or password incorrect")} )
      if(!hashValidate) throw new UnauthorizedException("Senha incorreta.");
      return user;
    }
    
    async signup(singupAuthDto: SignupAuthDto) {
      const user = {
        name:singupAuthDto.name,
        email:singupAuthDto.email,
        hashpassword: await bcrypt.hash(singupAuthDto.password,10)
      };
  
      const newUser =  await this.usersService.create(user);
  
      return this.login(newUser);
    }

    async login(user:User) {
      const {hashpassword,...getUserDto} = user;
      const response ={
        access_token: this.jwtService.sign(getUserDto),
        user:getUserDto
      }
  
      const accessTokenEntity:AccessToken =  this.accessTokenRepository.create({token:response.access_token,user_id:user.user_id});
  
       this.accessTokenRepository.insert(accessTokenEntity)
       .catch(()=>{
        this.accessTokenRepository.update(user.user_id,{token:response.access_token})
        .catch(e=>console.log(e))
       })
  
      return response;
    }

    async refresh(oldToken:string)  {
      const token = await this.jwtService.verifyAsync(oldToken)
      .then(async resp=>{
        const {iat,exp,...user} = this.jwtService.decode(oldToken) as any;
        return {
          access_token: oldToken ,
          user
        }
      })
      .catch(async e=>{
        return null
      })
  
      if(token) return token
      else{
        const accessTokenEntity : any = await this.accessTokenRepository.findOne({where:{token:oldToken},relations:["user_id"],relationLoadStrategy:"query"});
        if(!accessTokenEntity || !accessTokenEntity.user_id) throw new NotFoundException("No users found with this email");
        const user = {...accessTokenEntity.user_id};
        return await this.login(user);
      }
    }

}
