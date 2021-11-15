import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { Product } from 'src/models/product';
import { ShoppingBag } from 'src/models/shopping-bag';
import { ShoppingItem } from 'src/models/shopping-item';
import { ProductService } from '../../services/product.service';
import { ShoppingBagService } from '../../services/shopping-bag.service';

@Component({
  selector: 'app-shoppingbag',
  templateUrl: './shoppingbag.component.html',
  styleUrls: ['./shoppingbag.component.scss']
})
export class ShoppingbagComponent implements OnInit {
  public shoppingItems$: Observable<ShoppingItem[]>;
  public shoppingBag$: Observable<ShoppingBag>;
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
  ) {  
    this.shoppingBagService.getShoppingBag().subscribe()
    this.shoppingItems$ = this.shoppingBagService.getShoppingItemsObservable()
    this.shoppingBag$ = this.shoppingBagService.getShoppingBagObservable()
  }

  ngOnInit(): void {
    this.getShoppingItems();
  }
  submit(event: any, productId:number) {
    if(!isNaN(Number(event.target.value)) && typeof Number(event.target.value) === 'number'){
      // Change item amount from local and from backend
      this.shoppingBagService.putSetAmountShoppingItemToBag( productId, Number(event.target.value))
    }
    
  }
  getShoppingItems() {
    this.shoppingBagService.getShoppingBag() // Get only 1 page
    .subscribe(shoppingBag => {
      shoppingBag.items.forEach(item => {
        this.productService.getProduct(item.productId).subscribe(product => {
          this.products.push(product)
        });
      });
    });
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
    this.shoppingBagService.deleteShoppingItem(productId)
  }
}
