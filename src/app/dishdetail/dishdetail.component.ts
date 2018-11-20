import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';
import { FavoriteService } from '../services/favorite.service';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { visibility, flyInOut, expand } from '../animations/app.animation';
import {NotificationsService} from 'angular4-notify';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {

  @ViewChild('cform') commentFormDirective;

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  errMess: string;
  visibility = 'shown';
  favorite: boolean;
  index:any;
  username:string;
  myComment:boolean;
  editableComment:any='';

  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'comment': {
      'required':      'Comment is required.'
    }
  };

  commentForm: FormGroup;

  constructor(private dishservice: DishService,
    private authService: AuthService,
    private favoriteService: FavoriteService,
    private route: ActivatedRoute,
    private location: Location,
    private notificationsService: NotificationsService,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {

    this.createForm();

    this.authService.loadUserCredentials();

    this.authService.getUsername().
    subscribe(username=>{this.username=username;});

    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);

    this.route.params
      .switchMap((params: Params) => { this.visibility = 'hidden'; 
       return this.dishservice.getDish(params['id']); })
      .subscribe(dish => { 
          this.dish = dish; 
          this.setPrevNext(dish._id); 
          this.visibility = 'shown';
          this.favoriteService.isFavorite(this.dish._id)
         .subscribe(resp=>{this.favorite=resp.exists;})       
   },
        errmess => this.errMess = <any>errmess);


  }

  setPrevNext(dishId: string) {
    if(this.dishIds) {
      let index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
    }
  }


  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      rating: 5,
      comment: ['', Validators.required]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onSubmit() {
    console.log(this.commentForm.value);
    this.dishservice.postComment(this.dish._id, this.commentForm.value)
      .subscribe(dish => {this.dish = dish;this.myComment=true;
      });
    this.commentForm.reset({
      rating: 5, 
      comment: ''
    });
    this.commentFormDirective.resetForm();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

   
   isMyComment(comment:any):boolean
   {
   if(comment.author&&this.username ==comment.author.username){
         return true;
      }
     else {
         return false;
     }
   }
   
   deleteComment(comment:any){
   this.dishservice.deleteComment(this.dish._id,comment._id)
   .subscribe(dish=>{this.dish=dish;});
   }

   editComment(comment:any){
    this.deleteComment(comment);
    this.editableComment=comment.comment;
   }

  editFavorites() {
    this.favoriteService.isFavorite(this.dish._id)
    .subscribe(resp=>{
     if(resp.exists==false){

      this.favoriteService.postFavorite(this.dish._id)
        .subscribe(favorites => {this.favorite=true;});

    }
    else if(resp.exists==true){
    this.favoriteService.deleteFavorite(this.dish._id)
    .subscribe(favorites=>{this.favorite=false;
    })
    }
    })

  }
}