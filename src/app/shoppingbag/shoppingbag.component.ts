import { Component, OnInit } from '@angular/core';
import { ShoppingItem } from 'src/models/shopping-item';
import { MessageService } from '../services/message.service';
import { ShoppingBagService } from '../services/shopping-bag.service';

@Component({
  selector: 'app-shoppingbag',
  templateUrl: './shoppingbag.component.html',
  styleUrls: ['./shoppingbag.component.scss']
})
export class ShoppingbagComponent implements OnInit {
  public shoppingItems: ShoppingItem[] = [];
  constructor(
    private shoppingBagService: ShoppingBagService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getShoppingItems();
  }
  getShoppingItems() {
    this.messageService.add("retrieving shoppingitems");
    this.shoppingBagService.getShoppingBag() // Get only 1 page
    .subscribe(shoppingBag => {
      this.shoppingItems = shoppingBag.Items;
    });
  }
  ProductItemLenght(): Array<any> {
    return new Array(this.shoppingItems);
  }
}
