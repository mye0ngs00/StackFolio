import { Controller, Get } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService){}

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}
