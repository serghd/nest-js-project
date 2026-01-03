import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
   constructor(private readonly appService: AppService) {}

   @Get()
   sendMessage() {
      this.appService.sendMessage();
      return 'Message sent!';
   }

   @Get('send-message2')
   sendMessage2() {
      this.appService.logMessage2();
      return 'Message2 sent!';
   }

   @Get('call-worker')
   callWorker() {
      this.appService.callWorker();
   }
}
