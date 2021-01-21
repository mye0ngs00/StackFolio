import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The register code sent from server to verify a user',
  })
  @IsString()
  register_code: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(3, 50)
  username: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  bio?: string;
}
