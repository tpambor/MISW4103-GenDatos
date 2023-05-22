import { faker } from '@faker-js/faker'
import PageFactory from '../pages/PageFactory';
import PageBase from '../pages/PageBase';

describe('Create post tests', () => {
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

  it('ESC55 - Create a draft post with title  pseudoaleatorio', () => {
    faker.seed(1001);

    const nav = pageFactory.navigation()

    // Given that I am a authenticated user visiting Ghost
    cy.authenticate(pageFactory)

    cy.mokarooPost().then((response) => {
      expect(response.status).to.eq(200);    
      const data = response.body;
      const postTitle = data[0].Title;
      const postContent= data[0].Content;
        // When I navigate to the posts page
        const createPost = nav.goToPosts()
          // And I create a new post
          .createNewPost();

        createPost
          // And I fill in the title
          .fillTitle(postTitle)
          // And click on the editor but don't enter text
          .fillContent("")
          // And I go back to the list of posts
          .goToPosts()
          // Then I see the post in the list of draft posts
          .filterDraftPosts().getPostNames().contains(postTitle)
      })
  })


  it('ESC56 - Create a draft post with title  and content pseudoaleatorio', () => {
      faker.seed(1001);
  
      const nav = pageFactory.navigation()
  
      // Given that I am a authenticated user visiting Ghost
      cy.authenticate(pageFactory)
  
      cy.mokarooPost().then((response) => {
        expect(response.status).to.eq(200);    
        const data = response.body;
        const postTitle = data[0].Title;
        const postContent= data[0].Content;
          // When I navigate to the posts page
          const createPost = nav.goToPosts()
            // And I create a new post
            .createNewPost();
  
          createPost
            // And I fill in the title
            .fillTitle(postTitle)
            // And click on the editor but don't enter text
            .fillContent(postContent)
            // And I go back to the list of posts
            .goToPosts()
            // Then I see the post in the list of draft posts
            .filterDraftPosts().getPostNames().contains(postTitle)
        })
  })

})
