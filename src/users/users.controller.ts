import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get('hello')
    async hello() {
      return "hello there";
    }

}
