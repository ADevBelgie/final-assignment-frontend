import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutCreatorComponent } from './about-creator/about-creator.component';
import { AboutShopComponent } from './about-shop/about-shop.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { RegisterComponent } from './register/register.component';
import { ShoppingbagComponent } from './shoppingbag/shoppingbag.component';

const routes: Routes = [
  { path: 'Home', component: ProductPageComponent },
  { path: 'detail/:id', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about-shop', component: AboutShopComponent },
  { path: 'about-creator', component: AboutCreatorComponent },
  { path: 'shoppingbag', component: ShoppingbagComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'Home'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
