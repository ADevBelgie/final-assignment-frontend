import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { ShoppingBag } from 'src/models/shopping-bag';
import { ShoppingItem } from 'src/models/shopping-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingBagService {

  private BaseUrl = 'https://localhost:44378/api';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    /** GET shoppingbag from the server */
    getShoppingBag(): Observable<ShoppingBag> {
      return this.http.get<ShoppingBag>(`${this.BaseUrl}/Shopping`)
        .pipe(
          tap(_ => this.log('fetched shoppingbag')),
          catchError(this.handleError<ShoppingBag>('GetShoppingBag'))
        );
    }
    
    // Create/ Add product with amount to shopping bag
    putShoppingItemToBag(productId:string, amountToAdd:number) {
      return this.http.put(`${this.BaseUrl}/Shopping?productId=${productId}&amount=${amountToAdd}`, {})// empty body
      .pipe(map(x => {
        // update stored data base on this put request
        
        return x;
      }));
    }
    // Change to set amount in shoppingbag
    putSetAmountShoppingItemToBag(productId:number, amountToAdd:number) {
      return this.http.put(`${this.BaseUrl}/Shopping?productId=${productId}&amount=${amountToAdd}&setAmount=true`, {})// empty body
      .pipe(map(x => {
        // update stored data base on this put request
        
        return x;
      }));
    }
    // Remove Product from shoppingbag
    deleteShoppingItem(productId:number){
      return this.http.delete(`${this.BaseUrl}/Shopping?productId=${productId}`, {})// empty body
      .pipe(map(x => {
        // update stored data base on this delete request
        
        return x;
      }));
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
    this.messageService.add(`ProductService: ${message}`);
  }
}
