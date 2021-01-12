import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
// import * as entities  from "../entity/index";
import { Repository } from 'typeorm';
import {CreateUserDto} from "../dto/create-user.dto";
import { UpdateUserDto } from 'src/dto/update-user.dto';

@Injectable()
export class UsersService {
    @InjectRepository(User) 
    private readonly users: Repository<User>
    // private readonly
    // @InjectRepository()


    async getOne(email: string): Promise<User | undefined>{
        return this.users.findOne({email});
        // return this.users.find(user => user.name === name);
    }

}
