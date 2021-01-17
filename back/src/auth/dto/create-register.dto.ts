import { IsEmail, IsOptional, IsEnum, IsString } from 'class-validator';
import { Provider } from 'src/users/entity/user.entity';

export class CreateRegisterDto {
  @IsEnum(Provider)
  @IsOptional()
  provider?: Provider;

  @IsString()
  @IsOptional()
  social_id?: string;

  @IsEmail()
  email: string;
}
