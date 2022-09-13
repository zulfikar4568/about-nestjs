import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { RequestService } from 'src/request.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(`Ini dari ${LoggingInterceptor.name}`);

  constructor(private readonly requestService: RequestService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const userAgent = request.get('user-agent') || '';
    const { ip, method, path: url } = request;

    this.logger.log(
      `${method} - ${url} - ${ip}: Controller: (${
        context.getClass().name
      }) | Handler Route (${context.getHandler().name}) terpanggil...`,
    );

    this.logger.debug(`userId: ${this.requestService.getUserId()}`);

    const now = Date.now();
    return next.handle().pipe(
      tap((res) => {
        const response = context.switchToHttp().getResponse();

        const { statusCode } = response;
        const contentLength = response.get('content-length');

        this.logger.log(
          `${method} - ${url} - ${statusCode} - ${contentLength}: ${userAgent} ${ip} ${
            Date.now() - now
          }ms`,
        );

        this.logger.debug(`Response: ${res}`);
      }),
    );
  }
}
