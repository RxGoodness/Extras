import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { get } from 'http';

@Controller('users')
export class UserController {
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMe(){
        return 'user info'
    }

}
