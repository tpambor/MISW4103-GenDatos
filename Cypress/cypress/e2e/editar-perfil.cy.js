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

it('ESC22 - Edit Profile  with full name  texto normal seudoAleatorio', () => {
   // Given that I am a authenticated user visiting Ghost
  cy.authenticate(pageFactory);
    // Realizar una solicitud a la API de Mockaroo para obtener datos generados
    cy.mokaroo().then((response) => {
      expect(response.status).to.eq(200);    
      const data = response.body;
      const fullName = data[0].Full_Name;
      // Navegar a la página de personal
      const staffList = pageFactory.navigation().goToStaff();

      staffList.getUsernames().first().invoke('text').then((existingUsername) => {      
      const editProfile = staffList.editProfile(existingUsername);

      editProfile.fillFullName(fullName);

      editProfile
        // And I fill in the full name
        .fillFullName(faker.name.fullName())
        // And I save
        .save()
        // Then it is saved
        .should('be.true')
        });
    })
})

it('ESC23 - Edit Profile  with full name  texto in blank seudoAleatorio', () => {
  // Given that I am a authenticated user visiting Ghost
 cy.authenticate(pageFactory);
   // Realizar una solicitud a la API de Mockaroo para obtener datos generados
   cy.mokaroo().then((response) => {
     expect(response.status).to.eq(200);    
     const data = response.body;

     // Navegar a la página de personal
     const staffList = pageFactory.navigation().goToStaff();

     staffList.getUsernames().first().invoke('text').then((existingUsername) => {      
     const editProfile = staffList.editProfile(existingUsername);

     editProfile.fillFullNameEmpty();

     editProfile.save().then(() => {
          cy.get('.form-group.error p.response').should('contain', 'Please enter a name.');
         });
       });
   })
})


it('ESC24 - Edit Profile with enter password and verify password null pseudo-aleatorio', () => {
   // Given that I am a authenticated user visiting Ghost
  cy.authenticate(pageFactory);
    // Realizar una solicitud a la API de Mockaroo para obtener datos generados
    cy.mokaroo().then((response) => {
      expect(response.status).to.eq(200);    
      const data = response.body;
      const password = data[0].New_Password;
     
       // When I navigate to the staff page
      const staffList = pageFactory.navigation().goToStaff();

       // And select the first user
      staffList.getUsernames().first().invoke('text').then((existingUsername) => {      
      const editProfile = staffList.editProfile(existingUsername);

      editProfile.fillPassword(password);

      editProfile.changePassword().then(() => {
             cy.get('.form-group.error p.response').should('contain', 'Your new passwords do not match');
          });
        });
    })
})

it('ESC25 - Edit Profile new passwords dont not match pseudo-aleatorio', () => {
  // Given that I am a authenticated user visiting Ghost
  cy.authenticate(pageFactory);
    
  // Realizar una solicitud a la API de Mockaroo para obtener datos generados
    cy.mokaroo().then((response) => {
      expect(response.status).to.eq(200);    
      const data = response.body;

      const password = data[0].New_Password;
      const passwordConfirm = data[0].Verify_Password;
      
       // When I navigate to the staff page
      const staffList = pageFactory.navigation().goToStaff();

      // And select the first user
      staffList.getUsernames().first().invoke('text').then((existingUsername) => {      
      const editProfile = staffList.editProfile(existingUsername);

      editProfile.fillOldPassword(Cypress.env('password'));
      editProfile.fillPassword(password);
      editProfile.fillConfirmPassword(passwordConfirm);
      editProfile.changePassword().then(() => {

          // Verify password must be at least 10 characters long
              cy.get('.form-group.error p.response').should('contain', 'Your new passwords do not match');
            });

      })
    })
  })

it('ESC26 - Edit Profile new passwords match seudoAleatorio', () => {
   // Given that I am a authenticated user visiting Ghost
  cy.authenticate(pageFactory);
    // Realizar una solicitud a la API de Mockaroo para obtener datos generados
    cy.mokaroo().then((response) => {
      expect(response.status).to.eq(200);    
      const data = response.body;
      const password = data[0].New_Password;
      const passwordConfirm = data[0].Verify_Password;
      
      // When I navigate to the staff page
      const staffList = pageFactory.navigation().goToStaff();

       // And select the first user
      staffList.getUsernames().first().invoke('text').then((existingUsername) => {      
      const editProfile = staffList.editProfile(existingUsername);

      editProfile.fillPassword(password);
      editProfile.fillConfirmPassword(password);

      editProfile.changePassword().then(() => {
            cy.get('.form-group.error p.response').should('contain', 'Your current password is required to set a new one');
          });

  
       
      })
    })
  })

it('ESC27 - Edit Profile current password required seudoAleatorio', () => {
  // Given that I am a authenticated user visiting Ghost
 cy.authenticate(pageFactory);
   // Realizar una solicitud a la API de Mockaroo para obtener datos generados
   cy.mokaroo().then((response) => {
     expect(response.status).to.eq(200);    
     const data = response.body;
     const password = data[0].New_Password;
     const passwordConfirm = data[0].Verify_Password;
     
     // When I navigate to the staff page
     const staffList = pageFactory.navigation().goToStaff();

      // And select the first user
     staffList.getUsernames().first().invoke('text').then((existingUsername) => {      
     const editProfile = staffList.editProfile(existingUsername);

     editProfile.fillPassword(password);
     editProfile.fillConfirmPassword(password);

     editProfile.changePassword().then(() => {
           cy.get('.form-group.error p.response').eq(0).should('contain', 'Your current password is required to set a new one');
         });

     })
   })
 })

it('ESC28 - Edit Profile with password empty pseudo-aleatorio', () => {
  // Given that I am a authenticated user visiting Ghost
 cy.authenticate(pageFactory);
   // Realizar una solicitud a la API de Mockaroo para obtener datos generados
   cy.mokaroo().then((response) => {
     expect(response.status).to.eq(200);    
     const data = response.body;
     const password = data[0].New_Password;
    
      // When I navigate to the staff page
     const staffList = pageFactory.navigation().goToStaff();

      // And select the first user
     staffList.getUsernames().first().invoke('text').then((existingUsername) => {      
     const editProfile = staffList.editProfile(existingUsername);
     editProfile.fillOldPassword(Cypress.env('password'));
     editProfile.fillConfirmPassword(password);

     editProfile.changePassword().then(() => {
         
         });
       });
   })
})


it('ESC29 - Edit Profile with current password empty pseudo-aleatorio', () => {
  // Given that I am a authenticated user visiting Ghost
 cy.authenticate(pageFactory);
   // Realizar una solicitud a la API de Mockaroo para obtener datos generados
   cy.mokaroo().then((response) => {
     expect(response.status).to.eq(200);    
     const data = response.body;
     const password = data[0].New_Password;
    
      // When I navigate to the staff page
     const staffList = pageFactory.navigation().goToStaff();

      // And select the first user
     staffList.getUsernames().first().invoke('text').then((existingUsername) => {      
     const editProfile = staffList.editProfile(existingUsername);
     editProfile.fillPassword(password);
     editProfile.fillConfirmPassword(password);

     editProfile.changePassword().then(() => {
      cy.get('.form-group.error p.response').eq(0).should('contain', 'Your current password is required to set a new one');
      });
       });
   })
})

it('ESC30 - Edit Profile location normal text seudoAleatorio', () => {
    // Given that I am a authenticated user visiting Ghost
   cy.authenticate(pageFactory);
     // Realizar una solicitud a la API de Mockaroo para obtener datos generados
     cy.mokaroo().then((response) => {
       expect(response.status).to.eq(200);    
       const data = response.body;
       const Location = data[0].Location;
       
       // When I navigate to the staff page
       const staffList = pageFactory.navigation().goToStaff();
 
        // And select the first user
       staffList.getUsernames().first().invoke('text').then((existingUsername) => {      
       const editProfile = staffList.editProfile(existingUsername);
 
       editProfile.fillLocation(Location);
       editProfile.save().then(() => {
 
         editProfile
         // And I save
         .save()
         // Then it is saved
         .should('be.true')
 
        
         });
       })
     })
   })



it('ESC30 - Edit Profile location empty text seudoAleatorio', () => {
  // Given that I am a authenticated user visiting Ghost
 cy.authenticate(pageFactory);
   // Realizar una solicitud a la API de Mockaroo para obtener datos generados
   cy.mokaroo().then((response) => {
     expect(response.status).to.eq(200);    
     const data = response.body;
     
     // When I navigate to the staff page
     const staffList = pageFactory.navigation().goToStaff();

      // And select the first user
     staffList.getUsernames().first().invoke('text').then((existingUsername) => {      
     const editProfile = staffList.editProfile(existingUsername);

     editProfile.fillLocationEmpty();
     editProfile.save().then(() => {

       editProfile
       // And I save
       .save()
       // Then it is saved
       .should('be.true')

      
       });
     })
   })
 })

it('ESC31 - Edit Profile Website pseudo-aleatorio', () => {
    // Given that I am a authenticated user visiting Ghost
   cy.authenticate(pageFactory);
     // Realizar una solicitud a la API de Mockaroo para obtener datos generados
     cy.mokaroo().then((response) => {
       expect(response.status).to.eq(200);    
       const data = response.body;
       const Website = data[0].Website;
       
       // When I navigate to the staff page
       const staffList = pageFactory.navigation().goToStaff();
 
        // And select the first user
       staffList.getUsernames().first().invoke('text').then((existingUsername) => {      
       const editProfile = staffList.editProfile(existingUsername);
 
       editProfile.fillWebsite(Website);
 
         editProfile
         // And I save
         .save()
         // Then it is saved
         .should('be.true')
 
        
       })
     })
   })
   
it('ESC32 - Edit Profile Website Caracteres especiales  pseudo-aleatorio', () => {
    // Given that I am a authenticated user visiting Ghost
   cy.authenticate(pageFactory);
     // Realizar una solicitud a la API de Mockaroo para obtener datos generados
     cy.mokaroo().then((response) => {
       expect(response.status).to.eq(200);    
       const data = response.body;
       const Website = data[0].Website;
       
       // When I navigate to the staff page
       const staffList = pageFactory.navigation().goToStaff();
 
        // And select the first user
       staffList.getUsernames().first().invoke('text').then((existingUsername) => {      
       const editProfile = staffList.editProfile(existingUsername);
 
       editProfile.fillWebsite(Website);
 
         editProfile
         // And I save
         .save()
         // Then it is saved
         .should('be.true')
 
        
       })
     })
   })

   
it('ESC33 - Edit Profile Facebook pseudo-aleatorio', () => {
  // Given that I am a authenticated user visiting Ghost
 cy.authenticate(pageFactory);
   // Realizar una solicitud a la API de Mockaroo para obtener datos generados
   cy.mokaroo().then((response) => {
     expect(response.status).to.eq(200);    
     const data = response.body;
     const Facebook_Profile = data[0].Facebook_Profile;
     
     // When I navigate to the staff page
     const staffList = pageFactory.navigation().goToStaff();

      // And select the first user
     staffList.getUsernames().first().invoke('text').then((existingUsername) => {      
     const editProfile = staffList.editProfile(existingUsername);

     editProfile.Facebook_Profile(Facebook_Profile);

       editProfile
       // And I save
       .save()
       // Then it is saved
       .should('be.true')

      
     })
   })
 })

it('ESC34 - Edit Profile Twitter_Profile pseudo-aleatorio', () => {
  // Given that I am a authenticated user visiting Ghost
 cy.authenticate(pageFactory);
   // Realizar una solicitud a la API de Mockaroo para obtener datos generados
   cy.mokaroo().then((response) => {
     expect(response.status).to.eq(200);    
     const data = response.body;
     const Twitter_Profile = data[0].Twitter_Profile;
     
     // When I navigate to the staff page
     const staffList = pageFactory.navigation().goToStaff();

      // And select the first user
     staffList.getUsernames().first().invoke('text').then((existingUsername) => {      
     const editProfile = staffList.editProfile(existingUsername);

     editProfile.Twitter_Profile(Twitter_Profile);

       editProfile
       // And I save
       .save()
       // Then it is saved
       .should('be.true')

      
     })
   })
 })

 it('ESC35 - Edit Profile Bio pseudo-aleatorio', () => {
  // Given that I am a authenticated user visiting Ghost
 cy.authenticate(pageFactory);
   // Realizar una solicitud a la API de Mockaroo para obtener datos generados
   cy.mokaroo().then((response) => {
     expect(response.status).to.eq(200);    
     const data = response.body;
     const Bio = data[0].Bio;
     
     // When I navigate to the staff page
     const staffList = pageFactory.navigation().goToStaff();

      // And select the first user
     staffList.getUsernames().first().invoke('text').then((existingUsername) => {      
     const editProfile = staffList.editProfile(existingUsername);

     editProfile.Bio(Bio);

       editProfile
       // And I save
       .save()
       // Then it is saved
       .should('be.true')


     })
   })
 })
})
