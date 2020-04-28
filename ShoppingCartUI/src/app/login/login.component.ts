import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "./login.service";

@Component({
  selector: "app-login",
  styleUrls: ["./login.component.css"],
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {

  public errorMessage: string;
  public loginForm: FormGroup;
  @Output()
  public loginEventEmitter: EventEmitter<any> = new EventEmitter();
  constructor(private fb: FormBuilder, private logServ: LoginService, private router: Router) { }

  public ngOnInit() {
    this.loginForm = this.fb.group(
      {
        email: ["", [Validators.required, Validators.pattern(/^[A-z0-9_\.\-]+@[A-z0-9_\.\-]+.[A-z]{2,5}$/)]],
        pass: ["", [Validators.required]],
      },
    );
  }

  public login() {

    this.logServ.getCustCred(this.loginForm.value.email).subscribe(
      (data) => {
        // console.log(data, this.loginForm.value);
        if (data.Pass === this.loginForm.value.pass) {
          // console.log("Login Successfull");
          this.errorMessage = null;
          this.loginEventEmitter.emit(data.Name);
          // console.log(data.Name + "sent");
          this.router.navigate(["/dashboard/" + data.Name]);
        } else this.errorMessage = "Incorrect Password.";
      },
      (err) => {
        this.errorMessage = "Incorrect Email ID.";
      },
    );
  }

}
