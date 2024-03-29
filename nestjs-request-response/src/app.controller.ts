import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { FreezePipe } from './pipes/freeze.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @UseGuards(AuthGuard) //Eksekusi Guards level Controller
  // @UseInterceptors(LoggingInterceptor) //Eksekusi Interceptor level Controller
  // @UseFilters(HttpExceptionFilter) //Eksekusi Filter level Controller
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  contohPost(@Body(new FreezePipe()) body: any) {
    body.test = 32; //Object Body di freeze, sehingga tidak bisa menambahkan properti
  }

  @Get('error')
  throwError() {
    throw new InternalServerErrorException();
  }
}
