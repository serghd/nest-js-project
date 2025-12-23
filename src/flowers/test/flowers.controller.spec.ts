import { Test } from '@nestjs/testing';
import { FlowersController } from '../flowers.controller';
import { FlowersService } from '../flowers.service';

describe('FlowersController', () => {
   let controller: FlowersController;

   beforeEach(async () => {
      const module = await Test.createTestingModule({
         controllers: [FlowersController],
         providers: [
            {
               provide: FlowersService,
               useValue: {
                  findAll: jest.fn().mockResolvedValue([
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
         ],
      }).compile();

      controller = module.get<FlowersController>(FlowersController);
   });

   test('should return an array of the flowers', async () => {
      expect(await controller.findAll()).toEqual([
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
         await controller.create({
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
