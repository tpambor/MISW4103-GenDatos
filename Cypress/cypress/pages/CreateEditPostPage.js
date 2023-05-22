import PageBase from "./PageBase";
import { PostListPageV3, PostListPageV4 } from "./PostListPage";
import { PostSettingsV3, PostSettingsV4 } from "./PostSettings";

export class CreateEditPostPageV3 extends PageBase {
  NAME = "CreateEditPost";

  fillTitle(value) {
    cy.get('textarea.gh-editor-title').clear({force: true}).type(value);
    this.screenshot('fillTitle');

    return this;
  }

  fillTitleNull() {
    cy.get('textarea.gh-editor-title').clear({ force: true });
    this.screenshot('fillTitleNull');

    return this;
  }
  fillContent(value) {
    let editor = cy.get('div.koenig-editor__editor');
    editor.click();
    if (value != "") {
      editor.clear({force: true}).type(value);
      this.screenshot('fillContent');
    }

    return this;
  }

  goToPosts() {
    cy.get('.gh-editor-header').should('not.contain', 'Saving');
    cy.get('a').contains('Posts').click();
    cy.get('h3.gh-content-entry-title').should('exist');
    this.screenshot('goToPosts');

    return new PostListPageV3();
  }

  publish() {
    cy.get('.gh-editor-header').should('not.contain', 'Saving');
    cy.get('.gh-publishmenu-trigger').click();
    cy.get('.gh-publishmenu-radio-label').should('exist');
    this.screenshot('publishMenu');
    cy.get('.gh-publishmenu-radio-label').contains('Set it live now').click();
    this.screenshot('publishSelectLive');
    this.screenshot('publishConfirm_dummy');

    cy.get('.gh-publishmenu-button').click();

    cy.get('.gh-notification-title').contains('Published');
    this.screenshot('publish');
    
    cy.get('.gh-notification-title', { timeout: 10000 }).should('not.exist');
    return this;
  }

  publishLater() {
    cy.get('.gh-editor-header').should('not.contain', 'Saving');
    cy.get('.gh-publishmenu-trigger').click();
    cy.get('.gh-publishmenu-radio-label').should('exist');
    this.screenshot('publishMenu');
    cy.get('.gh-publishmenu-radio-label').contains('Schedule it for later').click();
    this.screenshot('publishSelectLater')
    this.screenshot('publishConfirm_dummy');

    cy.get('.gh-publishmenu-button').click();
    cy.get('.gh-notification-title').contains('Scheduled');
    this.screenshot('schedule');

    cy.get('.gh-notification-title', { timeout: 10000 }).should('not.exist');
    return this;
  }

  openSettings() {
    cy.get('span.midgrey-l2').click();
    cy.wait(3000);
    cy.get('.gh-editor-header').should('not.contain', 'Saving');
    cy.get('button[title="Settings"]').click();
    cy.get('.settings-menu-header').should('be.visible');
    this.screenshot('openSettings');

    return new PostSettingsV3();
  }
}

export class CreateEditPostPageV4 extends CreateEditPostPageV3 {
  goToPosts() {
    cy.get('.gh-editor-header').should('not.contain', 'Saving');
    cy.get('a').contains('Posts').click();
    cy.get('h3.gh-content-entry-title').should('exist');
    this.screenshot('goToPosts');

    return new PostListPageV4();
  }

  publish() {
    cy.get('.gh-editor-header').should('not.contain', 'Saving');
    cy.get('.gh-publishmenu-trigger').click();
    cy.get('.gh-publishmenu-radio-label').should('exist');
    this.screenshot('publishMenu');
    cy.get('.gh-publishmenu-radio-label').contains('Set it live now').click();
    this.screenshot('publishSelectLive');

    cy.get('.gh-publishmenu-button').click();

    cy.get('.modal-footer .gh-btn').should('exist');
    cy.get('.epm-modal').invoke('css', 'opacity', '1');
    cy.wait(1000);
    this.screenshot('publishConfirm');
    cy.get('.modal-footer .gh-btn').contains('Publish').click();

    cy.get('.gh-notification-title').contains('Published');
    this.screenshot('publish');
    
    cy.get('.gh-notification-title', { timeout: 10000 }).should('not.exist');
    return this;
  }

  publishLater() {
    cy.get('.gh-editor-header').should('not.contain', 'Saving');
    cy.get('.gh-publishmenu-trigger').click();
    cy.get('.gh-publishmenu-radio-label').should('exist');
    this.screenshot('publishMenu');
    cy.get('.gh-publishmenu-radio-label').contains('Schedule it for later').click();
    this.screenshot('publishSelectLater')

    cy.get('.gh-publishmenu-button').click();

    cy.get('.modal-footer .gh-btn').should('exist');
    cy.get('.epm-modal').invoke('css', 'opacity', '1');
    cy.wait(1000);
    this.screenshot('publishConfirm');
    cy.get('.modal-footer .gh-btn').contains('Schedule').click();

    cy.get('.gh-notification-title').contains('Scheduled');
    this.screenshot('schedule');

    cy.get('.gh-notification-title', { timeout: 10000 }).should('not.exist');
    return this;
  }

  openSettings() {
    cy.get('.gh-editor-post-status').click();
    cy.wait(3000);
    cy.get('.gh-editor-header').should('not.contain', 'Saving');
    cy.get('button[title="Settings"]').click();
    cy.get('.settings-menu-header').should('be.visible');
    this.screenshot('openSettings');

    return new PostSettingsV4();
  }
}
