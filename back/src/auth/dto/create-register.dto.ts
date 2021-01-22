import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsEnum, IsString } from 'class-validator';
import { Provider } from 'src/users/entity/user.entity';

export class CreateRegisterDto {
  @ApiProperty({ enum: Provider })
  @IsEnum(Provider)
  @IsOptional()
  provider?: Provider;

  @ApiProperty()
  @IsString()
  @IsOptional()
  social_id?: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
