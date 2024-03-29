import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RequestService } from 'src/request.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private readonly logger = new Logger(
    `Ini dari ${AuthenticationMiddleware.name}`,
  );

  constructor(private readonly requestService: RequestService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.debug(req.headers);
    this.logger.debug(res);
    this.logger.log(`Eksekusi ${AuthenticationMiddleware.name}`);

    //Authentication the Req
    const userId = '123';
    this.requestService.setUserId(userId);
    req.headers.info = 'Ini dari middleware';
    res.statusMessage = 'Ini dari middleware';

    next();
  }
}
