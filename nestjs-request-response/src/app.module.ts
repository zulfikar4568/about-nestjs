import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { FreezePipe } from './pipes/freeze.pipe';
import { RequestService } from './request.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    RequestService,
    {
      provide: APP_GUARD, //Guard untuk level provider, jika di taruh di app.module akan menjadi global
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR, //Interceptor untuk level provider, jika di taruh di app.module akan menjadi global
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor,
    },
    // {
    //   provide: APP_INTERCEPTOR, //Pipe untuk level provider, jika di taruh di app.module akan menjadi global
    //   useClass: FreezePipe
    // },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }
}
