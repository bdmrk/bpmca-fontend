import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

// Env
import {environment} from '../../../environments/environment';

// Service
import {StorageService} from './storage.service';
import {HelperService} from './helper.service';

@Injectable({
    providedIn: 'root'
})
export class ApiCommonService {

    private baseUrl;
    private apiUrl;
    private headers = {};
    private fileHeader = {};

    constructor(
        private http: HttpClient,
        private storage: StorageService,
        private helper: HelperService
    ) {
        this.baseUrl = environment.base_url;
        this.apiUrl = environment.api_url;
        this.headers = {headers: this.helper.getAuthHeader()};
    }

    public getHeader() {
        return this.headers;
    }
    public get(route): Observable<any> {
        const url = this.apiUrl + route;
        return this.http.get(url, this.headers);
    }

    public store(route, data): Observable<any> {
        const url = this.apiUrl + route;
        return this.http.post(url, data, this.headers);
    }

    public update(route, data): Observable<any> {
        const url = this.apiUrl + route;
        return this.http.put(url, data, this.headers);
    }

    public delete(route, id): Observable<any> {
        const url = this.apiUrl + route + id;
        return this.http.delete(url, this.headers);
    }

}
