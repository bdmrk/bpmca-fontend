import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

// Env
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    private baseUrl;
    private apiUrl;

    constructor(
        private http: HttpClient
    ) {
        this.baseUrl = environment.base_url;
        this.apiUrl = environment.api_url;
    }

    public get(route): Observable<any> {
        const url = this.apiUrl + route;

        return this.http.get(url);
    }

    public store(route, data): Observable<any> {
        const url = this.apiUrl + route;
        return this.http.post(url, data);
    }

    public update(route, data): Observable<any> {
        const url = this.apiUrl + route;

        return this.http.put(url, data);
    }

    public delete(route): Observable<any> {
        const url = this.apiUrl + route;

        return this.http.delete(url);
    }
}
