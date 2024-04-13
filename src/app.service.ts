import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    let test = 'test';
    console.log('test');
    return 'Hello, my experimental world!';
  }
}
