import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { CreateQuestionDto } from './create-question.dto';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}
