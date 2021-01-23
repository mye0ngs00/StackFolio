import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
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
import { PostInformation } from 'src/posts/entity/post-information.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile/:user_id')
  @ApiOperation(docs.get['profile/:user_id'].operation)
  @ApiOkResponse(docs.get['profile/:user_id'].response[200])
  @ApiBadRequestResponse(docs.get['profile/:user_id'].response[400])
  getUserProfile(@Param('user_id') userId: string): Promise<UserProfile> {
    return this.usersService.getUserProfile(userId);
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation(docs.patch['profile'].operation)
  @ApiOkResponse(docs.patch['profile'].response[200])
  @ApiBadRequestResponse(docs.patch['profile'].response[400])
  @ApiUnauthorizedResponse(docs.unauthorized)
  updateUserProfile(
    @Req() req,
    @Body() data: UpdateUserDto,
  ): Promise<UserProfile> {
    return this.usersService.updateUserProfile(req.user.id, data);
  }

  @Get('followers/:user_id')
  @ApiOperation(docs.get['followers/:user_id'].operation)
  @ApiOkResponse(docs.get['followers/:user_id'].response[200])
  @ApiBadRequestResponse(docs.get['followers/:user_id'].response[400])
  getFollowers(@Param('user_id') userId: string): Promise<User[]> {
    return this.usersService.getFollowers(userId);
  }

  @Get('following/:user_id')
  @ApiOperation(docs.get['following/user_id'].operation)
  @ApiOkResponse(docs.get['following/user_id'].response[200])
  @ApiBadRequestResponse(docs.get['following/user_id'].response[400])
  getFollowing(@Param('user_id') userId: string): Promise<User[]> {
    return this.usersService.getFollowers(userId);
  }

  @Get('favorites')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation(docs.get['favorites'].operation)
  @ApiOkResponse(docs.get['favorites'].response[200])
  @ApiUnauthorizedResponse(docs.unauthorized)
  getFavorites(@Req() req): Promise<PostInformation[]> {
    /** @todo */
    return {} as any;
  }

  @Post('follow/:user_id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiBearerAuth()
  follow(@Param('user_id') userId: string): User {
    /** @todo */
    return {} as any;
  }

  @Post('unfollow/:user_id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @ApiBearerAuth()
  unfollow(@Param('user_id') userId: string): User {
    /** @todo */
    return {} as any;
  }

  @Delete('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation(docs.delete.operation)
  @ApiOkResponse(docs.delete.response[200])
  @ApiUnauthorizedResponse(docs.unauthorized)
  deleteUser(@Req() req): Promise<User> {
    return this.usersService.deleteUser(req.user);
  }
}
