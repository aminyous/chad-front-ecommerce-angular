import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseURL = 'http://localhost:8082/api/products';
  private categoryURL = 'http://localhost:8082/api/product-category';

  constructor(private httpClient: HttpClient) {}

  getProductListPaginate(
    thePage: number,
    thepageSize: number,
    id: number
  ): Observable<GetResponseProduct> {
    const searchURL = `${this.baseURL}/search/findByCategoryId?id=${id}&page=${thePage}&size=${thepageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchURL);
  }

  getProductList(id: number): Observable<Product[]> {
    const searchURL = `${this.baseURL}/search/findByCategoryId?id=${id}`;

    return this.getProducts(searchURL);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchURL = `${this.baseURL}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchURL);
  }

  searchProductListPaginate(
    thePage: number,
    thepageSize: number,
    theKeyword: string
  ): Observable<GetResponseProduct> {
    const searchURL = `${this.baseURL}/search/findByNameContaining?name=${theKeyword}&page=${thePage}&size=${thepageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchURL);
  }

  private getProducts(searchURL: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProduct>(`${searchURL}`)
      .pipe(map((response) => response._embedded.products));
  }

  getProductCategoriesList(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(`${this.categoryURL}`)
      .pipe(map((response) => response._embedded.productCategory));
  }

  getProduct(theProductId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseURL}/${theProductId}`);
  }
}

interface GetResponseProduct {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
