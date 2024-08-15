import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = 'http://localhost:8082/api/products';

  constructor(private httpClient: HttpClient) { }

  getProductList(id: number): Observable<Product[]> {
    
    const searchURL = `${this.baseURL}/search`;

    return this.httpClient.get<GetResponse>(`${searchURL}/findByCategoryId?id=${id}`)
    .pipe(map(response => response._embedded.products));
  }

}

interface GetResponse {
  _embedded: {
    products : Product[]
  }
}
