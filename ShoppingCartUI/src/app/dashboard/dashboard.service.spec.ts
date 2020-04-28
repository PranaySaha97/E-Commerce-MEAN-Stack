import { HttpClientModule } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";

import { DashboardService } from "./dashboard.service";

describe("DashboardService", () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ],
    providers: [ HttpClient ],
  }));

  it("should be created", () => {
    const service: DashboardService = TestBed.get(DashboardService);
    expect(service).toBeTruthy();
  });

  it("should fetch all products", () => {
    const service: DashboardService = TestBed.get(DashboardService);
    service.getAllProds().subscribe(
      (data) => expect(data.length).toBe(20),
      );
  });

  it("should fetch all categories", () => {
    const service: DashboardService = TestBed.get(DashboardService);
    service.getProdCatetgory().subscribe(
      (data) => expect(data.length).toBe(4),
      );
  });

  it("should fetch category wise products", () => {
    const service: DashboardService = TestBed.get(DashboardService);
    service.getCatProds("Electronics").subscribe(
      (data) => expect(data.length).toBe(5),
      );
  });
});
