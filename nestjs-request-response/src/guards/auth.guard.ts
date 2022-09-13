import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(`Ini dari ${AuthGuard.name}`);

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.log(`Eksekusi ${AuthGuard.name}`);
    const request = context.switchToHttp().getRequest();
    const requestRPC = context.switchToRpc().getContext();
    this.logger.debug(request.headers);
    this.logger.debug(context.switchToHttp().getResponse().statusMessage);
    this.logger.debug(requestRPC);

    //Jika di beri false, akan menjadi forbidden 403
    return true;
  }
}
