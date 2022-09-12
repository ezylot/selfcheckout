import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {Product} from "../models/Product";
import {BehaviorSubject, Observable, share, shareReplay, switchMap} from "rxjs";
import {WithRequired} from "../definitions";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private getProducts$ : Observable<Product[]> | undefined;
  private refresh$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  constructor(private readonly httpClient: HttpClient) { }

  public getProducts() : Observable<Product[]> {
    if(this.getProducts$ == undefined) {
      this.getProducts$ = this.refresh$.pipe(
        switchMap(value => this.httpClient.get<Product[]>("/api/products")),
        shareReplay(1),
      );
    }
    return this.getProducts$;
  }

  createNewProduct(): Observable<any> {
    let newProduct = { } as Product;
    newProduct.name = "Neues Produkt";
    let httpCall = this.httpClient.post("/api/products", newProduct).pipe(share());
    httpCall.subscribe(() => this.refresh$.next())
    return httpCall;
  }

  deleteProduct(productId: string): Observable<any> {
    let httpCall = this.httpClient.delete(`/api/products/${productId}`).pipe(share());
    httpCall.subscribe(() => this.refresh$.next())
    return httpCall;
  }

  updateProduct(product: WithRequired<Partial<Product>, "_id">): Observable<any> {
    let httpCall = this.httpClient.patch(`/api/products/${product._id}`, product).pipe(share());
    httpCall.subscribe(() => this.refresh$.next())
    return httpCall;
  }
}
