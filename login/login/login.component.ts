import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../../services/login/login';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DataService]
})
export class LoginComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<LoginComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public loginService: DataService,
    private translate: TranslateService,
    public router: Router,
  ) {
    if (data.action === 'login') {
      this.showLogin = true;
    } else if (data.action === 'registration') {
      this.showRegistration = true;
    }
  }
  showLogin = false;
  showLoginandRegistration = true;
  showRegistration = false;
  showOtp = false;
  showForgotPassword = false;
  otpData;
  msg;

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    referalCode: '',
    otp: ''
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

  showLoginScreen() {
    this.showLogin = true;
    this.showRegistration = false;
  }
  showRegistrationScreen() {
    this.showRegistration = true;
    this.showLogin = false;
  }
  openForgotpassword() {
    this.showForgotPassword = true;
    this.showLoginandRegistration = false;
  }

  ngOnInit() {

  }
  //close login popup
  onCloseCancel() {
    this.thisDialogRef.close('Cancel');
  };


  //login
  login() {
    var inData = "phone=" + this.formData.phone +
      "&password=" + this.formData.password +
      "&device_id=" + "abcd12_123" +
      "&device_token=" + "abcd12_123" +
      "&device_type=" + "Desktop"


    this.loginService.login(inData).subscribe(response => {
      swal("Login Successfully", " ", "success");
      localStorage.setItem('userData', JSON.stringify(response.json().data));
      this.onCloseCancel();
      this.router.navigate(["/"]);

    }, err => {
      if (err.status === 400) {
        this.msg = this.translate.instant("common.loginErrMsg");
        swal(err.message, " ", "error").then((value) => {

        });
      };
    });
  }

  //registration
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

      }, err => {
        if (err.status === 400) {
          this.msg = this.translate.instant("common.loginErrMsg");
          swal(err.message, " ", "error").then((value) => {
          });
        };
      });
    }
  }


}
