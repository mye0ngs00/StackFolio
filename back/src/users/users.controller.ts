import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserProfile } from './entity/user-profile.entity';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';
import docs from './users.docs';

@ApiTags('Users')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Invalid or missing token' })
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation(docs.get['profile'].operation)
  @ApiOkResponse(docs.get['profile'].response[200])
  @ApiBadRequestResponse(docs.get['profile'].response[400])
  getUserProfile(@Req() req): Promise<UserProfile> {
    return this.usersService.getUserProfile(req.user.id);
  }

  @Patch('profile')
  @ApiOperation(docs.patch['profile'].operation)
  @ApiOkResponse(docs.patch['profile'].response[200])
  @ApiBadRequestResponse(docs.patch['profile'].response[400])
  updateUserProfile(
    @Req() req,
    @Body() data: UpdateUserDto,
  ): Promise<UserProfile> {
    return this.usersService.updateUserProfile(req.user.id, data);
  }

  @Delete('')
  @ApiOperation(docs.delete.operation)
  @ApiOkResponse(docs.delete.response[200])
  deleteUser(@Req() req): Promise<User> {
    return this.usersService.deleteUser(req.user);
  }
}
