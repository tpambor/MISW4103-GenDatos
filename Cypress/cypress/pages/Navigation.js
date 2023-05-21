import TagListPage from "./TagListPage";
import PageListPage from "./PageListPage";
import DesignPage from "./DesignPage";
import { StaffListPageV3, StaffListPageV4 } from "./StaffListPage";
import { PostListPageV3, PostListPageV4 } from "./PostListPage";
import PageBase from "./PageBase";

export class NavigationV3 extends PageBase {
  NAME = "Navigation";

  goToTags() {
    cy.wait(2000);
    cy.get('nav li a').contains('Tags').click();
    cy.get('h3.gh-tag-list-name').should('exist');

    this.screenshot('goToTags');

    return new TagListPage();
  }

  goToPosts() {
    cy.wait(2000);
    cy.get('nav li a').contains('Posts').click();
    cy.get('h3.gh-content-entry-title').should('exist');

    this.screenshot('goToPosts');

    return new PostListPageV3();
  }

  goToPages() {
    cy.wait(2000);
    cy.get('nav li a').contains('Pages').click();

    cy.wait(2000);
    this.screenshot('goToPages');

    return new PageListPage();
  }

  goToStaff() {
    cy.wait(2000);
    this.screenshot('showSettings_dummy');
    cy.get('nav li a').contains('Staff').click();

    cy.wait(2000);
    this.screenshot('goToStaff');

    return new StaffListPageV3();
  }

  goToDesign() {
    cy.wait(2000);
    cy.get('nav li a').contains('Design').click();

    cy.wait(2000);
    this.screenshot('goToDesign');

    return new DesignPage();
  }
}

export class NavigationV4 extends NavigationV3 {
  goToPosts() {
    cy.wait(2000);
    cy.get('nav li a').contains('Posts').click();
    cy.get('h3.gh-content-entry-title').should('exist');

    this.screenshot('goToPosts');

    return new PostListPageV4();
  }
  
  goToStaff() {
    cy.get('.gh-nav-bottom-tabicon').click();
    cy.wait(1000);
    this.screenshot('showSettings');

    cy.get('.gh-setting-group').contains('Staff').click();

    cy.wait(2000);
    cy.get('.gh-member-actions-menu').invoke('css', 'display', 'none'); // Animation breaks screenshot
    this.screenshot('goToStaff');

    return new StaffListPageV4();
  }

  getSitename() {
    return cy.get('.gh-nav-menu-details-sitetitle');
  }
}
