import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppSettings } from '../../config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ProfileService {
    constructor(private http: Http, public router: Router, private translate: TranslateService
    ) { }

    //get
    getInputParams(url, lId) {
        const headers = new Headers({
            'Content-Type': "application/x-www-form-urlencoded",
            'Token': localStorage.token
        });
        return this.http.get(AppSettings.baseUrl + url + lId, { headers: headers });
    }

    //put
    putInputParams(url, params) {
        const headers = new Headers({
            'Content-Type': "application/x-www-form-urlencoded",
            'Token': localStorage.token
        });
        return this.http.put(AppSettings.baseUrl + url, params, { headers: headers });
    }

    //post
    postInputParams(url, params) {
        const headers = new Headers({
            'Content-Type': "application/x-www-form-urlencoded",
            'Token': localStorage.token
        });
        return this.http.post(AppSettings.baseUrl + url, params, { headers: headers });
    }

    //get profile details
    getProfileDetails(): Observable<any> {
        return this.getInputParams('users/my_profile', '');
    }

    //update profile
    updateProfile(params): Observable<any> {
        return this.putInputParams('users/update_profile', params);
    }

    //get address

    getAddress(): Observable<any> {
        return this.getInputParams('users/my_address', '');
    }


    //add address
    addAddress(params): Observable<any> {
        return this.postInputParams('users/add_address', params);
    }


};