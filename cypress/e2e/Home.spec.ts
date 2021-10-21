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

  it("Should filter by nationality", () => {
    cy.get('[data-testid="filter-nationality"]').click();
    cy.get(".filter__options");
  });
});
