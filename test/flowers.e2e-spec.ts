import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { create } from 'domain';
import { response } from 'express';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('FlowersController (e2e)', () => {
   let app: INestApplication;

   beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
         imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      app.useGlobalPipes(new ValidationPipe());
      await app.init();
   });

   test('/flowers (GET)', () => {
      return request(app.getHttpServer())
         .get('/flowers')
         .set('Authorization', 'secret')
         .expect(200)
         .expect([
            {
               id: 1,
               name: 'Rose',
               color: 'Red',
               price: 10,
               createdAt: '2025-06-16T14:38:55.908Z',
               updatedAt: '2025-06-16T14:38:55.908Z',
            },
            {
               id: 2,
               name: 'Lily',
               color: 'White',
               price: 12,
               createdAt: '2025-06-16T14:40:10.432Z',
               updatedAt: '2025-06-16T14:40:10.432Z',
            },
            {
               id: 3,
               name: 'Tulip',
               color: 'Yellow',
               price: 5,
               createdAt: '2025-06-16T14:40:28.746Z',
               updatedAt: '2025-06-16T14:40:28.746Z',
            },
         ]);
   });

   test('/flowers (POST)', () => {
      // return request(app.getHttpServer())
      //    .post('/flowers/create')
      //    .set('Authorization', 'secret')
      //    .send({
      //       name: 'Sunflower',
      //       color: 'Yellow',
      //       price: 8,
      //    })
      //    .expect(201)
      //    .expect((response) => {
      //       console.log('Response:', response.body);
      //       return response.body.name === 'Sunflower';
      //    });
   });

   afterAll(async () => {
      await app.close();
   });
});
