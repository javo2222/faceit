import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  private static BASEURL = 'https://open.faceit.com/data/v4/';

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', 'Bearer f10d513b-6149-4321-9d81-cc573e1b1a94');
    const request = req.clone({
      url: RequestInterceptor.BASEURL + req.url,
      headers: headers
    });
    return next.handle(request).pipe(tap((ev: HttpEvent<any>) => {
      if (ev['ok']) {
      }
    }));
  }
}
