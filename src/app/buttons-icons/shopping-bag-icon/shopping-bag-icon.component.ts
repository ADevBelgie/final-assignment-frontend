import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { ShoppingBagService } from 'src/app/services/shopping-bag.service';
import { ShoppingItem } from 'src/models/shopping-item';
import { Location } from '@angular/common';
@Component({
  selector: 'app-shopping-bag-icon',
  templateUrl: './shopping-bag-icon.component.html',
  styleUrls: ['./shopping-bag-icon.component.scss']
})
export class ShoppingBagIconComponent implements OnInit {

  public shoppingItems: Observable<ShoppingItem[]>;

  constructor(
    private shoppingBagService: ShoppingBagService,
    private accountService: AccountService,
    private router: Router,
    private location: Location
    ) { 
      this.shoppingItems = this.shoppingBagService.getShoppingItemsObservable()
      this.shoppingItems.subscribe( data => {
        this.cssUpdate(data);
       });
      
      if(this.location.path() != "/shoppingbag"){
        this.shoppingBagService.getShoppingBag().subscribe()
      }
  }

  ngOnInit(): void {
  }
  CheckLoggedIn(this: any): boolean {
    const user = this.accountService.userValue
    return !(user && (Object.keys(user).length === 0)); // Returns true when user object is not empty
  }
  cssUpdate(shoppingItem:ShoppingItem[]){
    // make the icon next to cart flikker
    if(shoppingItem.length > 0){
      let navLinkValue = document.getElementsByClassName('nav-link-value') as HTMLCollectionOf<HTMLElement>;
      if (navLinkValue.length != 0) {
        navLinkValue[0].style.transition = "cubic-bezier(.29,2,.71,2) all 0.5s"
        navLinkValue[0].style.color = "yellow"
        navLinkValue[0].style.boxShadow = "0px 0px 5px 5px"
        setTimeout(()=>{ 
          navLinkValue[0].style.transition = "ease all 0.5s"
          navLinkValue[0].style.boxShadow = "0px 0px 0px 0px"
         }, 500)
      }
    }
  }
}
