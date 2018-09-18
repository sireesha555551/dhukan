import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppSettings } from '../../config';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HeaderService {
    constructor(private http: Http, public router: Router, private translate: TranslateService
    ) { }

    //get methode
    getInputParams(url, lId) {
        const headers = new Headers({
            'Content-Type': "application/x-www-form-urlencoded",
        });
        return this.http.get(AppSettings.baseUrl + url + lId, { headers: headers });
    }

    //post methode
    postInputParams(url, params) {
        const headers = new Headers({
            'Content-Type': "application/x-www-form-urlencoded",
            'Token': localStorage.token
        });
        return this.http.post(AppSettings.baseUrl + url, params, { headers: headers });
    }
    
    //get IND locations
    getINDLocations(): Observable<any> {
        return this.getInputParams('users/locations/IND', '');
    }

    //get UAE locations
    getUAELocations(): Observable<any> {
        return this.getInputParams('users/locations/UAE', '');
    }


    //getSublocations
    getSubLocations(locId): Observable<any> {
        return this.getInputParams('users/pincodes/', locId);
    }


    //get categories
    getCategories(): Observable<any> {
        return this.getInputParams('dhukan/categories', '');
    }

    //search products
    searchProducts(params): Observable<any> {
        return this.postInputParams('dhukan/prdsrc', params);
    }

    //get categories and subcategories
    getAllCatAndSubCat(params): Observable<any> {
        return this.postInputParams('dhukan/categories-list', params);
    }
};