import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token'); // get the token from local storage
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      request = request.clone({
        setHeaders: {
          authtoken: token,
          userId
        }
      });
    }
    return next.handle(request);
  }
}
