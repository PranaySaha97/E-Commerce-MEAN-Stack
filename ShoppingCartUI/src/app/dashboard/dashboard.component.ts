import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DashboardService } from "./dashboard.service";

@Component({
  selector: "app-dashboard",
  styleUrls: ["./dashboard.component.css"],
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {

  public catArray: any;
  public products: any;
  public errorMessage: string;
  public orderedPid: any;
  public username: string;
  public notifyPid: any;
  // @Input()
  // username: string;

  constructor(private dashboardServ: DashboardService, private actroute: ActivatedRoute, private router: Router) { }

  public ngOnInit() {
    // console.log("Hi I am in dashboard");
    this.username = this.actroute.snapshot.paramMap.get("username");
    this.fetchCategories();
    this.fetchAllProducts();
  }

  public fetchCategories() {
    this.dashboardServ.getProdCatetgory().subscribe(
      (data) => {this.catArray = data;
        // console.log(typeof data);
      },
      );
  }

  public fetchAllProducts() {
    this.dashboardServ.getAllProds().subscribe(
      (data) => this.products = data,
      (err) => this.errorMessage = err,
      );
  }

  public fetchProds(value) {
    this.dashboardServ.getCatProds(value).subscribe(
      (prods) => {this.products = prods; },
      (err) => { this.errorMessage = err; },
      );
  }

  public searchProd(name) {
    // console.log(name);
    this.dashboardServ.getAllProds().subscribe(
      (data) => {
        this.products = data.filter((ele) => {
          return ele.pName.toLowerCase().includes(name.toLowerCase());
        });
      },
      (err) => this.errorMessage = err,
      );
  }

  public buyProd(product) {
    this.dashboardServ.purchaseProd(this.username, product).subscribe(
      (success) => {
        this.orderedPid = product._id;
        this.notifyPid = null;
        this.router.navigate(["/order-success/" + product._id + "/" + this.username]);
      },
      (error) => {this.errorMessage = error; },
    );
  }

  public notify(prod) {
    this.notifyPid = prod._id;
    this.orderedPid = null;
  }

  public viewProd(prodId) {
    this.router.navigate(["/view-product/" + prodId + "/" + this.username]);
  }

}
