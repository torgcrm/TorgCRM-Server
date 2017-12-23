import { JhiHttpInterceptor } from './http.interceptor';
import { Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, RequestMethod, Request, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
export declare class JhiInterceptableHttp extends Http {
    private firstInterceptor;
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, interceptors: JhiHttpInterceptor[]);
    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response>;
    get(url: string, options?: RequestOptionsArgs): Observable<Response>;
    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>;
    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>;
    delete(url: string, options?: RequestOptionsArgs): Observable<Response>;
    patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response>;
    head(url: string, options?: RequestOptionsArgs): Observable<Response>;
    options(url: string, options?: RequestOptionsArgs): Observable<Response>;
    interceptRequest(url: string, method: RequestMethod, options?: RequestOptionsArgs, body?: any): RequestOptionsArgs;
    interceptResponse(observable: Observable<Response>): Observable<Response>;
}
