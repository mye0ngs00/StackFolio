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
// @UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @ApiOperation(docs.get['users'].operation)
  @ApiOkResponse(docs.get['users'].response[200])
  @ApiBadRequestResponse(docs.get['users'].response[400])
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

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
  @UseGuards(JwtAuthGuard)
  @ApiOperation(docs.get['followers/:user_id'].operation)
  @ApiOkResponse(docs.get['followers/:user_id'].response[200])
  @ApiBadRequestResponse(docs.get['followers/:user_id'].response[400])
  @ApiUnauthorizedResponse(docs.unauthorized)
  getFollowers(@Param('user_id') userId: string): Promise<User[]> {
    return this.usersService.getFollowers(userId);
  }

  @Get('followings/:user_id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation(docs.get['followings/:user_id'].operation)
  @ApiOkResponse(docs.get['followings/:user_id'].response[200])
  @ApiBadRequestResponse(docs.get['followings/:user_id'].response[400])
  @ApiUnauthorizedResponse(docs.unauthorized)
  getFollowings(@Param('user_id') userId: string): Promise<User[]> {
    return this.usersService.getFollowings(userId);
  }
  //팔로잉 하기
  @Get('following/:user_id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation(docs.get['following/:user_id'].operation)
  @ApiOkResponse(docs.get['following/:user_id'].response[200])
  @ApiBadRequestResponse(docs.get['following/:user_id'].response[400])
  @ApiUnauthorizedResponse(docs.unauthorized)
  getFollowing(@Req() req, @Param('user_id') userId: string) {
    return this.usersService.getFollowing(req.user, userId);
  }
  //팔로잉 끊기(언팔)
  @Delete('following/:user_id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation(docs.get['following/:user_id'].operation)
  @ApiOkResponse(docs.get['following/:user_id'].response[200])
  @ApiBadRequestResponse(docs.get['following/:user_id'].response[400])
  @ApiUnauthorizedResponse(docs.unauthorized)
  unFollowing(@Req() req, @Param('user_id') userId: string) {
    return this.usersService.unFollowing(req.user.id, userId);
  }
  //팔로워 끊기
  @Delete('follower/:user_id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation(docs.delete['follower/:user_id'].operation)
  @ApiOkResponse(docs.delete['follower/:user_id'].response[200])
  @ApiBadRequestResponse(docs.delete['follower/:user_id'].response[400])
  @ApiUnauthorizedResponse(docs.unauthorized)
  unFollower(@Req() req, @Param('user_id') userId: string) {
    return this.usersService.unFollower(req.user.id, userId);
  }

  //   @Post('follow/:user_id')
  //   @UseGuards(JwtAuthGuard)
  //   @ApiOperation(docs.get['following/user_id'].operation)
  //   @ApiOkResponse(docs.get['following/user_id'].response[200])
  //   @ApiBadRequestResponse(docs.get['following/user_id'].response[400])
  //   @ApiUnauthorizedResponse(docs.unauthorized)
  //   @HttpCode(200)
  //   follow(@Param('user_id') userId: string): User {
  //     /** @todo */
  //     return {} as any;
  //   }

  //   @Post('unfollow/:user_id')
  //   @UseGuards(JwtAuthGuard)
  //   @ApiOperation(docs.get['following/user_id'].operation)
  //   @ApiOkResponse(docs.get['following/user_id'].response[200])
  //   @ApiBadRequestResponse(docs.get['following/user_id'].response[400])
  //   @ApiUnauthorizedResponse(docs.unauthorized)
  //   @HttpCode(200)
  //   unfollow(@Param('user_id') userId: string): User {
  //     /** @todo */
  //     return {} as any;
  //   }
  @Get('favorites')
  @UseGuards(JwtAuthGuard)
  @ApiOperation(docs.get['favorites'].operation)
  @ApiOkResponse(docs.get['favorites'].response[200])
  @ApiUnauthorizedResponse(docs.unauthorized)
  getFavorites(@Req() req) {
    /** @todo */
    return this.usersService.getFavorites(req.user.id);
  }

  @Get('favorite/:post_id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation(docs.get['favorite/:post_id'].operation)
  @ApiOkResponse(docs.get['favorite/:post_id'].response[200])
  @ApiBadRequestResponse(docs.get['favorite/:post_id'].response[400])
  @ApiUnauthorizedResponse(docs.unauthorized)
  addFavorite(@Req() req, @Param('post_id') post_id: string) {
    return this.usersService.addFavorite(req.user.id, post_id);
  }
  @Delete('favorite/:favorite_id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation(docs.delete['favorite/:favorite_id'].operation)
  @ApiOkResponse(docs.delete['favorite/:favorite_id'].response[200])
  @ApiBadRequestResponse(docs.delete['favorite/:favorite_id'].response[400])
  @ApiUnauthorizedResponse(docs.unauthorized)
  deleteFavorite(@Req() req, @Param('favorite_id') favorite_id: string) {
    return this.usersService.deleteFavorite(req.user.id, favorite_id);
  }

  @Delete('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation(docs.delete['user'].operation)
  @ApiOkResponse(docs.delete['user'].response[200])
  @ApiUnauthorizedResponse(docs.unauthorized)
  deleteUser(@Req() req): Promise<User> {
    return this.usersService.deleteUser(req.user);
  }
}
