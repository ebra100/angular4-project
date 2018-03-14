import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    user={code:''};
    errMess: string;
    constructor(public dialogRef: MatDialogRef<ResetPasswordComponent>,public dialog: MatDialog, private authService: AuthService) { }


  ngOnInit() {
  }
verifyCode(){
	this.authService.verifyCode(this.user)
	.subscribe(res=>{
	if (res.success) {
	 this.errMess="Your code is correct";
	 this.dialogRef.close();
	}
	else {
	this.errMess="please enter the correct code";
	}
	})
}
}
