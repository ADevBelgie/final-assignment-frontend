import { Component, OnInit } from '@angular/core';
import { observable } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
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
 
  public amountOptions = [
    { id: 1, name: 1 },
    { id: 2, name: 2 },
    { id: 3, name: 3 },
    { id: 4, name: 4 },
    { id: 5, name: 5 },
    { id: 6, name: 6 },
    { id: 7, name: 7 },
    { id: 8, name: 8 },
    { id: 9, name: 9 },
    { id: 10, name: 10 },
    { id: 11, name: "More" },
  ];
  constructor(
    private shoppingBagService: ShoppingBagService,
    private productService: ProductService,
    private messageService: MessageService,
  ) {   }

  ngOnInit(): void {
    this.getShoppingItems();
  }
  submit(event: any, productId:number) {
    if(!isNaN(Number(event.target.value)) && typeof Number(event.target.value) === 'number'){
      // Change item amount from local and from backend
      var sItem = this.shoppingItems.find(x => x.productId == productId)
      var index = this.shoppingItems.findIndex(x => x.productId == productId)
      if (index !== -1 && sItem) {
        sItem.amount = Number(event.target.value)
        this.shoppingItems[index] = sItem;
      }
      this.shoppingBagService.putSetAmountShoppingItemToBag( productId, Number(event.target.value)).subscribe(()=>location.reload())
    }
    
  }
  getShoppingItems() {
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
