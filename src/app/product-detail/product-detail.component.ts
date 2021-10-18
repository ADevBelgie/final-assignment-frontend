import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product';
import { MessageService } from '../services/message.service';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public product: Product | undefined;

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getProductDetails();

  }
  getProductDetails() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);

    this.productService.getProduct(id) // Get only 1 product
      .subscribe(products => {
        this.product = products
      })
  }
}
