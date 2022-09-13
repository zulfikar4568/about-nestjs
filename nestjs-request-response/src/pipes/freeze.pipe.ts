import {
  ArgumentMetadata,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FreezePipe implements PipeTransform {
  private readonly logger = new Logger(`Ini dari ${FreezePipe.name}`);

  transform(value: any) {
    this.logger.debug(`Freeze Pipe.....`);
    Object.freeze(value);
    return value;
  }
}
