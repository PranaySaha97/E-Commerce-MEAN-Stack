import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public getCustCred(email): Observable<any> {
    return this.http.get("http://localhost:3000/fetchCustomer/" + email);
  }
}
