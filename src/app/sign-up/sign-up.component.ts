import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user = {username: '', password: '', firstname: '' , lastname:'', remember: false 
  ,email:'',tel:''};
  errMess: string;


  constructor(public dialogRef: MatDialogRef<SignUpComponent>,
    private authService: AuthService) { }

  ngOnInit() {
  }
  onSubmit() {
    console.log("User: ", this.user);
    this.authService.signUp(this.user)
      .subscribe(res => {
        if (res.success) {
          this.dialogRef.close(res.success);          
        }
        else {
          console.log(res);
        }
      },
      error => {
        console.log(error);
        this.errMess = "you have an account with this username";
      })


 }

}
