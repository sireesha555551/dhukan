import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { MainService } from '../../services/main/main';
import { HeaderService } from '../../services/header/header';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  constructor(private route: ActivatedRoute, private mainServe: MainService, private headerSer: HeaderService) {
    // this.page = this.route.snapshot.data[0]['page'];
    // if (this.page === 'veg-categories') {
    //   this.showveg = true;
    // } else if (this.page === 'grocery') {
    //   this.grocery = true;
    // } else if (this.page === 'nonveg') {
    //   this.nonveg = true;
    // }
    
    this.route.queryParams.subscribe(params => {
      this.subCatId = params["sId"];
    });
  }
  
  ngOnInit() {
    this.getSubProducts('');
    this.getCategories();
  }
  page: string;
  showveg: boolean;
  grocery: boolean;
  nonveg: boolean;
  showOutOfStock = false;
  subCatId;
  categoriesWithSubCat = [];
  allProducts = [];
  subcats = [];
  prices = [];
  results: any;
  subId;
  item = {
    quantity: 1
  }
  //get products
  catName;
  getSubProducts(sId) {
    if (sId === '') {
      this.subId = this.subCatId;
    } else {
      this.subId = sId;
    }
    var data = "" + + "&sortType=" +
    this.mainServe.getSubProducts(this.subId).subscribe(response => {
      this.allProducts = response.json().products;
      this.catName = response.json().products[0].category_name;
      this.showveg = true;
    });
  }
  getCategories() {
    if (localStorage.token === undefined) {
      var inData = "Session_id =" + '1k2ll';
    } else {
      inData = '';
    }
    
    
    this.headerSer.getAllCatAndSubCat(inData).subscribe(response => {
      this.results = response.json().result;
      this.categoriesWithSubCat = this.results.category;
      for (var i = 0; i < this.categoriesWithSubCat.length; i++) {
        if (this.catName === this.categoriesWithSubCat[i].name) {
          this.subcats = this.categoriesWithSubCat[i].subcategory;
        }
      }
    });
  }
  //change size
  changeSize(id) {
    // console.log(id);
    // console.log(this.allProducts)
    this.prices.length=0;
    for (var i = 0; i < this.allProducts.length; i++) {
      // this.prices.push(this.allProducts[i].id)
      for (var j = 0; j < this.allProducts[i].sku.length; j++) {
        if (this.allProducts[i].sku[j].skid == parseInt(id)) {
        this.prices.push(this.allProducts[i].sku[j]);
      break;
        // console.log(this.allProducts[i].id)
        // console.log(this.prices.push(this.allProducts[i].sku[j]));         
      }
        // console.log(this.allProducts[i].sku[j]);    
      }
    }
  }
  //show products
  showCatProducts(sId) {
    this.getSubProducts(sId);
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
}
