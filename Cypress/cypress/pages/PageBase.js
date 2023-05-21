let step_counter = 0;

class PageBase {
  static resetStepCounter() {
    console.log(step_counter + 'R')
    step_counter = 0;
    console.log(step_counter + 'B')
  }

  screenshot(func) {
    let fileName;
    
    cy.then(() => {
      fileName = Cypress.spec.fileName + '/' +
        Cypress.currentTest.title.slice(0, 5).toLowerCase() + '/' + 
        ('00'+step_counter).slice(-2) + '_' + this.NAME + '_' + func;
      step_counter++;

      console.log(fileName);
      if(Cypress.env('screenshotEnabled')) {
        cy.screenshot(fileName, {overwrite: true});
      }
    })
  }
}

export default PageBase;
