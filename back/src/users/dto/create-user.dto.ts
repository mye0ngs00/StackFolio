import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The register code sent from server to verify a user',
    example: '213AfsadfRRE',
  })
  @IsString()
  register_code: string;

  @ApiProperty({ example: 'john@doe.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'gopher' })
  @IsString()
  @Length(3, 50)
  username: string;

  @ApiProperty({ required: false, example: "Hi I'm a student" })
  @IsString()
  @IsOptional()
  bio?: string;
}
