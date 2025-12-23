import { Injectable, Scope } from '@nestjs/common';

@Injectable({
   scope: Scope.REQUEST,
})
export class ScopedService {
   getMessage(): string {
      return 'This is a scoped service message';
   }
}
