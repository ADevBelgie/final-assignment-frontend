import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product';
import { ShoppingItem } from 'src/models/shopping-item';
import { MessageService } from '../services/message.service';
import { ProductService } from '../services/product.service';
import { ShoppingBagService } from '../services/shopping-bag.service';

@Component({
  selector: 'app-shoppingbag',
  templateUrl: './shoppingbag.component.html',
  styleUrls: ['./shoppingbag.component.scss']
})
export class ShoppingbagComponent implements OnInit {
  public shoppingItems: ShoppingItem[] = [];
  public products: Product[] = [];

  constructor(
    private shoppingBagService: ShoppingBagService,
    private productService: ProductService,
    private messageService: MessageService,
  ) {  }

  ngOnInit(): void {
    this.getShoppingItems();
  }
  getShoppingItems() {
    console.log("retrieving shoppingitems");
    this.shoppingBagService.getShoppingBag() // Get only 1 page
    .subscribe(shoppingBag => {
      this.shoppingItems = shoppingBag.items; // shoppingBag.items is an Array(3) [ {…}, {…}, {…} ]
      this.shoppingItems.forEach(item => {
        this.productService.getProduct(item.productId).subscribe(product => {
          this.products.push(product)
        });
      });
    });
  }
  ProductItemLenght(): ShoppingItem[] {
    if(this.shoppingItems.length == this.products.length){
      return this.shoppingItems;
    }
    return []
  }
  ProductItemLenghtBool(): boolean{
    return this.shoppingItems.length == 0
  }
  productById(productId:number): Product{
    let product = this.products.find(x => x.productId == productId);
    if(!product){
      throw new Error("");
    }
    return product
  }
  DeleteSHoppingItem(productId:number){
    // Delete item from local and from backend
    var index = this.shoppingItems.findIndex(x => x.productId == productId)
    if (index !== -1) {
      this.shoppingItems.splice(index, 1);
    }
    var index = this.products.findIndex(x => x.productId == productId)
    if (index !== -1) {
      this.products.splice(index, 1);
    }

    this.shoppingBagService.deleteShoppingItem(productId)
  }
}
