import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Deal } from './deal.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DealService {

    private resourceUrl = SERVER_API_URL + 'api/deals';

    constructor(private http: Http) { }

    create(deal: Deal): Observable<Deal> {
        const copy = this.convert(deal);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(deal: Deal): Observable<Deal> {
        const copy = this.convert(deal);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Deal> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Deal.
     */
    private convertItemFromServer(json: any): Deal {
        const entity: Deal = Object.assign(new Deal(), json);
        return entity;
    }

    /**
     * Convert a Deal to a JSON which can be sent to the server.
     */
    private convert(deal: Deal): Deal {
        const copy: Deal = Object.assign({}, deal);
        return copy;
    }
}
