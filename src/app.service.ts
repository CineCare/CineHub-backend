import { Injectable, Response } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello, my experimental world!';
  }
}
