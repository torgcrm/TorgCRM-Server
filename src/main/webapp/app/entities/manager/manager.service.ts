import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Manager } from './manager.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ManagerService {

    private resourceUrl =  SERVER_API_URL + 'api/managers';

    constructor(private http: Http) { }

    create(manager: Manager): Observable<Manager> {
        const copy = this.convert(manager);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(manager: Manager): Observable<Manager> {
        const copy = this.convert(manager);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Manager> {
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
     * Convert a returned JSON object to Manager.
     */
    private convertItemFromServer(json: any): Manager {
        const entity: Manager = Object.assign(new Manager(), json);
        return entity;
    }

    /**
     * Convert a Manager to a JSON which can be sent to the server.
     */
    private convert(manager: Manager): Manager {
        const copy: Manager = Object.assign({}, manager);
        return copy;
    }
}
