import { Injectable, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";

@Injectable ()
export class AuthService {
    constructor(private prisma:PrismaService){}
    // test () {}
    // @Post('login')
     // @Post('signup')
     signUp(dto: AuthDto) {
        return {msg:"I signup here"};
    }
    
    login () {
        return "I log in here";
    }

}