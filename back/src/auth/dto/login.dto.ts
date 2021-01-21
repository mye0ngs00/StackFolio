import { ApiProperty } from '@nestjs/swagger';
import { UserProfile } from 'src/users/entity/user-profile.entity';
import { AccessTokenDto } from './acess-token.dto';

export class LoginDto extends AccessTokenDto {
  @ApiProperty({
    description: 'JWT access key',
  })
  profile: UserProfile;
}
