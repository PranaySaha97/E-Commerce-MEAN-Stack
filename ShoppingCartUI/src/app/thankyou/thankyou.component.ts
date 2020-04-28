import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ThankyouService } from "./thankyou.service";

@Component({
  selector: "app-thankyou",
  styleUrls: ["./thankyou.component.css"],
  templateUrl: "./thankyou.component.html",
})
export class ThankyouComponent implements OnInit {

  public prodId: string;
  public prodDetails: any;
  public errorMessage: string;
  public username: string;
  constructor(private actRoute: ActivatedRoute, private router: Router, private thankYouServ: ThankyouService) { }

  public ngOnInit() {
    this.prodId = this.actRoute.snapshot.paramMap.get("pId");
    this.username = this.actRoute.snapshot.paramMap.get("uname");
    // console.log(this.prodId);
    this.thankYouServ.fetchProd(this.prodId).subscribe(
      (data) => this.prodDetails = data,
    );

    this.thankYouServ.updateQuantity(this.prodId, 1).subscribe(
      (success) => this.errorMessage = null,
      (err) => this.errorMessage = err.error.message,
      );
  }

  public goBack() {
    this.router.navigate(["/dashboard/" + this.username]);
  }

}
