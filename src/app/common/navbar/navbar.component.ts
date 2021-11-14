import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  navigationSubscription; 
  public loggedIn:boolean
  public title = 'Sport Shop';

  constructor(
    private accountService: AccountService,
    private router: Router,) { 
    this.loggedIn = this.CheckLoggedIn()
    // subscribe to the router events. Store the subscription so we can
    // unsubscribe later.
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.initialiseInvites();
        }
      });
  }

  ngOnInit(): void {
  }

  CheckLoggedIn(this: any): boolean {
    const user = this.accountService.userValue
    return !(user && (Object.keys(user).length === 0)); // Returns true when user object is not empty
  }
  Logout(){
    this.accountService.logout()
    window.location.reload();
  }
  initialiseInvites() {
    // Set default values and re-fetch any data you need.
    this.loggedIn = this.CheckLoggedIn()
  }
 
  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}


