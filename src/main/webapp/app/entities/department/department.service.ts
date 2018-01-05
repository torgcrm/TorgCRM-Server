import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Department } from './department.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DepartmentService {

    private resourceUrl =  SERVER_API_URL + 'api/departments';

    constructor(private http: Http) { }

    create(department: Department): Observable<Department> {
        const copy = this.convert(department);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(department: Department): Observable<Department> {
        const copy = this.convert(department);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Department> {
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
     * Convert a returned JSON object to Department.
     */
    private convertItemFromServer(json: any): Department {
        const entity: Department = Object.assign(new Department(), json);
        return entity;
    }

    /**
     * Convert a Department to a JSON which can be sent to the server.
     */
    private convert(department: Department): Department {
        const copy: Department = Object.assign({}, department);
        return copy;
    }
}
