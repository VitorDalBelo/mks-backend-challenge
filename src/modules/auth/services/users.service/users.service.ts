import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, QueryFailedError, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(User)
      private readonly userRepository : Repository<User>
    ){}
  
    async create(user: DeepPartial<User> ) : Promise<User>{
      
      return await this.userRepository.save(user)
      .then(newUser=>newUser)
      .catch(error=>{
        if (error instanceof QueryFailedError && error.driverError.code === '23505') {
          throw new ConflictException('Já existe um usuário com este email.');
        } 
        else throw error;
      })
    }

  
    async findOne(email: string) {
      return await this.userRepository.findOne({where:{email}});
    }
  
  }
