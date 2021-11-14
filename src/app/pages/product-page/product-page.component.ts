import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { Product } from 'src/models/product';
import { ProductService } from '../../services/product.service';
import { ShoppingBagService } from '../../services/shopping-bag.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  public products: Product[] = [];
  public productsPageRow: number = 3;
  public productsPageColumn: number = 3;
  public currentPage: number = 1;
  public amountOfPages: number = 0;

  // Radio buttons
  formPPP: FormGroup;
  formCategory: FormGroup;

  constructor(
    private productService: ProductService,
    private shoppingBagService: ShoppingBagService,
    private router: Router,
    fb: FormBuilder)
  {
  // Radiobuttons productsPerPage
  this.formPPP = fb.group({
    productsPerPage: ['9', Validators.required]
    });
    this.formPPP.valueChanges.subscribe(x => {
      this.productsPageRow = this.formPPP.value.productsPerPage/3
      this.ngOnInit()
    })
  // Radiobutton category
  this.formCategory = fb.group({
    productCategory: ['none', Validators.required]
    });
    this.formCategory.valueChanges.subscribe(x => {
      this.currentPage = 1
      this.ngOnInit()
    })
  }

  ngOnInit(): void {
    this.getProducts(this.currentPage);
  }
  getProducts(pageNumber:number): void {
    this.currentPage = pageNumber;
    this.productService.getProductsPage(this.formPPP.value.productsPerPage ,pageNumber, this.formCategory.value.productCategory) // Get only 1 page
    .subscribe(products => {
      this.products = products;
    });

    this.productService.getTotalProductsPage(this.formPPP.value.productsPerPage, this.formCategory.value.productCategory) // Get only 1 page
    .subscribe(amountOfPages => {
      this.amountOfPages = amountOfPages;
    });
  }
  RowLength(): Array<any> {
    return new Array(this.productsPageRow);
  }
  ColumnLength(): Array<any> {
    return new Array(this.productsPageColumn);
  }
  AmountOfPagesLength(): Array<any> {
    return new Array(this.amountOfPages);
    // Can be extended ıf there are to many pages
  }
  AddProductToBag(productId:number){
    // Redirect to login if not logged in
    if(localStorage.getItem('user') == null){
      this.router.navigate(['/login']);
    }
    else{
      this.shoppingBagService.putShoppingItemToBag(productId, 1).subscribe();
    }
  }
  Refresh(){
    setTimeout(()=>{ this.ngOnInit(); }, 200)
  }
}
