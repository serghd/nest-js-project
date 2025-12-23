import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateFlowersDto {
   @IsString()
   @ApiProperty({
      example: 'Rose',
      required: true,
   })
   name: string;

   @IsString()
   @ApiProperty({
      example: 'Red',
      required: true,
   })
   color: string;

   @IsNumber()
   @ApiProperty({
      example: 5,
      required: true,
   })
   price: number;
}

export type UpdateFlowersDto = Partial<CreateFlowersDto>;
