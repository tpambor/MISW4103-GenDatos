export class CreateSiteStepOneV3 {
  get hash() {
    return '#/setup/one';
  }

  nextStep() {
    cy.contains('a', 'Create your account').click();

    return new CreateSiteStepTwoV3();
  }
}

export class CreateSiteStepOneV4 {
  get hash() {
    return '#/setup';
  }

  nextStep() {
    return new CreateSiteStepTwoV4();
  }
}

class CreateSiteStepTwoV3 {
  fillBlogTitle(value) {
    cy.get('input[name="blog-title"]').type(value);

    return this;
  }

  fillName(value) {
    cy.get('input[name="name"]').type(value);

    return this;
  }

  fillEmail(value) {
    cy.get('input[name="email"]').type(value);

    return this;
  }

  fillPassword(value) {
    cy.get('input[name="password"]').type(value);

    return this;
  }

  nextStep() {
    cy.get('button[type="submit"]').click()

    return new CreateSiteStepThreeV3();
  }
}

class CreateSiteStepTwoV4 extends CreateSiteStepTwoV3 {
  nextStep() {
    cy.get('button[type="submit"]').click()

    return new CreateSiteStepThreeV4();
  }
}


class CreateSiteStepThreeV3 {
  skip() {
    cy.contains('button', "I'll do this later, take me to my site!").click()
  }
}

class CreateSiteStepThreeV4 {
  skip() {
    cy.wait(10000);
    cy.visit('/ghost/');
    cy.wait(10000);
  }
}
