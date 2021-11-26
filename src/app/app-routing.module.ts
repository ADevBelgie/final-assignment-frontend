import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutCreatorComponent } from './pages/about-creator/about-creator.component';
import { AboutShopComponent } from './pages/about-shop/about-shop.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { ShoppingbagComponent } from './pages/shoppingbag/shoppingbag.component';
import { AdminAreaUsersComponent } from './pages/admin-area-users/admin-area-users.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'product', component: ProductPageComponent },
  { path: 'detail/:id', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about-shop', component: AboutShopComponent },
  { path: 'about-creator', component: AboutCreatorComponent },
  { path: 'shoppingbag', component: ShoppingbagComponent, canActivate: [AuthGuard] },
  { path: 'admin-area-users', component: AdminAreaUsersComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
