import { Injectable } from '@angular/core';
import { Product } from '../products/product.interface';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, catchError, delay, shareReplay, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://storerestservice.azurewebsites.net/api/products/';
  products$: Observable<Product[]>;

  constructor(private http: HttpClient) {
    this.initProducts();
  }

  insertProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, newProduct);
  }

  getProductById(id: number): Observable<Product> {
    return this
            .products$
            .pipe(
              map(products => products.find(product => product.id == id))
            )
  }

  initProducts(): void {
    let url:string = this.baseUrl + '?$orderby=ModifiedDate%20desc';
    this.products$ = this
                      .http
                      .get<Product[]>(url)
                      .pipe(
                        tap(console.table),
                        delay(1500), // Juste pour simuler un délai!
                        shareReplay(),
                        catchError(
                          error => {
                            console.log(error);
                            return throwError(() => "Networking problem.")
                          }
                        )
                      );
  }
}
