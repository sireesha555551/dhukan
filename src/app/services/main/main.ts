import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppSettings } from '../../config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MainService {
    constructor(private http: Http, public router: Router, private translate: TranslateService
    ) { }

    postInputParams(url, sId) {
        const headers = new Headers({
            'Content-Type': "application/x-www-form-urlencoded",
        });
        return this.http.post(AppSettings.baseUrl + url + sId, { headers: headers });
    }

    getInputParams(url) {
        const headers = new Headers({
            'Content-Type': "application/x-www-form-urlencoded",
        });
        return this.http.get(AppSettings.baseUrl + url, { headers: headers });
    }
    
    //get IND locations
    getProducts(): Observable<any> {
        return this.getInputParams('dhukan/subcatproducts');
    }

    //
    getSubProducts(catId): Observable<any> {
        return this.postInputParams('dhukan/subcatproducts/', catId);
    }
};