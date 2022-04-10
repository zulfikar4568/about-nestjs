import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { FreezePipe } from './pipes/freeze.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Gunakan ini untuk di aplikasikan secara global, jika ada Dependency Injection seperti middleware ini tidak akan bekerja secara baik, jika ada DI gunakan di provider app.module saja agar menjadi global
  // app.useGlobalGuards(new AuthGuard());

  //Gunakan ini untuk di aplikasikan secara global, jika ada Dependency Injection seperti middleware ini tidak akan bekerja secara baik, jika ada DI gunakan di provider app.module saja agar menjadi global
  // app.useGlobalInterceptors(new LoggingInterceptor());
  
  //Gunakan ini untuk di aplikasikan secara global, jika ada Dependency Injection seperti middleware ini tidak akan bekerja secara baik, jika ada DI gunakan di provider app.module saja agar menjadi global
  // app.useGlobalPipes(new FreezePipe());

  //Gunakan ini untuk di aplikasikan secara global, jika ada Dependency Injection seperti middleware ini tidak akan bekerja secara baik, jika ada DI gunakan di provider app.module saja agar menjadi global
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
