import EditProfilePage from "./EditProfilePage";
import PageBase from "./PageBase";

export class StaffListPageV3 extends PageBase {
  NAME = "StaffList"

  getUsernames() {
    return cy.get('.gh-active-users .apps-card-app-title');
  }

  editProfile(value) {
    cy.get('.gh-active-users .apps-card-app-title').contains(value).click();
    cy.get('input#user-name').should('exist');
    //cy.get('.user-actions-menu').invoke('css', 'display', 'none'); // Animation breaks screenshot
    this.screenshot('editProfile');

    return new EditProfilePage();
  }
}

export class StaffListPageV4 extends PageBase {
  NAME = "StaffList"

  getUsernames() {
    return cy.get('.gh-active-users .apps-card-app-title');
  }

  editProfile(value) {
    cy.get('.gh-active-users .apps-card-app-title').contains(value).click();
    cy.get('input#user-name').should('exist');
    this.screenshot('editProfile');

    return new EditProfilePage();
  }
}