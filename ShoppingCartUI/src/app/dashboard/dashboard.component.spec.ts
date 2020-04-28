import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { DashboardService } from "./dashboard.service";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [ FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [ DashboardService ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should give category wise products", () => {
    component.products = [
      {
        _id: "1001",
        pName: "Asus Zenfone Max Pro M2",
        pDescription: "an economical phone by Asus",
        pRating: 3.5,
        pCategory: "Electronics",
        price: 14999,
        color: "Black",
        image: "Zenfone Max Pro M2.png",
        specification: "",
        dateFirstAvailable: "2012-09-17T00:00:00.000Z",
        dateLastAvailable: "2017-09-17T00:00:00.000Z",
        pSeller: {
          s_Id: "Asus@Seller",
          pDiscount: 0.2,
          pQuantity: 661,
          pShippingCharges: 150,
        },
      },
      {
        _id: "1002",
        pName: "Redmi Note 6 Pro",
        pDescription: "an economical phone by Xiaomi",
        pRating: 4,
        pCategory: "Electronics",
        price: 13999,
        color: "Black",
        image: "Redmi note 6 Pro.jpg",
        specification: "",
        dateFirstAvailable: "2012-09-17T00:00:00.000Z",
        dateLastAvailable: "2017-09-17T00:00:00.000Z",
        pSeller: {
          s_Id: "Xiaomi@Seller",
          pDiscount: 0.2,
          pQuantity: 665,
          pShippingCharges: 150,
        },
      },
      {
        _id: "1003",
        pName: "Moto G7 Plus",
        pDescription: "a prime phone by Moto",
        pRating: 4,
        pCategory: "Electronics",
        price: 23599,
        color: "Silver",
        image: "moto-g7.jpg",
        specification: "",
        dateFirstAvailable: "2012-09-17T00:00:00.000Z",
        dateLastAvailable: "2017-09-17T00:00:00.000Z",
        pSeller: {
          s_Id: "Moto@Seller",
          pDiscount: 0.2,
          pQuantity: 666,
          pShippingCharges: 150,
        },
      },
      {
        _id: "1004",
        pName: "Lenovo Tab 2 A8-50",
        pDescription: "a high end phone by Lenovo",
        pRating: 4.5,
        pCategory: "Electronics",
        price: 19999,
        color: "Blue",
        image: "lenovoTab.png",
        specification: "",
        dateFirstAvailable: "2012-09-17T00:00:00.000Z",
        dateLastAvailable: "2017-09-17T00:00:00.000Z",
        pSeller: {
          s_Id: "Lenovo@Seller",
          pDiscount: 0.2,
          pQuantity: 666,
          pShippingCharges: 150,
        },
      },
      {
        _id: "1005",
        pName: "iphone 8 plus",
        pDescription: "a high end phone by apple",
        pRating: 4.9,
        pCategory: "Electronics",
        price: 79999,
        color: "Rose Gold",
        image: "Iphone 8 plus-1.jpg",
        specification: "",
        dateFirstAvailable: "2012-09-17T00:00:00.000Z",
        dateLastAvailable: "2017-09-17T00:00:00.000Z",
        pSeller: {
          s_Id: "Apple@Seller",
          pDiscount: 0.2,
          pQuantity: 666,
          pShippingCharges: 150,
        },
      },
    ];
    component.fetchProds("Electronics");
    expect(component.products.length).toBe(5);
  });

  it("search bar should work", () => {
    component.products = [
      {
        _id: "1002",
        pName: "Redmi Note 6 Pro",
        pDescription: "an economical phone by Xiaomi",
        pRating: 4,
        pCategory: "Electronics",
        price: 13999,
        color: "Black",
        image: "Redmi note 6 Pro.jpg",
        specification: "",
        dateFirstAvailable: "2012-09-17T00:00:00.000Z",
        dateLastAvailable: "2017-09-17T00:00:00.000Z",
        pSeller: {
          s_Id: "Xiaomi@Seller",
          pDiscount: 0.2,
          pQuantity: 665,
          pShippingCharges: 150,
        },
      }
    ];
    component.searchProd("red");
    expect(component.products).toEqual(
      [{
        _id: "1002",
        pName: "Redmi Note 6 Pro",
        pDescription: "an economical phone by Xiaomi",
        pRating: 4,
        pCategory: "Electronics",
        price: 13999,
        color: "Black",
        image: "Redmi note 6 Pro.jpg",
        specification: "",
        dateFirstAvailable: "2012-09-17T00:00:00.000Z",
        dateLastAvailable: "2017-09-17T00:00:00.000Z",
        pSeller: {
          s_Id: "Xiaomi@Seller",
          pDiscount: 0.2,
          pQuantity: 665,
          pShippingCharges: 150,
        },
      }],
    );
  });
});
