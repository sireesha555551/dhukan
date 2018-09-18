import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../../services/main/main';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {

  constructor(public router: Router, public mainServe: MainService) { }
  item = {
    quantity: 1
  }
  ngOnInit() {
    this.getProducts();

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

  allFeatureProducts = [];
  //get products
  getProducts() {
    this.mainServe.getProducts().subscribe(response => {
      this.allFeatureProducts = response.json().products;
      // this.allFeatureProducts.push(this.allFeatureProducts[0]);
      // this.allFeatureProducts.push(this.allFeatureProducts[1]);
    });
  }

}
