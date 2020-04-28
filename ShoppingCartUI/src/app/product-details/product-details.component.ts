import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductDetailsService } from "./product-details.service";

@Component({
  selector: "app-product-details",
  styleUrls: ["./product-details.component.css"],
  templateUrl: "./product-details.component.html",
})
export class ProductDetailsComponent implements OnInit {

  public prodId: string;
  public prodDetails: any;
  public errorMessage: string;
  public orderedPid: any;
  public notifyPid: any;
  public username: string;
  constructor(private prodDetServ: ProductDetailsService, private actRoute: ActivatedRoute, private router: Router) { }

  public ngOnInit() {
    this.prodId = this.actRoute.snapshot.paramMap.get("prod_id");
    this.username = this.actRoute.snapshot.paramMap.get("username");
    // console.log(this.prodId, this.username);
    this.prodDetServ.getProduct(this.prodId).subscribe(
      (data) => {
        this.prodDetails = data;
        this.errorMessage = null;
      },
      (err) => this.errorMessage = "No products found!",
      );
  }

  public buyProd(product) {
    this.prodDetServ.purchaseProd(this.username, product).subscribe(
      (success) => {
        this.orderedPid = product._id; this.notifyPid = null;
        this.router.navigate(["/order-success/" + product._id + "/" + this.username]);
        },
      (error) => {this.errorMessage = error; },
    );
  }

  public notify(prod) {
    this.notifyPid = prod._id;
    this.orderedPid = null;
  }

  public goBack() {
    this.router.navigate(["/dashboard/" + this.username]);
  }

}
