import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UpdateUserDTO {
    @IsEmail()
    readonly email: string;
    @IsString()
    readonly username: string;
}