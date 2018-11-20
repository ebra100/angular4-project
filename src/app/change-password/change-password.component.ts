import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>,public dialog: MatDialog,private authService: AuthService) { }
  
  errMess:string ;
  user ={password:'',repassword:''};
  ngOnInit() {
  }
  changePassword(){
    if (this.user.password===this.user.repassword){
        console.log(this.user);
       this.authService.changePassword(this.user)
       .subscribe(res=>{
       if (res.success){
       this.errMess="Your password has been changed";
       this.dialogRef.close(res.success); 
       }

       },
       error=>{
        this.errMess=error;
       })
    }
    else {
    this.errMess="the two password doesnt match each other";
    }
  }
}
