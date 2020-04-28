import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ThankyouService {

  constructor(private http: HttpClient) { }

  public fetchProd(pId): Observable<any> {
    return this.http.get<any>("http://localhost:3000/getProduct/" + pId);
  }

  public updateQuantity(pId, quantity): Observable<any> {
    return this.http.put<any>("http://localhost:3000/updateQuantity/" + pId, {data: quantity});
  }
}
