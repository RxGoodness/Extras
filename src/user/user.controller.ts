import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { get } from 'http';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { EditUserDto } from './dto/edit-user.dto';
// import { EditUserDto } from './dto';

@UseGuards(
  JwtGuard,
)
@Controller(
  'users',
)
export class UserController {
  constructor(private userService:UserService){}
  @Get(
    'me',
  )
  getMe(
    @GetUser()
    user: User,
    // @GetUser(
    //   'email',
    // )
    // email: string,
  ) {
    // console.log(
    //   {
    //     email,
    //   },
    // );
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto:EditUserDto) {
    return this.userService.editUser(userId, dto)
  }
}
