import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './services/message.service';
import { ProductService } from './services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShoppingbagComponent } from './shoppingbag/shoppingbag.component';
import { AccountService } from './services/account.service';
import { FooterInfoComponent } from './footer-info/footer-info.component';
import { ShopIconComponent } from './shop-icon/shop-icon.component';
import { AboutShopComponent } from './about-shop/about-shop.component';
import { AboutCreatorComponent } from './about-creator/about-creator.component';
import { KeepShoppingComponent } from './keep-shopping/keep-shopping.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductPageComponent,
    MessagesComponent,
    ProductSearchComponent,
    ProductDetailComponent,
    LoginComponent,
    RegisterComponent,
    ShoppingbagComponent,
    FooterInfoComponent,
    ShopIconComponent,
    AboutShopComponent,
    AboutCreatorComponent,
    KeepShoppingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule
  ],
  providers: [
    MessageService,
    ProductService,
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
