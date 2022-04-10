import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
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
  await app.listen(3000);
}
bootstrap();
