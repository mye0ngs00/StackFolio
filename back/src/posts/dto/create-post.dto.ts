import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  contents: string;
}
