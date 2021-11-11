import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product';
import { MessageService } from '../services/message.service';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingBagService } from '../services/shopping-bag.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public product: Product | undefined;
  routeId: any;

  constructor(
    private shoppingBagService: ShoppingBagService,
    private productService: ProductService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getProductDetails();
    this.route.params.subscribe(params => {
      this.routeId = params['id'] //Get value of id
    });

  }
  getProductDetails() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.productService.getProduct(id) // Get only 1 product
      .subscribe(products => {
        this.product = products
      })
  }
  AddProductToBag(){
    // Redirect to login if not logged in
    if(localStorage.getItem('user') == null){
      this.router.navigate(['/login']);
    }
    else{
      this.shoppingBagService.putShoppingItemToBag(this.routeId, 1);
    }
  }
}
