import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { ShoppingBagService } from 'src/app/services/shopping-bag.service';
import { ShoppingItem } from 'src/models/shopping-item';

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
    ) { 
    if (this.CheckLoggedIn()) {
      this.shoppingBagService.getShoppingBag().subscribe()
     this.shoppingItems = this.shoppingBagService.getShoppingItemsObservable()
    }
    else{
      this.shoppingItems = of([])
    }
     
  }

  ngOnInit(): void {
  }
  CheckLoggedIn(this: any): boolean {
    const user = this.accountService.userValue
    return !(user && (Object.keys(user).length === 0)); // Returns true when user object is not empty
  }
}
