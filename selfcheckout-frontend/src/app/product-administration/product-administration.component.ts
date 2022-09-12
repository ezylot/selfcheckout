import {Component, ElementRef, isDevMode, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../services/product.service";
import {PermissionService} from "../services/permission.service";
import {Router} from "@angular/router";
import {
  BehaviorSubject,
  combineLatestWith,
  debounceTime,
  filter,
  finalize,
  map,
  Observable,
  Subject,
  takeUntil
} from 'rxjs';
import {Product} from "../models/Product";

@Component({
  selector: 'app-product-administration',
  templateUrl: './product-administration.component.html',
  styleUrls: ['./product-administration.component.scss']
})
export class ProductAdministrationComponent implements OnInit, OnDestroy {
  editingProduct: string | null = null;
  showLoadingSpinner = false;
  loadingSpinner$ = new Subject<boolean>();
  loading = false;
  finish$ = new Subject();

    products$!: Observable<Product[]>;

  searchString: string = "";
  searchStringChanged$: Subject<undefined> = new BehaviorSubject(undefined);

  @ViewChild('productName') productNameElem!: ElementRef;
  @ViewChild('productCategory') productCategoryElem!: ElementRef;
  @ViewChild('productPrice') productPriceElem!: ElementRef;

  constructor(readonly productService: ProductService,
              readonly permissionService: PermissionService,
              readonly router: Router) { }

  ngOnInit(): void {
    this.checkPermissionsOrRedirect();
    this.loadingSpinner$.pipe(
      takeUntil(this.finish$),
      debounceTime(50)
    ).subscribe(show => this.showLoadingSpinner = show);

    this.products$ = this.productService.getProducts().pipe(
      combineLatestWith(this.searchStringChanged$),
      takeUntil(this.finish$),
      map(([products, _]) => products.filter(p =>
        p.name?.toLowerCase()?.includes(this.searchString.toLowerCase())
        || p.category?.toLowerCase()?.includes(this.searchString.toLowerCase()))
      )
    );
  }

  ngOnDestroy(): void {
    this.finish$.next(undefined);
    this.finish$.complete();
  }

  newProduct() {
    if(this.loading) return;
    this.checkPermissionsOrRedirect();


    this.startLoading();
    this.productService.createNewProduct().pipe(
      takeUntil(this.finish$),
      finalize(() => this.finishLoading()),
    ).subscribe(() => {});
  }

  delete(_id: string) {
    if(this.loading) return;
    this.checkPermissionsOrRedirect();

    if(!isDevMode() && !confirm("Willst du das Produkt wirklich löschen?")) return;

    this.startLoading();
    this.productService.deleteProduct(_id).pipe(
      takeUntil(this.finish$),
      finalize(() => this.finishLoading()),
    ).subscribe(() => { if(this.editingProduct === _id) this.editingProduct = null; });
  }

  edit(_id: string) {
    if(this.loading) return;
    this.checkPermissionsOrRedirect();

    if(this.editingProduct !== null) {
      alert("Ein Produkt wird derzeit schon bearbeitet. Bitte speicher oder verwirf die Änderungen am geöffneten Produkt");
    } else {
      this.editingProduct = _id;
    }
  }

  finishEdit(_id: string) {
    if(this.loading) return;
    this.checkPermissionsOrRedirect();

    this.startLoading();
    this.productService.updateProduct({
      _id: _id,
      name: this.productNameElem.nativeElement.value,
      category: this.productCategoryElem.nativeElement.value,
      price: this.productPriceElem.nativeElement.value,
    }).pipe(
      takeUntil(this.finish$),
      finalize(() => this.finishLoading()),
    ).subscribe(() => { this.editingProduct = null; });
  }

  abortEdit(_id: string) {
    if(this.loading) return;
    this.checkPermissionsOrRedirect();

    this.editingProduct = null;
  }

  private startLoading() {
    this.loading = true;
    this.loadingSpinner$.next(true);
  }

  private finishLoading() {
    this.loading = false;
    this.loadingSpinner$.next(false);
  }

  private checkPermissionsOrRedirect() {
    if(!this.permissionService.isLoggedIn()) {
      void this.router.navigate(["/"]);
    }
  }
}
