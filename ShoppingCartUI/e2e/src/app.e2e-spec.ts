import { browser, by, logging } from "protractor";
import { AppPage } from "./app.po";

describe("test cases", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should get appropriate url on load", () => {
    browser.get("http://localhost:4200");
    expect(browser.getCurrentUrl()).toMatch("http://localhost:4200/home");
  });

  it("should login with correct credentials", () => {
    const emailId = browser.driver.findElement(by.id("email"));
    const pass = browser.driver.findElement(by.id("pass"));
    const logintbn = browser.driver.findElement(by.id("loginbtn"));

    emailId.sendKeys("user3@test.com");
    pass.sendKeys("user@3");

    logintbn.click();
    browser.sleep(5000);
    expect(browser.getCurrentUrl()).toMatch("http://localhost:4200/dashboard/User%203");
  });

  it("should logout", () => {
    const logoutbtn = browser.driver.findElement(by.id("logoutbtn"));

    logoutbtn.click();
    browser.sleep(5000);
    expect(browser.getCurrentUrl()).toMatch("http://localhost:4200/home");
  });

  it("should not login with incorrect credentials", () => {
    const emailId = browser.driver.findElement(by.id("email"));
    const pass = browser.driver.findElement(by.id("pass"));
    const logintbn = browser.driver.findElement(by.id("loginbtn"));

    emailId.sendKeys("wrong@test.com");
    pass.sendKeys("wrongPass");

    logintbn.click();
    browser.sleep(5000);
    expect(browser.getCurrentUrl()).toMatch("http://localhost:4200/home");
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
