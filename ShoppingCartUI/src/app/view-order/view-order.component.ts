import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ViewOrderService } from "./view-order.service";

@Component({
  selector: "app-view-order",
  styleUrls: ["./view-order.component.css"],
  templateUrl: "./view-order.component.html",
})
export class ViewOrderComponent implements OnInit {

  public orders: any;
  public username: string;
  public message: string;
  constructor(private viewOrdServ: ViewOrderService, private actRoute: ActivatedRoute, private router: Router) { }

  public ngOnInit() {
    this.username = this.actRoute.snapshot.paramMap.get("username");
    this.viewOrders();
  }

  public viewOrders() {
    this.viewOrdServ.getOrders(this.username).subscribe(
      (success) => {
        if (success.Orders.length > 0) {
          this.orders = success.Orders;
        } else {
          this.message = "You haven't ordered anything yet!";
        }
      },
      (err) => {
        // console.log(err);
      },
    );
  }

  public goBack() {
    this.router.navigate(["/dashboard/" + this.username]);
  }

}
