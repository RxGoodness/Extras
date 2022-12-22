import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  prisma,
  PrismaClient,
} from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(
    config: ConfigService,
  ) {
    super(
      {
        datasources:
          {
            db: {
              url: config.get(
                'DATABASE_URL',
              ),
            },
          },
      },
    );
  }
    cleanDb(){
        return this.$transaction([
            this.bookmark.deleteMany(),
            this.user.deleteMany()
        ])

    }
    // console.log(
    //   'çonfig',
    //   config.get(
    //     'DATABASE_URL',
    //   ),
    // );
    // prisma.user.findMany()
//   }
}
