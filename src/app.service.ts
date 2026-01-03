import { Injectable } from '@nestjs/common';
import {
   ClientProxy,
   ClientProxyFactory,
   Transport,
} from '@nestjs/microservices';
import { Worker } from "worker_threads";

@Injectable()
export class AppService {
   private client: ClientProxy;
   private worker: Worker;

   constructor() {
      this.client = ClientProxyFactory.create({
         transport: Transport.TCP,
         options: {
            host: 'localhost',
            port: 8877,
         },
      });

      this.worker = new Worker("./dist/workers/worker.js");
      this.worker.on("message", msg => {
         console.log(`Worker message: ${msg}`);
      });
   }

   sendMessage() {
      this.client.emit('message', 'New order #234211111!');
   }

   logMessage2() {
      console.log("log message2: !!!!!!!!!!!!");
   }

   callWorker() {
      this.worker.postMessage(21);
   }
}
