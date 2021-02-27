import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateCommentQuestionDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsNumber()
  @IsOptional()
  group?: number;

  @IsNumber()
  @IsOptional()
  sorts?: number;

  @IsNumber()
  @IsOptional()
  depth?: number;

  @IsString()
  contents: string;

}
