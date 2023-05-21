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
  return cy.request("http://my.api.mockaroo.com/ghost_data.json?key=ea7bb5c0");
});
