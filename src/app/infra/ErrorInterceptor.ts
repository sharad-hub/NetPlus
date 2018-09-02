import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                    if (error instanceof HttpErrorResponse) {
                        if (error.status === 401) {
                            return throwError(error.statusText);
                        }
                        const applixationError = error.headers.get('Application-Error');
                        if (applixationError) {
                            console.log(applixationError);
                            return throwError(applixationError);
                        }
                        const serverError = error.error;
                        let modelStateError = '';
                        if (serverError && typeof serverError === 'object') {
                            for (const key in serverError)   {
                                if (serverError[key]) {
                                    modelStateError += serverError[key] + '\n';
                                }
                            }
                        }
                        return throwError(modelStateError || serverError || 'server error');
                    }
            })
        );
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}
