Cypress.Commands.add('authenticate', (pageFactory) => {
  // Go to the administration interface
  cy.visit('/ghost/')

  const createSite = pageFactory.createSitePage();
  const signIn = pageFactory.signInPage();

  // If we aren't already logged in we will be redirected to
  //   - the sign in page, if a site already has been created
  //   - the site creation wizard, if a site hasn't yet been created
  cy.hash().should('be.oneOf', [signIn.hash, createSite.hash])
  cy.hash().then((hash) => {
    if(hash === createSite.hash) {
      createSite.screenshot('open');
      createSite
        .nextStep()
        .fillBlogTitle(Cypress.env('blogTitle'))
        .fillName(Cypress.env('fullName'))
        .fillEmail(Cypress.env('username'))
        .fillPassword(Cypress.env('password'))
        .nextStep()
        .skip()
    } else if(hash === signIn.hash) {
      signIn.screenshot('open');
      signIn
        .fillUsername(Cypress.env('username'))
        .fillPassword(Cypress.env('password'))
        .submit()
    }
  })
})

Cypress.Commands.add("mokaroo", () => {
  return cy.request("https://api.mockaroo.com/api/ce5f7b40?count=1&key=c23e3510");
});

Cypress.Commands.add("mockarooTag", () => {
  return cy.request("https://api.mockaroo.com/api/dda12760?count=1&key=c23e3510");
});
