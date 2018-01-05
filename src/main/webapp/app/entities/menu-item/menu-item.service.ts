import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { MenuItem } from './menu-item.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MenuItemService {

    private resourceUrl = SERVER_API_URL + 'api/menu-items';

    constructor(private http: Http) { }

    create(menuItem: MenuItem): Observable<MenuItem> {
        const copy = this.convert(menuItem);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(menuItem: MenuItem): Observable<MenuItem> {
        const copy = this.convert(menuItem);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<MenuItem> {
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
     * Convert a returned JSON object to MenuItem.
     */
    private convertItemFromServer(json: any): MenuItem {
        const entity: MenuItem = Object.assign(new MenuItem(), json);
        return entity;
    }

    /**
     * Convert a MenuItem to a JSON which can be sent to the server.
     */
    private convert(menuItem: MenuItem): MenuItem {
        const copy: MenuItem = Object.assign({}, menuItem);
        return copy;
    }
}
