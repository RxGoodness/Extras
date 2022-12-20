import {
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

@UseGuards(
  JwtGuard,
)
@Controller(
  'users',
)
export class UserController {
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
  editUser() {}
}
