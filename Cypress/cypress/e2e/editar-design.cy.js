import { faker } from '@faker-js/faker'
import PageFactory from '../pages/PageFactory';
import PageBase from '../pages/PageBase';

describe('Editar Design tests', () => {
  let pageFactory;

  before(() => {
    cy.request('/').then((response) => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(response.body, 'text/html')
      const version = doc.querySelector('meta[name="generator"]').content
      pageFactory = new PageFactory(version)
      return version
    }).should('contain', 'Ghost')
  }) 

  beforeEach(() => {
    PageBase.resetStepCounter(); 
  })

  it('ESC25 - Add navigation with URL', () => {
    faker.seed(1025);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the design page
    nav.goToDesign()
      // And I fill in the URL
      .fillUrl(faker.internet.url())
      // And I add the navigation entry
      .addNavItem()
      // Then I see a error message indicating that I must specify a label
      .getErrorMessage().should('contain', 'You must specify a label')
  })

  it('ESC26 - Add navigation with label and URL', () => {
    faker.seed(1026);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the design page
    nav.goToDesign()
      // And I fill in the URL
      .fillUrl(faker.internet.url())
      // And I fill in the label
      .fillLabel(faker.lorem.words())
      // And I add the navigation entry
      .addNavItem()
      // Then I don't see a error message
      .getErrorMessage().should('not.exist')
  })

  it('ESC27 - Add navigation with label and invalid URL', () => {
    faker.seed(1027);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the design page
    nav.goToDesign()
      // And I fill in the URL
      .fillUrl('http://' + faker.internet.mac())
      // And I fill in the label
      .fillLabel(faker.lorem.words())
      // And I add the navigation entry
      .addNavItem()
      // Then I see a error message indicating that I must specify a valid URL
      .getErrorMessage().should('contain', 'You must specify a valid URL or relative path')
  })

  it('ESC28 - Add navigation with duplicate label and URL', () => {
    faker.seed(1028);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    const label = faker.lorem.words();

    // When I navigate to the design page
    nav.goToDesign()
      // And I fill in the URL
      .fillUrl(faker.internet.url())
      // And I fill in the label
      .fillLabel(label)
      // And I add the navigation entry
      .addNavItem()
      // And I fill in the URL
      .fillUrl(faker.internet.url())
      // And I fill in the label
      .fillLabel(label)
      // And I add the navigation entry
      .addNavItem()
      // Then I see a error message indicating that a entry with this name already exists
      .getErrorMessage().should('contain', 'Label already in use')
  })
})