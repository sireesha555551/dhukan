import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DataService } from '../../services/login/login';
import { HeaderService } from '../../services/header/header';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationExtras } from '@angular/router';
import swal from 'sweetalert';
// import {
//   AuthService,

// } from 'angular-6-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public loginService: DataService,
    private translate: TranslateService,

    public dialog: MatDialog,
    public router: Router,
    // private socialAuthService: AuthService,
    private headerSer: HeaderService
  ) {


  }

  ngOnInit() {
    this.getCategories();
    this.getAllCategoriesWithSubCat();
    if (localStorage.userData !== undefined) {
      this.showProfile = true;
      this.showLoginButton = false;
    }
    if (localStorage.location !== undefined) {
      this.location = localStorage.location;
      this.LocationPincode = localStorage.pincode;
    }
  }

  showProfile: boolean;
  showLoginButton = true;
  showModal = false;
  showOpacity = false;
  showLocations = false;
  showSubLocations = false;
  item = {
    quantity: 1
  }

  showLogin = false;
  showLoginandRegistration = true;
  showRegistration = false;
  showOtp = false;
  showForgotPassword = false;
  showCategories = false;
  showSubCats = false;
  otpData;
  location: string;
  LocationPincode: any;
  msg;
  locationName;
  pincodeOfLocation;
  subLocationName;
  locationData = [];
  subLocationData = [];
  categories = [];
  categoriesWithSubCat = [];
  subCatList = [];
  selectedCat;
  offersList = [];
  banners = [];
  results: any;
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    referalCode: '',
    otp: '',
    lId: '',
    pincode: '',
    searchParam: ''
  }

  errorObj = {
    firstNameErr: false,
    lastNameErr: false,
    emailErr: false,
    phoneErr: false,
    passwordErr: false,
    referalCodeErr: false,
    otpErr: false

  }

  //in popup login button

  showLoginScreen() {
    this.showLogin = true;
    this.showRegistration = false;

  }
  //in popup registratin button
  showRegistrationScreen() {
    this.showRegistration = true;
    this.showLogin = false;
  }


  //login link
  openLogin() {
    this.showModal = true;
    this.showLoginandRegistration = true;
    this.showLogin = true;
    this.showRegistration = false;
    this.showOpacity = true;
    this.showForgotPassword = false;
    this.showOtp = false;
    this.formData.phone = '';
    this.errorObj.phoneErr = false;
    this.formData.password = '';
    this.errorObj.passwordErr = false;

  }

  //registration link
  openRegistration() {
    this.showModal = true;
    this.showLogin = false;
    this.showLoginandRegistration = true;
    this.showRegistration = true;
    this.showOpacity = true;
    this.showForgotPassword = false;
    this.showOtp = false;
    this.formData.firstName = '';
    this.formData.lastName = '';
    this.formData.email = '';
    this.formData.phone = '';
    this.formData.password = '';
    this.formData.referalCode = '';
    this.formData.otp = '';
    this.errorObj.firstNameErr = false;
    this.errorObj.lastNameErr = false;
    this.errorObj.emailErr = false;
    this.errorObj.phoneErr = false;
    this.errorObj.passwordErr = false;
    this.errorObj.referalCodeErr = false;
    this.errorObj.otpErr = false;

  }

  //forgot password
  openForgotpassword() {
    this.showForgotPassword = true;
    this.showOpacity = true;
    this.showLoginandRegistration = false;
    this.showOtp = false;
    this.formData.email = '';
    this.errorObj.emailErr = false;
  }

  forgotPassword() {
    if (this.formData.email === '' || this.formData.email === undefined || this.formData.email === null) {
      this.errorObj.emailErr = true;
    } else {
      this.errorObj.emailErr = false;
    }

    // if (this.errorObj.emailErr === false) {

    // }
  }


  logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    this.router.navigate(["/"]);
    this.showProfile = false;;
    this.showLoginButton = true;
  }

  //close popup
  onCloseCancel() {
    this.showModal = false;
    if (this.showModal === false) {
      this.showOpacity = false;
    }
  }
  //login
  login() {

    var validdata = false;

    if (this.formData.phone === '' || this.formData.phone === undefined || this.formData.phone === null) {
      this.errorObj.phoneErr = true;
    } else {
      this.errorObj.phoneErr = false;
      validdata = true;
    }

    if (this.formData.password === '' || this.formData.password === undefined || this.formData.password === null) {
      this.errorObj.passwordErr = true;
    } else {
      this.errorObj.passwordErr = false;
      validdata = true;
    }


    if (validdata) {
      var inData = "phone=" + this.formData.phone +
        "&password=" + this.formData.password +
        "&device_id=" + "abcd12_123" +
        "&device_token=" + "abcd12_123" +
        "&device_type=" + "Desktop"


      this.loginService.login(inData).subscribe(response => {
        swal("Login Successfully", " ", "success");
        localStorage.setItem('userData', JSON.stringify(response.json().data));
        localStorage.setItem('token', response.json().token);

        this.onCloseCancel();
        this.showProfile = true;
        this.showLoginButton = false;
        this.router.navigate(["/"]);

      }, err => {
        if (err.status === 400) {
          this.msg = this.translate.instant("common.loginErrMsg");
          swal(err.message, " ", "error").then((value) => {

          });
        };
      });
    }

  }

  //otp verification
  openOtpScreen() {
    var validData = false;

    //validations
    if (this.formData.firstName === '' || this.formData.firstName === undefined || this.formData.firstName === null) {
      this.errorObj.firstNameErr = true;
    } else {
      this.errorObj.firstNameErr = false;
      validData = true;
    }

    if (this.formData.lastName === '' || this.formData.lastName === undefined || this.formData.lastName === null) {
      this.errorObj.lastNameErr = true;
    } else {
      this.errorObj.lastNameErr = false;
      validData = true;
    }

    if (this.formData.email === '' || this.formData.email === undefined || this.formData.email === null) {
      this.errorObj.emailErr = true;
    } else {
      this.errorObj.emailErr = false;
      validData = true;
    }

    if (this.formData.phone === '' || this.formData.phone === undefined || this.formData.phone === null) {
      this.errorObj.phoneErr = true;
    } else {
      this.errorObj.phoneErr = false;
      validData = true;
    }

    if (this.formData.password === '' || this.formData.password === undefined || this.formData.password === null) {
      this.errorObj.passwordErr = true;
    } else {
      this.errorObj.passwordErr = false;
      validData = true;
    }

    if (this.formData.referalCode === '' || this.formData.referalCode === undefined || this.formData.referalCode === null) {
      this.errorObj.referalCodeErr = true;
    } else {
      this.errorObj.referalCodeErr = false;
      validData = true;
    }


    if (validData) {
      var inData = "phone=" + this.formData.phone;
      this.loginService.requestOtp(inData).subscribe(response => {
        this.otpData = response.json();
        swal("Otp Sent to your mobile number", " ", "success");
        this.showForgotPassword = false;
        this.showLoginandRegistration = false;
        this.showModal = true;
        this.showOpacity = true;
        this.showOtp = true;

      }, err => {
        if (err.status === 400) {
          this.msg = this.translate.instant("common.loginErrMsg");
          swal(err.message, " ", "error").then((value) => {

          });
        };
      });
    }
  }

  //registration
  registration() {
    // var inData = "phone=" + this.formData.phone;
    var validOtp = false;
    if (this.formData.otp === '' || this.formData.otp === undefined || this.formData.otp === null || parseInt(this.formData.otp) !== this.otpData.otp) {
      this.errorObj.otpErr = true;
      validOtp = false;
    } else {
      validOtp = true;
    }

    if (validOtp) {
      var inData = "first_name=" + this.formData.firstName +
        "&last_name=" + this.formData.lastName +
        "&email=" + this.formData.email +
        "&phone=" + this.formData.phone +
        "&password=" + this.formData.password +
        "&device_id=" + "abcd12_123" +
        "&device_token=" + "abcd12_123" +
        "&device_type=" + "Desktop"
      // "&referral_code=" + this.formData.referalCode

      this.loginService.registration(inData).subscribe(response => {
        this.otpData = response.json();
        console.log(this.otpData);
        swal("Thank you for registering with us Welcome to DHUKHAN", " ", "success");
        this.onCloseCancel();
        this.router.navigate(["/"]);
        this.showModal = false;
        this.showOpacity = false;

      }, err => {
        if (err.status === 400) {
          this.msg = this.translate.instant("common.loginErrMsg");
          swal(err.message, " ", "error").then((value) => {
          });
        };
      });
    }
  }

  // facebooklogi
  socialSignIn(socialPlatform: string) {
    // let socialPlatformProvider;
    // if (socialPlatform == "facebook") {
    //   socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    // } else if (socialPlatform == "google") {
    //   socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    // }

    // this.socialAuthService.signIn(socialPlatformProvider).then(
    //   (userData) => {
    //     console.log(socialPlatform + " sign in data : ", userData);
    //     // Now sign-in with userData
    //     // ...

    //   }
    // );
  }


  // cart items
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
  //change country
  changeCountry(value) {
    if (value === "IND") {
      this.headerSer.getINDLocations().subscribe(response => {
        this.showLocations = true;
        this.showSubLocations = false;
        this.locationData = response.json().locations;
      });
    } else if (value === 'UAE') {
      this.headerSer.getUAELocations().subscribe(response => {
        this.showLocations = true;
        this.showSubLocations = false;
        this.locationData = response.json().locations;
      });
    }
  }

  //change location
  changeLocation(locationID) {
    this.headerSer.getSubLocations(locationID).subscribe(response => {
      this.showSubLocations = true;
      this.subLocationData = response.json().locations;
    });
  }

  //change sublocation
  changeSubLocation() {
    for (var i = 0; i < this.subLocationData.length; i++) {
      if (this.formData.pincode === this.subLocationData[i].pincode) {
        this.subLocationName = this.subLocationData[i].address;
        this.pincodeOfLocation = this.subLocationData[i].pincode;
      }
    }
  }

  //submit location
  submitLocation(location, pin) {
    localStorage.setItem('location', location);
    localStorage.setItem('pincode', location);
    this.location = localStorage.location;
    this.LocationPincode = localStorage.pincode;
  }
  
  //get categories
  getCategories() {
    this.headerSer.getCategories().subscribe(response => {
      this.categories = response.json().categories;
    });
  }



  //search products
  searchProducts() {
    var inData = "name=" + this.formData.searchParam;
    this.headerSer.searchProducts(inData).subscribe(response => {
      this.categories = response.json().categories;
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
      this.categoriesWithSubCat = this.results.category;
      this.banners = this.results.banner;
    });
  }

  //show categories
  showCat() {
    this.showCategories = !this.showCategories;
    if (this.showCategories === false) {
      this.showSubCats = false;
    }
  }

  //show Sub categories
  showSubCat(cId, index) {
    this.showSubCats = true;
    this.selectedCat = index;
    for (var i = 0; i < this.categoriesWithSubCat.length; i++) {
      if (cId === this.categoriesWithSubCat[i].id) {
        this.subCatList = this.categoriesWithSubCat[i].subcategory;
      }
    }
  }


  showSubCatProd(subId) {
    // this.showSubCats = false;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'sId': subId
      }
    };
    this.router.navigate(["/categoriesProducts"], navigationExtras)
  }
}

