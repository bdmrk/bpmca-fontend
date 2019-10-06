import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

// Env
import {environment} from "../../../environments/environment";

// Service
import {StorageService} from "./storage.service";

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    private baseUrl = '';
    private apiUrl = '';

    constructor(
        private http: HttpClient,
        private storage: StorageService,
    ) {
        this.baseUrl = environment.base_url;
        this.apiUrl = environment.api_url;
    }

    public isAuthorized(): boolean {
        const token = this.storage.getAccessToken();
        return !!token;
    }

    public getAuthHeader() {
        const headers = new HttpHeaders()
            .set('Authorization', 'Bearer ' + this.storage.getAccessToken());
        if (headers) {
            return headers;
        }
    }

    public refreshToken(): any {
        //
    }

    public me(): Observable<any> {
        return this.http.get(this.baseUrl + '/api/auth/me', {headers: this.getAuthHeader()});
    }

    public saveAccessData(accessToken) {
        this.storage
            .setAccessToken(accessToken);
    }
    public dateDiff(fromDate,toDate)
    {
        const date1 = fromDate;
        const date2 = toDate;
        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays;

    }
}
