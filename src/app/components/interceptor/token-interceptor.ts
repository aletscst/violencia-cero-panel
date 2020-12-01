import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { respLogin } from 'src/app/models/login-model';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        
        if (localStorage.getItem('user') !== null) {
            let usr:respLogin = JSON.parse(localStorage.getItem('user'));
            request = request.clone({
                setHeaders: {
                    'Authorization': 'Bearer '+usr.token
                }
            });
            //console.log(usr.token)
        }

        return next.handle(request);
    }
}