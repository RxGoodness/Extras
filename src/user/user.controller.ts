import { Controller, Get } from '@nestjs/common';
import { get } from 'http';

@Controller('users')
export class UserController {
    @Get('me')
    getMe(){
        return 'user info'
    }

}
