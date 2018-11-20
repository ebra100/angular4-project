import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { AuthService } from '../services/auth.service';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

import {Router} from '@angular/router';
import { FacebookService, LoginResponse } from 'ngx-facebook';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {username: '', password: '', remember: false};
  errMess: string;
  facebookLogin:boolean=false;
  loggedIn:boolean;

  
  constructor(public dialogRef: MatDialogRef<LoginComponent>,public dialog: MatDialog,private authService: AuthService,  private router:Router,
  private facebookService: FacebookService,
  private processHTTPMsgService: ProcessHTTPMsgService) { }

  ngOnInit() {
  }

    openSignupForm() {
    this.dialogRef.close();

    let signupRef = this.dialog.open(SignUpComponent, {width: '500px', height: '450px'});

    signupRef.afterClosed()
      .subscribe(result => {
        console.log(result);
      });
  }
  openResetForm() {
    this.dialogRef.close();

    let resetRef = this.dialog.open(ForgotPasswordComponent, {width: '400px', height: '300px'});
    
    resetRef.afterClosed()
      .subscribe(result => {
        console.log(result);
      });
  }

  logInWithFacebook(): void {
    this.facebookLogin=true;
    this.facebookService.login()
      .then((response: LoginResponse) => {
      this.authService.logInWithFacebook(response.authResponse.accessToken,
    
      (jsonResponse)=>{
      if(jsonResponse.success)
      {
        this.dialogRef.close(); 
        this.router.navigateByUrl('/home');
      }
      else{
        this.errMess = "please check if you are logged in to your facebook accont";
      }
      })

       })
      .catch((error: any) => console.error(error));
 }
 
  onSubmit() {
  if(this.facebookLogin==false)
    this.authService.logIn(this.user)
      .subscribe(res => {
        if (res.success) {
          this.dialogRef.close(res.success); 
          this.router.navigateByUrl('/home');         
        }
      },
      error => {
        this.errMess = "wrong username or password";
      })
  }

  }

