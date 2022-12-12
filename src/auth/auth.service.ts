import { ForbiddenException, Injectable, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable ()
export class AuthService {
    constructor(private prisma:PrismaService){}
    // test () {}
    // @Post('login')
     // @Post('signup')
    
     async signUp(dto: AuthDto) {
         // Generate Password Hash
     const hash = await argon.hash(dto.password)
   try{
     //Save the new user in the db
     const user = await this.prisma.user.create({
        data: {
            email: dto.email,
            hash,
        },
        // select: {
        //     id: true,
        //     email: true,
        //     createdAt: true
        // }
     });
     
     delete user.hash
     // Return the saved user
     return user
    }
    catch (error){

        if(error instanceof PrismaClientKnownRequestError){
            if(error.code === 'P2002'){
                throw new ForbiddenException('Credentials taken')
            }
        }
        throw error;
    };

        // return {msg:"I signup here"};
    }
    
    login () {
        return "I log in here";
    }

}