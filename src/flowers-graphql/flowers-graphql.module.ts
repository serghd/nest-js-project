import { Module } from '@nestjs/common';
import { FlowersGraphqlResolver } from './flowers-graphql.resolver';
import { FlowersService } from '../flowers/flowers.service';
import { PrismaService } from '../flowers/prisma.service';

@Module({
   providers: [FlowersGraphqlResolver, FlowersService, PrismaService],
})
export class FlowersGraphqlModule {}
