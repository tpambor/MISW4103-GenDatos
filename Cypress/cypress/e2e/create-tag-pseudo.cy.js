import PageFactory from '../pages/PageFactory';
import PageBase from '../pages/PageBase';

describe('Create tag tests', () => {
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

  it('ESC50 - Create a tag with a name', () => {
    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // Make a request to Mockaroo API to get a generated profile
    cy.mockarooTag().then((response) => {
      expect(response.status).to.eq(200);    
      const data = response.body;

      // When I navigate to the tags page
      const createTag = nav.goToTags()
        // And I create a new tag
        .createNewTag();

      const tagName = data[0].name;

      createTag
        // And I fill in the name
        .fillName(tagName)
        // And I save
        .save()
        // Then it is saved
        .should('be.true')

      // And I see the tag in the list of tags
      nav.goToTags()
        .getTagNames().contains(tagName)
    })
  })

  it('ESC51 - Create a tag without a name', () => {
    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the tags page
    const tagList = nav.goToTags();

    tagList.getNumberOfTags().then((numberOfTagsBefore) => {
      // And I create a new tag
      const createTag = tagList.createNewTag();

      createTag
        // And save
        .save()
        // Then it is not saved
        .should('be.false')

      // And I see an error message indicating that I must specify a name for the tag
      createTag.getErrorMessage().should('contain', 'You must specify a name for the tag.')

      // And in the list of tags I see the same number of tags as before
      cy.visit('/ghost/')
      nav.goToTags()
        .getNumberOfTags().should('eq', numberOfTagsBefore)
    })
  })

  it('ESC52 - Create a tag with a name and a color', () => {
    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // Make a request to Mockaroo API to get a generated profile
    cy.mockarooTag().then((response) => {
      expect(response.status).to.eq(200);    
      const data = response.body;

      // When I navigate to the tags page
      const createTag = nav.goToTags()
        // And I create a new tag
        .createNewTag();

      const tagName = data[0].name;

      createTag
        // And I fill in the name
        .fillName(tagName)
        // And I fill in the color
        .fillColor(data[0].color.substring(1))
        // And I save
        .save()
        // Then it is saved
        .should('be.true')

      // And I see the tag in the list of tags
      nav.goToTags()
        .getTagNames().contains(tagName)
    })
  })

  it('ESC53 - Create a tag with a name and a description', () => {
    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // Make a request to Mockaroo API to get a generated profile
    cy.mockarooTag().then((response) => {
      expect(response.status).to.eq(200);    
      const data = response.body;

      // When I navigate to the tags page
      const createTag = nav.goToTags()
        // And I create a new tag
        .createNewTag();

      const tagName = data[0].name;

      createTag
        // And I fill in the name
        .fillName(tagName)
        // And I fill in the description
        .fillDescription(data[0].description)
        // And I save
        .save()
        // Then it is saved
        .should('be.true')

      // And I see the tag in the list of tags
      nav.goToTags()
        .getTagNames().contains(tagName)
    })
  })

  it('ESC54 - Create a tag with a name, a description and a color', () => {
    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // Make a request to Mockaroo API to get a generated profile
    cy.mockarooTag().then((response) => {
      expect(response.status).to.eq(200);    
      const data = response.body;

      // When I navigate to the tags page
      const createTag = nav.goToTags()
        // And I create a new tag
        .createNewTag();

      const tagName = data[0].name;

      createTag
        // And I fill in the name
        .fillName(tagName)
        // And I fill in the description
        .fillDescription(data[0].description)
        // And I fill in the color
        .fillColor(data[0].color.substring(1))
        // And I save
        .save()
        // Then it is saved
        .should('be.true')

      // And I see the tag in the list of tags
      nav.goToTags()
        .getTagNames().contains(tagName)
    })
  })
})
