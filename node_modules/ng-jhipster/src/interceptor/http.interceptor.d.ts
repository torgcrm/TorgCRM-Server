import { Observable } from 'rxjs/Observable';
import { Response, RequestOptionsArgs } from '@angular/http';
/**
 * A HTTP interceptor responsibility chain member is a class, which may react on request and response of all requests
 * done by HTTP.
 */
export declare abstract class JhiHttpInterceptor {
    private _successor;
    successor: JhiHttpInterceptor;
    processRequestInterception(options?: RequestOptionsArgs): RequestOptionsArgs;
    processResponseInterception(response: Observable<Response>): Observable<Response>;
    abstract requestIntercept(options?: RequestOptionsArgs): RequestOptionsArgs;
    abstract responseIntercept(observable: Observable<Response>): Observable<Response>;
}
