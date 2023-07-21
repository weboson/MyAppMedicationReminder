import { Injectable } from '@nestjs/common';

@Injectable() // декоратора 
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
