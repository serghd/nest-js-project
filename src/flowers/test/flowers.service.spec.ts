import { Test } from '@nestjs/testing';
import { FlowersService } from '../flowers.service';
import { PrismaService } from '../prisma.service';
import { ConfigService } from '@nestjs/config';

describe('FlowersService', () => {
   let service: FlowersService;

   beforeEach(async () => {
      const module = await Test.createTestingModule({
         providers: [
            FlowersService,
            {
               provide: PrismaService,
               useValue: {
                  flower: {
                     findMany: jest.fn().mockResolvedValue([
                        {
                           id: 1,
                           name: 'Rose',
                           color: 'Red',
                           price: 10,
                        },
                     ]),
                     create: jest.fn().mockResolvedValue({
                        id: 2,
                        name: 'Lily',
                        color: 'White',
                        price: 15,
                     }),
                  },
               },
            },
            {
               provide: ConfigService,
               useValue: {},
            },
         ],
      }).compile();

      service = module.get<FlowersService>(FlowersService);
   });

   test('should return an array of flowers', async () => {
      expect(await service.findAll()).toEqual([
         {
            id: 1,
            name: 'Rose',
            color: 'Red',
            price: 10,
         },
      ]);
   });

   test('should create a new flower', async () => {
      expect(
         await service.create({
            name: 'Lily',
            color: 'White',
            price: 15,
         }),
      ).toEqual({
         id: 2,
         name: 'Lily',
         color: 'White',
         price: 15,
      });
   });
});
