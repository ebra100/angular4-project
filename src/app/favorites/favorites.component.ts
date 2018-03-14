import { Component, OnInit, Inject } from '@angular/core';
import { Favorite } from '../shared/favorite';
import { FavoriteService } from '../services/favorite.service';
import { flyInOut, expand } from '../animations/app.animation';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class FavoritesComponent implements OnInit {

  favorites: Favorite;
  favoriteExist:boolean;
  delete: boolean;
  errMess: string;
  trash:string[]=[];
  mark:boolean;
  index:any=0;

  constructor(private favoriteService: FavoriteService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.favoriteService.getFavorites()
      .subscribe(favorites => {this.favorites = favorites;
      if(favorites.dishes.length==0){
      this.favoriteExist=false;
      }
      else { this.favoriteExist=true;}
      },
        errmess => this.errMess = <any>errmess);
  }

  
  onChangeSlide(e:any){
    if(!e.checked){
    this.trash=[];
  }
}
  markFavorite(id: string,e:any) {
  if(e.target.checked){
  this.trash.push(id);
  }
  else{
  this.trash.splice(this.trash.indexOf(id),1);
  }
  }


 deleteDishes(){
 if(this.trash.length>0 &&this.delete){
      this.favoriteService.deleteFavorite(this.trash[0])
      .subscribe(favorites => {
      if(this.trash.length>0){
      this.trash.splice(0,1);
      this.deleteDishes();
      }
      this.favoriteService.getFavorites()
      .subscribe(favorites => {this.favorites = favorites;this.trash=[];
       if(this.favorites.dishes.length == 0) 
      {
        this.favoriteExist=false ;
      }},
      errmess => this.errMess = <any>errmess);  
      })

}
}
}