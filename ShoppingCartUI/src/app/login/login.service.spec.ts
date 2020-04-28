import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component";

import { LoginService } from "./login.service";

describe("LoginService", () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [LoginComponent],
    imports: [HttpClientModule],
    providers: [ HttpClient ],
  }));

  // it("should be created", () => {
  //   const service: LoginService = TestBed.get(LoginService);
  //   expect(service).toBeTruthy();
  // });
});
