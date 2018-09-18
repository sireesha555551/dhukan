import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {

  constructor() { }
  item = {
    quantity: 1
  }
  zoomedImageSrc;
  smallImageSrc;
  thumbImgSrc;
  thumbImgSrc1;
  thumbImgSrc2;

  ngOnInit() {
    window.scrollTo(0, 0);
    this.zoomedImageSrc = 'assets/images/product.png';
    this.smallImageSrc = 'assets/images/product.png';
    this.thumbImgSrc = 'assets/images/product.png';
    this.thumbImgSrc1 = 'assets/images/capsicums.png';
    this.thumbImgSrc2 = 'assets/images/corn.png';
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

  showImage() {
    this.zoomedImageSrc = this.thumbImgSrc;
    this.smallImageSrc = this.thumbImgSrc;
  }
  showImage1() {
    this.zoomedImageSrc = this.thumbImgSrc1;
    this.smallImageSrc = this.thumbImgSrc1;
  }
  showImage2() {
    this.zoomedImageSrc = this.thumbImgSrc2;
    this.smallImageSrc = this.thumbImgSrc2;
  }
}