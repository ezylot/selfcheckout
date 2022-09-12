import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductSelectionComponent} from "./product-selection/product-selection.component";
import {ProductAdministrationComponent} from "./product-administration/product-administration.component";

const routes: Routes = [
  { path: "", component: ProductSelectionComponent },
  { path: "admin", component: ProductAdministrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
