import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../models/Product";
import {map, Observable} from 'rxjs';
import {onlyUnique} from "../definitions";

@Component({
  selector: 'app-product-selection',
  templateUrl: './product-selection.component.html',
  styleUrls: ['./product-selection.component.scss']
})
export class ProductSelectionComponent implements OnInit {

  products$! : Observable<Product[]>;
  categories$! : Observable<string[]>;

  constructor(readonly productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
    this.categories$ = this.products$.pipe(
      map(prod => prod
        .map(o => o.category)
        .filter((o) : o is string => o !== undefined)
        .filter(onlyUnique)
      ),
    );
  }

}
