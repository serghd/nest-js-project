import { Injectable } from '@nestjs/common';

@Injectable()
export class MicroserviceService {
   handleMessage(message: any) {
      console.log('microservice: ', message);
   }
}
