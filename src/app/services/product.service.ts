import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  private baseURL = 'http://localhost:8082/api/products';
  private categoryURL = 'http://localhost:8082/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductList(id: number): Observable<Product[]> {

    const searchURL = `${this.baseURL}/search`;

    return this.httpClient.get<GetResponseProduct>(`${searchURL}/findByCategoryId?id=${id}`)
    .pipe(map(response => response._embedded.products));
  }

  getProductCategoriesList(): Observable<ProductCategory[]> {
    

    return this.httpClient.get<GetResponseProductCategory>(`${this.categoryURL}`)
    .pipe(map(response => response._embedded.productCategory));
  }

}



interface GetResponseProduct {
  _embedded: {
    products : Product[]
  }
}


interface GetResponseProductCategory {
  _embedded: {
    productCategory : ProductCategory[]
  }
}
