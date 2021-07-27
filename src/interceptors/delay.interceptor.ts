import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Response } from 'express';

@Injectable()
export class DelayInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const res :Response = ctx.getResponse();
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => {
            res.setHeader('Delay', `${Date.now() - now}ms`);
        }),
      );
  }
}
