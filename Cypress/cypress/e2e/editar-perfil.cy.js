import { faker } from '@faker-js/faker'
import PageFactory from '../pages/PageFactory';
import PageBase from '../pages/PageBase';

describe('Editar Perfil tests', () => {
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


  it('ESC14 - Edit Profile with full name', () => {
    faker.seed(1014);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)
    
    // When I navigate to the staff page
    const staffList = nav.goToStaff()

    // And select the first user
    staffList.getUsernames().first().invoke('text').then((username) => {
      const editProfile = staffList.editProfile(username);

      editProfile
        // And I fill in the full name
        .fillFullName(faker.name.fullName())
        // And I save
        .save()
        // Then it is saved
        .should('be.true')
    })
  })

  it('ESC15 - Edit Profile with Facebook Url', () => {
    faker.seed(1015);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the staff page
    const staffList = nav.goToStaff()

    // And select the first user
    staffList.getUsernames().first().invoke('text').then((username) => {
      const editProfile = staffList.editProfile(username);

      editProfile
        // And I fill in the Facebook url
        .fillFacebook('https://www.facebook.com/' + faker.name.fullName())
        // And I save
        .save()
        // Then it is saved
        .should('be.true')
    })  
  })

  it('ESC16 - Edit Profile with Location', () => {
    faker.seed(1016);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the staff page
    const staffList = nav.goToStaff()

    // And select the first user
    staffList.getUsernames().first().invoke('text').then((username) => {
      const editProfile = staffList.editProfile(username);

      editProfile
        // And I fill location with city
        .fillLocation(faker.address.city())
        // And I save
        .save()
        // Then it is saved
        .should('be.true')
    })
  })

  it('ESC17 - Edit Profile with Website', () => {
    faker.seed(1017);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the staff page
    const staffList = nav.goToStaff()

    // And select the first user
    staffList.getUsernames().first().invoke('text').then((username) => {
      const editProfile = staffList.editProfile(username);

      editProfile
        // And I fill in website
        .fillWebsite(faker.internet.url())
        // And I save
        .save()
        // Then it is saved
        .should('be.true')
    })
  })
  
  it('ESC18 - Edit Profile with Twitter Url', () => {
    faker.seed(1018);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the staff page
    const staffList = nav.goToStaff()

    // And select the first user
    staffList.getUsernames().first().invoke('text').then((username) => {
      const editProfile = staffList.editProfile(username);

      editProfile
        // And I fill in the twitter
        .fillTwitter('https://www.twitter.com/' + faker.name.firstName())
        // And I save
        .save()
        // Then it is saved
        .should('be.true')
    })
  })

  it('ESC19 - Edit Profile with a short biography', () => {
    faker.seed(1019);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the staff page
    const staffList = nav.goToStaff()

    // And select the first user
    staffList.getUsernames().first().invoke('text').then((username) => {
      const editProfile = staffList.editProfile(username);

      editProfile
        // And I fill in the biography
        .fillBio(faker.lorem.lines(1))
        // And I save
        .save()
        // Then it is saved
        .should('be.true')
    })
  })

  it('ESC20 - Edit Profile with a very long biography', () => {
    faker.seed(1020);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the staff page
    const staffList = nav.goToStaff()

    // And select the first user
    staffList.getUsernames().first().invoke('text').then((username) => {
      const editProfile = staffList.editProfile(username);

      editProfile
        // And I fill in the biography
        .fillBio(faker.lorem.lines(15))
        // And I save
        .save()
        // Then it is not saved
        .should('be.false')
    })
  })

  it('ESC21 - Save a Profile without making changes', () => {
    faker.seed(1021);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    // When I navigate to the staff page
    const staffList = nav.goToStaff()

    // And select the first user
    staffList.getUsernames().first().invoke('text').then((username) => {
      const editProfile = staffList.editProfile(username);

      editProfile
        // And I save
        .save()
        // Then it is saved
        .should('be.true')
    })
  })
})
