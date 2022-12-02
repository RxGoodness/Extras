import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";
// import { AuthDto } from "./dto/auth.dto";
import { AuthDto } from "./dto";

@Controller ( 'auth' )	
export class AuthController {
    constructor (private authService: AuthService) {
        // this.authService.test ();
    }
    @Post('sign-up')
    signUp (@Body() dto:AuthDto) {
        // return "I want to sign up here";
        // console.log(req.body)
        console.log({
            dto
        })
        return this.authService.signUp(

        )
    }

    @Post('login')
        login()
         {
            return this.authService.login ();
            // return "I log in here";
        }

}