describe("Quotes app", () => {
  beforeEach(() => {
    // arbitrary code you want running before your tests start
    cy.visit("http://localhost:3000/");
  });

  const nameInput = () => cy.get('input[name="name"]');
  const emailInput = () => cy.get('input[name="email"]');
  const passwordInput = () => cy.get('input[name="password"]');
  const tosInput = () => cy.get('input[name="termsOfService"]');

  const submitBtn = () => cy.get("#submitBtn");

  it("sanity test to make sure that tests work", () => {
    expect(1 + 2).to.equal(3);
    expect(2 + 2).not.to.equal(5);
  });

  it("can type in the inputs", () => {
    nameInput()
      .should("have.value", "")
      .type("Kenny")
      .should("have.value", "Kenny");

    emailInput()
      .should("have.value", "")
      .type("k@k.com")
      .should("have.value", "k@k.com");

    passwordInput()
      .should("have.value", "")
      .type("k123")
      .should("have.value", "k123");
  });

  it("can check the TOS box", () => {
    tosInput().click();
    tosInput().should("be.checked");
  });

  it("can submit a new user", () => {
    nameInput().type("Sammy");
    emailInput().type("s@s.com");
    passwordInput().type("S123");
    submitBtn().click();
    cy.get("#userData").should("exist");
  });

  it("checking invalid form w/o name input ", () => {
    emailInput().type("s@s.com");
    passwordInput().type("S123");
    submitBtn().should("be.disabled");
    cy.get("#userData").should("not.exist");
  });

  it("checking invalid form w/o email input ", () => {
    nameInput().type("Heidi");
    passwordInput().type("H123");
    submitBtn().should("be.disabled");
    cy.get("#userData").should("not.exist");
  });

  it("checking invalid form w/o password input ", () => {
    emailInput().type("k@k.com");
    nameInput().type("Kenny");
    submitBtn().should("be.disabled");
    cy.get("#userData").should("not.exist");
  });
});
