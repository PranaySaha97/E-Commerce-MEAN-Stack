import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  public getCatProds(category): Observable<any> {
    return this.http.get<any>("http://localhost:3000/fetchProduct/" + category);
  }

  public getProdCatetgory(): Observable<any> {
    return this.http.get<any>("http://localhost:3000/getCategory");
  }

  public getAllProds(): Observable<any> {
    return this.http.get<any>("http://localhost:3000/getProducts");
  }

  public purchaseProd(user, prod): Observable<any> {
    return this.http.put<any>("http://localhost:3000/addOrder/" + user, prod, {responseType: "text" as "json"});
  }
}
