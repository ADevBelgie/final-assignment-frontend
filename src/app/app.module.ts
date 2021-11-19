import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ProductService } from './services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ShoppingbagComponent } from './pages/shoppingbag/shoppingbag.component';
import { AccountService } from './services/account.service';
import { FooterInfoComponent } from './common/footer-info/footer-info.component';
import { ShopIconComponent } from './buttons-icons/shop-icon/shop-icon.component';
import { AboutShopComponent } from './pages/about-shop/about-shop.component';
import { AboutCreatorComponent } from './pages/about-creator/about-creator.component';
import { KeepShoppingComponent } from './buttons-icons/keep-shopping/keep-shopping.component';
import { AddToCartComponent } from './buttons-icons/add-to-cart/add-to-cart.component';
import { ProceedWithPaymentComponent } from './buttons-icons/proceed-with-payment/proceed-with-payment.component';
import { ShoppingBagIconComponent } from './buttons-icons/shopping-bag-icon/shopping-bag-icon.component';
import { PdfCvComponent } from './buttons-icons/pdf-cv/pdf-cv.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductPageComponent,
    ProductSearchComponent,
    ProductDetailComponent,
    LoginComponent,
    RegisterComponent,
    ShoppingbagComponent,
    FooterInfoComponent,
    ShopIconComponent,
    AboutShopComponent,
    AboutCreatorComponent,
    KeepShoppingComponent,
    AddToCartComponent,
    ProceedWithPaymentComponent,
    ShoppingBagIconComponent,
    PdfCvComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService,
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
