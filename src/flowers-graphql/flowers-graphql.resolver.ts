import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { FlowersService } from '../flowers/flowers.service';
import { FlowerInput, FlowerModel } from './flower.model';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver()
export class FlowersGraphqlResolver {
   constructor(private readonly flowersService: FlowersService) {}

   @Query(() => [FlowerModel], { name: 'all_flowers' })
   async getFlowers(): Promise<FlowerModel[]> {
      return this.flowersService.findAll();
   }

   @Mutation(() => FlowerModel, { name: 'update_flower' })
   async updateFlower(@Args('flower') obj: FlowerInput): Promise<FlowerModel> {
      const res = await this.flowersService.update(obj.id, obj);
      pubSub.publish('flowerUpdated', { flowerUpdated: res });
      return res;
   }

   @Subscription(() => FlowerModel, { name: 'flowerUpdated' })
   subscribeToFlowerUpdated() {
      return pubSub.asyncIterableIterator('flowerUpdated');
   }
}
