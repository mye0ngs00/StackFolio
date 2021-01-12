import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import {User} from "../entity/user.entity"
import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    // @Get()
    // getAll(): User[] {

    //     // return this.userService.getAll();
    // }


}
