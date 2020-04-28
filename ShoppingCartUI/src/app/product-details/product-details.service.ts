import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductDetailsService {

  constructor(private http: HttpClient) { }

  public getProduct(pid): Observable<any> {
    return this.http.get<any>("http://localhost:3000/getProduct/" + pid);
  }

  public purchaseProd(user, prod): Observable<any> {
    return this.http.put<any>("http://localhost:3000/addOrder/" + user, prod, {responseType: "text" as "json"});
  }
}
