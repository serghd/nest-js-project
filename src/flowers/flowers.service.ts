import { Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { Flower } from '../../generated/prisma';
import { PrismaService } from './prisma.service';
import { CreateFlowersDto, UpdateFlowersDto } from 'src/dto/flowers.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FlowersService {
   constructor(
      private readonly prisma: PrismaService,
      private readonly configService: ConfigService,
   ) {}

   findAll(): Promise<Flower[]> {
      return this.prisma.flower.findMany();
   }

   create(dto: CreateFlowersDto): Promise<Flower> {
      return this.prisma.flower.create({
         data: dto,
      });
   }

   remove(id: number) {
      return this.prisma.flower.delete({
         where: {
            id: id,
         },
      });
   }

   update(id: number, dto: UpdateFlowersDto): Promise<Flower> {
      console.log(`Updating flower with ID: ${id}`);
      return this.prisma.flower.update({
         where: {
            id: id,
         },
         data: dto,
      });
   }
}
