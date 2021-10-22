context("Home", () => {
  beforeEach(() => {
    cy.visit(`/?seed=test`);
  });

  it("Should display home page", () => {
    cy.get("body").contains("Gender");
  });

  it("Should return 1 result when the searchBar is typed", () => {
    cy.get(".search-bar__input").type("areta");
    cy.get(".table-item").should("have.length", 1);
  });

  it("Should pagination the results", () => {
    cy.get(".table-item").should("have.length", 50);
    cy.scrollTo("bottom");
    cy.get(".table-item").should("have.length", 100);
  });

  it("Should filter by gender", () => {
    cy.get('[data-testid="filter-gender"]').click();

    cy.get(".filter__options li")
      .eq(2)
      .click({ force: true });

    cy.wait(1000);

    cy.get("tbody tr td")
      .eq(1)
      .should("have.text", "male");
  });

  it("Should filter by nationality", () => {
    cy.get('[data-testid="filter-nationality"]').click();

    cy.get("[data-testid='filter-nationality'] .filter__options li")
      .eq(2)
      .click({ force: true });

    cy.wait(1000);

    cy.get("tbody tr td")
      .last()
      .click();

    cy.get(".modal  .content__andress h2 span").should("have.text", "(Brazil)");
  });

  context("User", () => {
    beforeEach(() => {
      cy.visit("/user/silverzebra371?page=2&seed=test");
    });

    it("Should open modal with user", () => {
      cy.get(".modal").should("be.visible");
    });

    it("Should close the modal user", () => {
      cy.get('[data-testid="modal-close"]').click();
      cy.get(".modal").should("not.be.visible");
    });

    it("Should copy link when user click in btn", () => {
      cy.get("[data-testid='clipboard']").click();

      cy.window().then((win) => {
        win.navigator.clipboard.readText().then((text) => {
          expect(text).toBe("http://localhost:8080/user/silverzebra371?page=2&seed=test");
        });
      });
    });
  });
});
