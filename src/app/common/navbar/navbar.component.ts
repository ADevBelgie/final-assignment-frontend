import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ShoppingBagService } from 'src/app/services/shopping-bag.service';
import { ShoppingItem } from 'src/models/shopping-item';
import { User } from 'src/models/user';

import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public user$:Observable<User> = of(null!)
  public title = 'Sport Shop';
  
  
  constructor(
    private accountService: AccountService,
    private router: Router,) { 
    this.user$ = this.accountService.userObservable 
  }

  ngOnInit(): void {
  }

  Logout(){
    this.accountService.logout()
    window.location.reload();
  }
}


