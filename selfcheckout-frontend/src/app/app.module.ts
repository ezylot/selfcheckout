import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { ProductAdministrationComponent } from './product-administration/product-administration.component';
import { ShoppingBasketComponent } from './shopping-basket/shopping-basket.component';
import { ProductSelectionComponent } from './product-selection/product-selection.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FeatherIconDirective} from "./services/feather-icon.directive";
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProductAdministrationComponent,
    ShoppingBasketComponent,
    ProductSelectionComponent,
    FeatherIconDirective,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
