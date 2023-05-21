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

it('Generar datos de prueba', () => {
  cy.request('http://my.api.mockaroo.com/ghost_data.json?key=ea7bb5c0').then((response) => {
    expect(response.status).to.eq(200);
    const data = response.body;
    // Realiza las operaciones necesarias con los datos generados
    // ...
    expect(data.length).to.be.greaterThan(0);
  });
});

it('ESC22 - Edit Profile with full name and validation fiel ', () => {
  cy.authenticate(pageFactory);

    // Realizar una solicitud a la API de Mockaroo para obtener datos generados
    cy.request('http://my.api.mockaroo.com/ghost_data.json?key=ea7bb5c0').then((response) => {
    expect(response.status).to.eq(200);    
    const data = response.body;
    const fullName = data[0].Full_Name;
    // Navegar a la página de personal
    const staffList = pageFactory.navigation().goToStaff();

    staffList.getUsernames().first().invoke('text').then((existingUsername) => {      
    const editProfile = staffList.editProfile(existingUsername);

    editProfile.fillFullName(fullName);

    editProfile.save().then(() => {
      // Verify that the full name meets the maximum length requirement
      const maxLength = 50; // Maximum length requirement for the full name
          cy.get('input#user-name').invoke('val').then((value) => {
            expect(value.length).to.be.at.most(maxLength);
          });

        });
      });
    })
})
})
