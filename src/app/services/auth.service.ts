import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { FacebookService, InitParams } from 'ngx-facebook';
import * as $ from "jquery";

import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

interface AuthResponse {
  status: string,
  success: string,
  token: string
};

interface SignupResponse {
  status: string,
  success: string,
};

interface JWTResponse {
  status: string,
  success: string,
  user: any
};
 interface ResetRespone{
 success:any
 }

@Injectable()
export class AuthService {

 tokenKey: string = 'JWT';
 isAuthenticated: Boolean = false;
 username: Subject<string> = new Subject<string>();
 authToken: string = undefined;

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService,
    private facebookService: FacebookService) {
      let initParams: InitParams = {
      appId: '329710614217792',
      xfbml: true,
      version: 'v2.8'
    };
 
    facebookService.init(initParams); 
  }
  
  checkJWTtoken() {
    this.http.get<JWTResponse>(baseURL + 'users/checkJWTtoken')
    .subscribe(res => {
      console.log("JWT Token Valid: ", res);
      this.sendUsername(res.user.username);
    },
    err => {
      console.log("JWT Token invalid: ", err);
      this.destroyUserCredentials();
    })
  }
 
  sendUsername(name: string) {
    this.username.next(name);
  }

  clearUsername() {
    this.username.next(undefined);
  }

  loadUserCredentials() {
    var credentials = JSON.parse(localStorage.getItem(this.tokenKey));
    console.log("loadUserCredentials ", credentials);
    if (credentials && credentials.username != undefined) {
      this.useCredentials(credentials);
      if (this.authToken)
        this.checkJWTtoken();
    }
  }

  storeUserCredentials(credentials: any) {
    console.log("storeUserCredentials ", credentials);    
    localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
    this.useCredentials(credentials);
  }

  useCredentials(credentials: any) {
    this.isAuthenticated = true;
    this.sendUsername(credentials.username);
    this.authToken = credentials.token;
  }

  destroyUserCredentials() {
    this.authToken = undefined;
    this.clearUsername();
    this.isAuthenticated = false;
    localStorage.removeItem(this.tokenKey);
  }

  signUp(user:any) {
    return this.http.post<SignupResponse>(baseURL + 'users/signup', 
      {"firstname":user.firstname, "lastname":user.lastname
       , "username": user.username, "password": user.password ,
       "email":user.email , "tel":user.tel})
      .map(res => {
          return {'success': true, 'username': user.username };
      })
        .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }
  
  logIn(user: any): Observable<any> {
    return this.http.post<AuthResponse>(baseURL + 'users/login', 
      {"username": user.username, "password": user.password})
      .map(res => {
          this.storeUserCredentials({username: user.username, token: res.token});
          return {'success': true, 'username': user.username };
      })
        .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

logInWithFacebook(accessToken:any,callback) {
      let http = new XMLHttpRequest();
      let url=baseURL + 'users/facebook/token';
      if(http)
      {
        http.open('GET', url, true);
        http.setRequestHeader('Authorization', 'Bearer ' +accessToken);
        http.send()
        http.onreadystatechange =   ()=> {
        if(http.readyState === XMLHttpRequest.DONE && http.status === 200) {
        let jsonResponse = JSON.parse(http.response);
        this.storeUserCredentials({username: jsonResponse.user.username,
        token: jsonResponse.token});
        callback(jsonResponse);
       }}}}

resetPassword(user:any) {
 return this.http.post<ResetRespone>(baseURL + 'users/forgettPassword',
   {"email":user.email})
   .map(res => {
     if (res.success)
      return {'success': true };
     else
           return {'success': false };
 
      })
      .catch(error => { return this.processHTTPMsgService.handleError(error); });
}

verifyCode(user:any){
console.log(user.code);
return this.http.post<ResetRespone>(baseURL + 'users/verifycode',{"code":user.code})
  .map(res=>{
   if(res.success)
      return {'success':true};
   else 
     return {'success':false}; 
  })
   .catch(error => { return this.processHTTPMsgService.handleError(error); });
}
  logOut() {

    this.destroyUserCredentials();
  }

  isLoggedIn(): Boolean {
    return this.isAuthenticated;
  }

  getUsername(): Observable<string> {
    return this.username.asObservable();
  }

  getToken(): string {
    return this.authToken;
  }
}
