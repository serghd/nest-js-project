import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class FlowersDynamicModule {
   static forRoot(options: any): DynamicModule {
      return {
         module: FlowersDynamicModule,
         providers: [{ provide: 'FLOWERS_OPTIONS', useValue: options }],
      };
   }
}
