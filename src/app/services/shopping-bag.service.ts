import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ShoppingBag } from 'src/models/shopping-bag';
import { ShoppingItem } from 'src/models/shopping-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingBagService {

  private BaseUrl = 'https://localhost:44378/api';  // URL to web api
  public shoppingItems: ShoppingItem[] = []; // Used in navbar
  public _shoppingItems = new BehaviorSubject<ShoppingItem[]>([]); // Used in navbar

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json; charset=utf-8',
      'Server': 'Microsoft-IIS/10.0'
     })
  };

  constructor(
    private http: HttpClient) { }

    getShoppingItemsObservable(): Observable<ShoppingItem[]>{
      //return of(this.shoppingItems)
      return this._shoppingItems.asObservable()
    }

    /** GET shoppingbag from the server */
    getShoppingBag(): Observable<ShoppingBag> {
      this.CheckHeaders()
      let shoppingBagTemp:ShoppingBag
      return this.http.get<ShoppingBag>(`${this.BaseUrl}/Shopping`, this.httpOptions)
        .pipe(
          tap(_ => this.log('fetched shoppingbag')),
          catchError(this.handleError<ShoppingBag>('GetShoppingBag')),
          map((x:ShoppingBag)=>{
            this.shoppingItems = x.items
            this._shoppingItems.next(x.items)
            console.log(this.shoppingItems)
            console.log(this._shoppingItems.value)
            return x;
          })
        );
    }
    /*
    .pipe(map((user:any) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user)); // user looks like  Object {token:"x", expiration "2021-11-04T17:31:01Z"}
            this.userSubject.next(user);
            return user;
        }));
     */
    // Create/ Add product with amount to shopping bag
    putShoppingItemToBag(productId:number, amountToAdd:number) {
      this.CheckHeaders()
      return this.http.put<any>(`${this.BaseUrl}/Shopping?productId=${productId}&amount=${amountToAdd}`, {}, this.httpOptions)// empty body
    }
    // Change to set amount in shoppingbag
    putSetAmountShoppingItemToBag(productId:number, amountToAdd:number) {
      return this.http.put(`${this.BaseUrl}/Shopping?productId=${productId}&amount=${amountToAdd}&setAmount=true`, {}, this.httpOptions)// empty body
    }
    // Remove Product from shoppingbag
    deleteShoppingItem(productId:number){
      return this.http.delete(`${this.BaseUrl}/Shopping?productId=${productId}`, this.httpOptions)// empty body
      .subscribe();
    }
    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ProductService message with the MessageService */
  private log(message: string) {
    console.log(`ShoppingService: ${message}`);
  }
  /** add auth when not already added in headers */
  CheckHeaders(){
    if(this.httpOptions.headers.get('Authorization') == null){
      const token = JSON.parse(localStorage.getItem('user') || "").token
      this.httpOptions.headers = this.httpOptions.headers.append('Authorization' , `Bearer ${token}`);
    }
    
  }
}
