import { IsEmail, IsNumber, IsString } from 'class-validator';

export class DeleteUserDTO { //local로 회원가입?
  @IsEmail()
  readonly email: string;

//   @IsString()
//   readonly password: string;
  //   @IsHash()
}