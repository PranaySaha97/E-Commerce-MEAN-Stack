import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ThankyouComponent } from "./thankyou/thankyou.component";
import { ViewOrderComponent } from "./view-order/view-order.component";

const routes: Routes = [
  {path: "dashboard/:username", component: DashboardComponent},
  {path: "view-orders/:username", component: ViewOrderComponent},
  {path: "view-product/:prod_id/:username", component: ProductDetailsComponent},
  {path: "order-success/:pId/:uname", component: ThankyouComponent},
  {path: "home", component: AppComponent},
  {path: "**", redirectTo: "/home", pathMatch: "full"},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
