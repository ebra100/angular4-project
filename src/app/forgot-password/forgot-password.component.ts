import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { AuthService } from '../services/auth.service';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
 
    user={email:''};
    errMess: string;
    constructor(public dialogRef: MatDialogRef<ForgotPasswordComponent>,public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
  }

 resetPassword(){
 this.authService.resetPassword(this.user)
 .subscribe(res=>{
 console.log(res);
 if(res.success){
  this.dialogRef.close();
  let signupRef = this.dialog.open(ResetPasswordComponent, {width: '500px', height: '450px'});

 }
 else{
   this.errMess=res.error;
  }
 },
 error=>{
  this.errMess="Something went wrong! Enter your email again";
 }
 )
 }
}
