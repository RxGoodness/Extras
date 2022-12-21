// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from './../src/app.module';

// describe('AppController (e2e)', () => {
//   let app: INestApplication;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/ (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/')
//       .expect(200)
//       .expect('Hello World!');
//   });
// });
import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(
    async () => {
      const moduleRef =
        await Test.createTestingModule(
          {
            imports:
              [
                AppModule,
              ],
          },
        ).compile();
      const app =
        moduleRef.createNestApplication();
      app.useGlobalPipes(
        new ValidationPipe(
          {
            whitelist:
              true,
          },
        ),
      );
      await app.init();
      await app.listen(
        3333,
      );
      prisma =
        app.get(
          PrismaService,
        );
      await prisma.cleanDb();
      pactum.request.setBaseUrl(
        'http://localhost:3333',
      );
    },
  );
  afterAll(
    () => {
      app.close();
    },
  );
  describe('Auth', () => {
    const dto: AuthDto =
      {
        email:
          'ade@gmail.com',
        password:
          'password',
      };

    describe('Signup', () => {
      it('should throw an error if email is empty', () => {
        () => {
          return pactum
            .spec()
            .post(
              '/auth/sign-up',
            )
            .withBody({
              password: dto.password
            })
            .expectStatus(400);
        }
      });
      it('should throw an error if password is empty', () => {
        () => {
          return pactum
            .spec()
            .post(
              '/auth/sign-up',
            )
            .withBody({
              email: dto.email
            })
            .expectStatus(400);
        }
      });
      it('should throw an error if no body provided', () => {
        () => {
          return pactum
            .spec()
            .post(
              '/auth/sign-up',
            )
            .expectStatus(400);
        }
      });
      it(
        'should sign up',
        () => {
          return pactum
            .spec()
            .post(
              '/auth/sign-up',
            )
            .withBody(
              dto,
            )
            .expectStatus(
              201,
            );
        },
      );
    });
    describe('Login', () => {
      it('should throw an error if email is empty', () => {
        () => {
          return pactum
            .spec()
            .post(
              '/auth/login',
            )
            .withBody({
              password: dto.password
            })
            .expectStatus(400);
        }
      });
      it('should throw an error if password is empty', () => {
        () => {
          return pactum
            .spec()
            .post(
              '/auth/login',
            )
            .withBody({
              email: dto.email
            })
            .expectStatus(400);
        }
      });
      it('should throw an error if no body provided', () => {
        () => {
          return pactum
            .spec()
            .post(
              '/auth/login',
            )
            .expectStatus(400);
        }
      });
      it(
        'should login',
        () => {
          return pactum
            .spec()
            .post(
              '/auth/login',
            )
            .withBody(
              dto,
            )
            .expectStatus(
              200,
            );
        },
      );
    });
  });
  describe('User', () => {
    describe('Get me', () => {});
    describe('Edit user', () => {});
  });
  describe('Bookmarks', () => {
    describe('Create bookmarks', () => {});
    describe('Get bookmarks', () => {});
    describe('Get bookmarks by id', () => {});
    describe('Edit bookmarks', () => {});
    describe('Delete bookmarks', () => {});
  });
  // it.todo('should pass');
  // )
  //  })
});
