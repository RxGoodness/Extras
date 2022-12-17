import {
  ForbiddenException,
  Injectable,
  Post,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}
  // test () {}
  // @Post('login')
  // @Post('signup')

  async signUp(
    dto: AuthDto,
  ) {
    // Generate Password Hash
    const hash =
      await argon.hash(
        dto.password,
      );
    try {
      //Save the new user in the db
      const user =
        await this.prisma.user.create(
          {
            data: {
              email:
                dto.email,
              hash,
            },
            // select: {
            //     id: true,
            //     email: true,
            //     createdAt: true
            // }
          },
        );

    //   delete user.hash;
      // Return the saved user
    //   return user;
    return this.signToken(user.id, user.email)

    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (
          error.code ===
          'P2002'
        ) {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }
      throw error;
    }

    // return {msg:"I signup here"};
  }

  async login(
    dto: AuthDto,
  ) {
    // Find the user by email
    // const user = await this.prisma.user.findUnique({
    //     where: {
    //         // email:
    //     },
    // });
    const user =
      await this.prisma.user.findFirst(
        {
          where:
            {
              email:
                dto.email,
            },
        },
      );
    // If user does not exist, throw exception
    if (
      !user
    )
      throw new ForbiddenException(
        'Credentials incorrect',
      );

    //Compare password
    const pwMatches =
      await argon.verify(
        user.hash,
        dto.password,
      );
    // If password incorrect, throw exception
    if (
      !pwMatches
    )
      throw new ForbiddenException(
        'Credentiails incorrect',
      );

    //Send back the user
    // delete user.hash;
    // return user;
    return this.signToken(user.id, user.email)
    // return "I log in here";
  }
  signToken(
    userId: number,
    email: string,
  ): Promise<string> {
    const payload = {
        sub: userId, email
    }
    const secret = this.config.get('JWT_SECRET')
    return this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: secret
    })
  }
}
