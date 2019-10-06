import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    testBrowser: boolean;
    constructor(
        @Inject(PLATFORM_ID) platformId: string) {
        this.testBrowser = isPlatformBrowser(platformId);
    }
    public getAccessToken(): any {
        if (this.testBrowser) {
            return localStorage.getItem('accessToken');
        }
        else
            return;
    }

    public setAccessToken(token): any {
        localStorage ? localStorage.setItem('accessToken', token) : "";
        return this;
    }

    public getUserData(): any {
        const token = this.getAccessToken();
        if (token) {
            const payload = this.payload(token);
            const userData = { 'id': payload.id, 'name': payload.name, 'email': payload.email, 'type': payload.type, 'profile_image': payload.profile_image };
            return userData;
        }
    }

    public payload(token): any {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    }

    public clear(): any {
        localStorage ? localStorage.removeItem('accessToken') : '';
    }

    public setOthersData(data, key_name): any {

        localStorage ? localStorage.setItem(key_name, JSON.stringify(data)) : '';

    }

    public getOthersData(key_name): any {

        return localStorage ? JSON.parse(localStorage.getItem(key_name)) : '';

    }

}
