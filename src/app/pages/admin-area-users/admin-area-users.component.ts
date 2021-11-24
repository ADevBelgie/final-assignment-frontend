import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-admin-area-users',
  templateUrl: './admin-area-users.component.html',
  styleUrls: ['./admin-area-users.component.scss']
})
export class AdminAreaUsersComponent implements OnInit {
  public users$: Observable<User[]>;
  constructor(
    private accountService: AccountService
  ) {
    this.users$ = this.accountService.getUsersObservable()
    this.accountService.getAll().subscribe()
   }

  ngOnInit(): void {
  }

}
