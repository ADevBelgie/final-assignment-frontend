import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/models/user';

// Source
// https://stackblitz.com/edit/angular-10-registration-login-example?file=src%2Fapp%2F_services%2Faccount.service.ts
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private BaseUrl = 'https://localhost:44378/api/Account';  // URL to web api
  private userSubject: BehaviorSubject<User>; 
  public user: Observable<User>;

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Server': 'Microsoft-IIS/10.0'
    })
  };

  constructor(
    private router: Router,
    private http: HttpClient) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
      this.user = this.userSubject.asObservable();
    }

  public get userValue(): User {
    return this.userSubject.value;
  }
  public get userObservable(): Observable<User> {
    return this.user;
  }

  login(login: User) {
    this.log('Attempting login')
    return this.http.post(`${this.BaseUrl}/login`, login, this.httpOptions)
        .pipe(map((user:any) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user)); // user looks like  Object {token:"x", expiration "2021-11-04T17:31:01Z"}
            this.userSubject.next(user);
            return user;
        }));
  }
  logout() {
    this.log('logout')
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null!);
    // this.router.navigate(['/Home']);
  }

  register(user: User) {
    this.log('register')
    console.log(user.passwordHash)
    return this.http.post(`${this.BaseUrl}/register`, user);
  }

  getAll() {
    return this.http.get<User[]>(`${this.BaseUrl}/users`);
  }

  getById(id: string) {
    return this.http.get<User>(`${this.BaseUrl}/users/${id}`);
  }

/*
  delete(loginId: number) {
    return this.http.delete(`${this.BaseUrl}/users/${loginId}`)
        .pipe(map(x => {
            // auto logout if the logged in user deleted their own record
            if (loginId == this.userValue.loginId) {
                this.logout();
            }
            return x;
        }));
  }*/
  /** Log a ProductService message with the MessageService */
  private log(message: string) {
  console.log(`AccountServiceService: ${message}`);
  }

}
