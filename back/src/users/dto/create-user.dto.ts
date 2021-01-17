import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  register_code: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(3, 50)
  username: string;

  @IsString()
  @IsOptional()
  bio?: string;
}
