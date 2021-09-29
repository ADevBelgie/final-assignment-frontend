import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, empty, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/user';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  private BaseUrl = 'https://localhost:44378/api/Account';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private messageService: MessageService) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse('user'));//needs to come from api
      this.user = this.userSubject.asObservable();
    }

  public get userValue(): User {
    return this.userSubject.value;
  }
  login(userToVal: User) {
    this.log('Attempting login')
    const usermodel = userToVal;
    return this.http.post<User>(`${this.BaseUrl}/login`, { usermodel })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));
  }
  logout() {
    this.log('logout')
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    //this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  register(user: User) {
    this.log('register')
    return this.http.post(`${this.BaseUrl}/users/register`, user);
  }

  getAll() {
    return this.http.get<User[]>(`${this.BaseUrl}/users`);
  }

  getById(id: string) {
    return this.http.get<User>(`${this.BaseUrl}/users/${id}`);
  }


  delete(loginId: number) {
    return this.http.delete(`${this.BaseUrl}/users/${loginId}`)
        .pipe(map(x => {
            // auto logout if the logged in user deleted their own record
            if (loginId == this.userValue.loginId) {
                this.logout();
            }
            return x;
        }));
  }
  /** Log a ProductService message with the MessageService */
  private log(message: string) {
  this.messageService.add(`ProductService: ${message}`);
  }

}
