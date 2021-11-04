import { Component, OnInit } from '@angular/core';

import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public loggedIn:boolean
  public title = 'Sport Shop';

  constructor(private accountService: AccountService) { 
    this.loggedIn = this.CheckLoggedIn()
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
}


