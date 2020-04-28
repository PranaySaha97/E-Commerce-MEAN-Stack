import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  styleUrls: ["./app.component.css"],
  templateUrl: "./app.component.html",
})
export class AppComponent {
  public title = "ShoppingCartUI";
  public username: string;
  public view: boolean;
  constructor(private router: Router) {}
  public getCustName(name) {
    this.username = name;
  }

  public logout() {
    this.username = null;
    this.router.navigate(["/home"]);
  }

  public goHome() {
    if (this.username) {
      this.router.navigate(["/dashboard/" + this.username]);
    }
  }
}
