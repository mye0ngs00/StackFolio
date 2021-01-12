import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
        ){}

    async validateUser(email: string): Promise<any>{
        const user = await this.userService.getOne(email);
        if (user) {
            const {...result} = user;
            return result;
        }
        return null;
    }
    async login(user: any) {
        const payload = {username: user.username, sub: user.id}
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async googleLogin(req){
        if (!req.user){
            return "No User from google"
        }
        return {
            message: "User information from google",
            user: req.user
        }
    }
}
