import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AccessTokenDto {
  @ApiProperty({
    description: 'JWT access key',
  })
  @IsString()
  accessToken: string;
}
