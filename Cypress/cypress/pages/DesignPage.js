import PageBase from "./PageBase";

class DesignPage extends PageBase {
  NAME = "Design";

  fillLabel(text) {
    cy.get('#settings-navigation .gh-blognav-add').parent().then((parent) => {
      cy.get('.gh-blognav-label input', { withinSubject: parent }).clear().type(text);
    })

    return this;
  }

  fillUrl(text) {
    cy.get('#settings-navigation .gh-blognav-add').parent().then((parent) => {
      cy.get('.gh-blognav-url input', { withinSubject: parent }).clear().type(text);
    })
    
    return this;
  }

  addNavItem() {
    cy.get('#settings-navigation .gh-blognav-add').click();

    return this;
  }

  getErrorMessage() {
    return cy.get('.error p.response');
  }
}

export default DesignPage;
