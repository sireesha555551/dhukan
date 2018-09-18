import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { HeaderComponent } from '../header/header.component';
import { MainService } from '../../services/main/main';
import { Router } from '@angular/router';
import { HeaderService } from '../../services/header/header';
import { AppSettings } from '../../config';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
})

export class MainComponent implements OnInit {
  constructor(public mainServe: MainService, public router: Router, private headerSer: HeaderService) { }
  ngOnInit() {
    window.scrollTo(0, 0);
    this.getProducts();
    this.getAllCategoriesWithSubCat();
  }
  bannerImageOne = true;
  bannerImageTwo = false;
  bannerImageThree = false;
  results: any;
  banners = [];
  imgUrl = AppSettings.baseUrl;
  bannerImageOneOffer() {
    this.bannerImageOne = true;
    this.bannerImageTwo = false;
    this.bannerImageThree = false;
  }
  bannerImageTwoOffer() {
    this.bannerImageOne = false;
    this.bannerImageTwo = true;
    this.bannerImageThree = false;
  }
  bannerImageThreeOffer() {
    this.bannerImageOne = false;
    this.bannerImageTwo = false;
    this.bannerImageThree = true;
  }


  item = {
    quantity: 1
  }

  itemIncrease() {
    let thisObj = this;

    thisObj.item.quantity = Math.floor(thisObj.item.quantity + 1);

  }
  itemDecrease() {
    let thisObj = this;
    if (thisObj.item.quantity === 0) {
      return;
    }
    thisObj.item.quantity = Math.floor(thisObj.item.quantity - 1);

  }
  ShowProductDetails() {
    this.router.navigate(['/productdetails']);
  }

  allProducts = [];
  allProductsData = [];
  //get products
  getProducts() {
    this.mainServe.getProducts().subscribe(response => {
      this.allProducts = response.json().products;
      this.allProductsData = this.allProducts;
      // this.allProductsData.push(this.allProducts[0]);
      // this.allProductsData.push(this.allProducts[1]);
    });
  }



  //get categories and subcategories
  getAllCategoriesWithSubCat() {
    if (localStorage.token === undefined) {
      var inData = "Session_id =" + '1k2ll';
    } else {
      inData = '';
    }

    this.headerSer.getAllCatAndSubCat(inData).subscribe(response => {
      this.results = response.json().result;
      this.banners = this.results.banner;
      console.log(this.banners);
    });
  }



}
