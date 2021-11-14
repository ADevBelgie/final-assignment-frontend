import { Component, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { style } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer-info',
  templateUrl: './footer-info.component.html',
  styleUrls: ['./footer-info.component.scss']
})
export class FooterInfoComponent implements OnInit {
  public loginOrRegister:boolean =false;
  navigationSubscription;
  constructor(
    private location: Location,
    private router: Router,) {
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
  
  initialiseInvites() {
    // Set default values and re-fetch any data you need.
    this.checkRoute()
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  /* Check route and change styling with this.loginOrRegister if neccesary*/
  checkRoute() {
    if(this.location.path().startsWith('/login') || this.location.path().startsWith('/register')){
      this.loginOrRegister = true
    }else{
      this.loginOrRegister = false
    }
  }
  startsWith(str:string, word:string) {
    return str.lastIndexOf(word, 0) === 0;
  }
}

