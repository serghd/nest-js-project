import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FlowersModule } from './flowers/flowers.module';
import { LoggerMiddleware } from './conceptions/middleware';
import { ConfigModule } from '@nestjs/config';
import { MicroserviceModule } from './microservice/microservice.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { FlowersGraphqlModule } from './flowers-graphql/flowers-graphql.module';
import { WebsocketGateway } from './websocket.gateway';

@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
      }),
      FlowersModule,
      MicroserviceModule,
      GraphQLModule.forRoot<ApolloDriverConfig>({
         driver: ApolloDriver,
         autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
         sortSchema: true,
         subscriptions: {
            'graphql-ws': true,
         },
      }),
      FlowersGraphqlModule,
   ],
   controllers: [AppController],
   providers: [AppService, WebsocketGateway],
})
export class AppModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes('flowers');
   }
}
