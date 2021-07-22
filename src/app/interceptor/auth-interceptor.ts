import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TokenService } from '../service/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.

    if (req.url.includes('login')) {
      // console.log(req.url);
      return next.handle(req);
    }

    const authToken = this.tokenService.userToken;
    const newHeaders = { Token: `Bearer ${authToken}` };
    const authReq = req.clone({
      setHeaders: newHeaders,
    });

    console.log('hello interceptor test');

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
