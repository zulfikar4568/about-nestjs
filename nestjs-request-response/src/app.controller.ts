import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @UseGuards(AuthGuard) //Eksekusi Guards level Controller
  // @UseInterceptors(LoggingInterceptor) //Eksekusi Interceptor level Controller
  getHello(): string {
    return this.appService.getHello();
  }
}
