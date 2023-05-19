const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const { faker } = require('@faker-js/faker');

require("./EditProfilePage");

const createPostPage = require("../pages/CreatePostPage");
const postsListPage = require("../pages/PostsListPage");
const loginPage = require("../pages/LoginPage");
const tagsListPage = require("../pages/TagsListPage");
const createTagPage = require("../pages/CreateTagPage");

//POSTS
Given('I sign in with {kraken-string} and {kraken-string}', async function (email, password) {
  return await loginPage.login(this.driver, email, password);
});

Given('I see the posts of tag {string}', async function (tag) {
    let postLink = await createPostPage.getPostsLink(this.driver,tag);
    return await postLink.click();
});

When('I select create new Post', async function () {
    let btnNewPost = await postsListPage.getBtnNewPost(this.driver);
    return await btnNewPost.click();
});

When('I put as title {kraken-string}', async function (title) {
    let titleArea = await createPostPage.getTitleArea(this.driver);
    return await titleArea.setValue("Post ".concat(title));
});

When('I click on post settings', async function () {
    let settingsBtn = await createPostPage.getSettingsBtn(this.driver);
    return await settingsBtn.click();
});

When('I change the slug with {kraken-string}', async function (slug) {
    let urlArea = await createPostPage.getUrlArea(this.driver);
    return await urlArea.setValue(slug);
});

When('I select the tag {string}', async function (tag) {
    return await createPostPage.selectTag(this.driver,tag);
});

When('I click on close settings', async function () {
    let settingsBtn = await createPostPage.getSettingsCloseBtn(this.driver);
    return await settingsBtn.click();
});

When('I click on description area', async function () {
    let postArea = await createPostPage.getPostArea(this.driver);
    return await postArea.click();
});

When('I write a description', async function () {
    let postArea = await createPostPage.getPostArea(this.driver);
    return await postArea.setValue("Post Description");
});

When('I click on publish link', async function () {
    let publishLink = await createPostPage.getPublishLink(this.driver);
    return await publishLink.click();
});

When('I click on publish button', async function () {
    let publishBtnFirst = await createPostPage.getPublishBtn(this.driver);
    await publishBtnFirst.click();
    let publishBtnSecond = await createPostPage.getPublishBtn(this.driver);
    return await publishBtnSecond.click();
});

When('I select schedule it for later', async function () {
    let optSchedule = await createPostPage.getOptSchedule(this.driver);
    return await optSchedule.click();
});

When('I click on schedule button', async function () {
    let scheduleBtnFirst = await createPostPage.getScheduleBtn(this.driver);
    await scheduleBtnFirst.click();
    let scheduleBtnSecond = await createPostPage.getScheduleBtn(this.driver);
    return await scheduleBtnSecond.click();
});

When('I click on posts link', async function () {
    let postsLink = await createPostPage.getPostsLink(this.driver);
    return await postsLink.click();
});

Then('I filter by Published posts', async function () {
    let filter = await postsListPage.getAllPostFilter(this.driver);
    await filter.click();
    let selection = await postsListPage.selectPublished(this.driver);
    return await selection.click();
});

Then('I filter by Scheduled posts', async function () {
    let filter = await postsListPage.getAllPostFilter(this.driver);
    await filter.click();
    let selection = await postsListPage.selectScheduled(this.driver);
    return await selection.click();
});

Then('I see the post {kraken-string} in the list', async function(postTitle) {
    let postTitleComplete = "Post ".concat(postTitle);
    let postListed = await postsListPage.getPost(this.driver, postTitleComplete);
    let actualPostTitle = await postListed.getProperty("innerText");
    expect(actualPostTitle).to.equal(postTitleComplete);
    return postListed.click();
});

Then('I could navigate to page with {kraken-string}', async function(url) {
    let completeURL = "http://localhost:2368/".concat(url);
    return await this.driver.url(completeURL);
});

//STAFF
let fullName;
let bio;
When("I click in Staff", async function () {
    let element = await this.driver.$(global.EditProfilePage.staff.linkSideMenu);
    return await element.click();
  });
  
  When("I click in author user to modify", async function () {
    let element = await this.driver.$$(global.EditProfilePage.staff.userToEdit)[1];
    return await element.click();
  });

  When("I fill profile fullname with text {string}", async function (name) {
    console.log("Filling staff fullname with text: " + name);
    let element = await this.driver.$(global.EditProfilePage.staff.inputName);
    return await element.setValue(name);
  });

  When("I save edit profile changes", async function () {
    let element = await this.driver.$(global.EditProfilePage.staff.saveBtn);
    return await element.click();
  });
  
  When("I fill profile location with text {string}", async function (name) {
    console.log("lcation with text: " + name);
    let element = await this.driver.$(global.EditProfilePage.staff.inputLocation);
    return await element.setValue(name);
  });

  When("I fill profile Website with text {string}", async function (name) {
    console.log("Website with text: " + name);
    let element = await this.driver.$(global.EditProfilePage.staff.website);
    return await element.setValue(name);
  });

  When("I fill profile facebook with text {string}", async function (name) {
    console.log("facebook with text: " + name);
    let element = await this.driver.$(global.EditProfilePage.staff.facebook);
    return await element.setValue(name);
  });

  When("I fill profile twitter with text {string}", async function (name) {
    console.log("twitter with text: " + name);
    let element = await this.driver.$(global.EditProfilePage.staff.twitter);
    return await element.setValue(name);
  });

  When("I fill profile bio with text {string}", async function (name) {
    console.log("bio with text: " + name);
    let element = await this.driver.$(global.EditProfilePage.staff.inputBio);
    return await element.setValue(name);
  });

  When("I see the actual bio", async function () {
    let element = await this.driver.$(global.EditProfilePage.staff.inputBio);
    bio = await element.getValue();
  });

  When("I fill profile long bio with text", async function () {
    fullName = faker.lorem.words(100);
    let element = await this.driver.$(global.EditProfilePage.staff.inputBio);
    return await element.setValue(fullName);
  });
  
  Then("I should see user full name in list with text {string}",async function (name) {
        let element = await this.driver.$(global.EditProfilePage.staff.inputName);
        const actualTitle = await element.getValue();
        expect(actualTitle).to.equal(name);
    }
  );

  Then("I should see user location in list with text {string}",async function (name) {
    let element = await this.driver.$(global.EditProfilePage.staff.inputLocation);
    const actualTitle = await element.getValue();
    expect(actualTitle).to.equal(name);
  });

  Then("I should see user Website in list with text {string}",async function (name) {
    let element = await this.driver.$(global.EditProfilePage.staff.website);
    const actualTitle = await element.getValue();
    expect(actualTitle).to.equal(name);
  });

  Then("I should see user facebook in list with text {string}",async function (name) {
    let element = await this.driver.$(global.EditProfilePage.staff.facebook);
    const actualTitle = await element.getValue();
    expect(actualTitle).to.equal(name);
  });

  Then("I should see user twitter in list with text {string}",async function (name) {
    let element = await this.driver.$(global.EditProfilePage.staff.twitter);
    const actualTitle = await element.getValue();
    expect(actualTitle).to.equal(name);
  });

  Then("I should see user bio in list with text {string}",async function (name) {
    let element = await this.driver.$(global.EditProfilePage.staff.inputBio);
    const actualTitle = await element.getValue();
    expect(actualTitle).to.equal(name);
  });

  Then("I should see the old user bio",async function () {
    let element = await this.driver.$(global.EditProfilePage.staff.inputBio);
    const actualTitle = await element.getValue();
    expect(actualTitle).to.equal(bio);
  });

  Then('I confirm leave page profile', async function() {
    let element = await this.driver.$(global.EditProfilePage.staff.leaveBtn);
    return await element.click();
  });

  
// TAGS
let tagName;
let tagsNumber;

When('I count the number of tags', async function () {
  tagsNumber = await tagsListPage.getNumberOfTags(this.driver);
});

When('I create a new tag', async function () {
    return await tagsListPage.createNewTag(this.driver);
});

When('I fill in the name', async function () {
    tagName = faker.lorem.words(2);
    return await createTagPage.fillInName(this.driver,tagName);
});

When('I fill in the color', async function () {
  let color = "006600";  //faker.color.rgb({ prefix: '' })
  return await createTagPage.fillInColor(this.driver, color);
});

When('I fill in the color with a word', async function () {
  let color = faker.lorem.words(1);
  return await createTagPage.fillInColor(this.driver, color);
});

When('I fill in the short description', async function () {
  tagName = faker.lorem.words(10);
  return await createTagPage.fillInShortDescription(this.driver,tagName);
});

When('I fill in the long description', async function () {
  tagName = faker.lorem.words(100);
  return await createTagPage.fillInShortDescription(this.driver,tagName);
});

When('I save', async function () {
    return await createTagPage.save(this.driver);
});

Then('I see the tag in the list of tags', async function() {
    let tagListed = await tagsListPage.getTag(this.driver,tagName);
    return tagListed.click();
});

Then('I see a name error message', async function() {
  let message = await createTagPage.getErrorMessage(this.driver);
  expect(message).to.equal("You must specify a name for the tag.");
});

Then('I see a color error message', async function() {
  let message = await createTagPage.getErrorMessage(this.driver);
  expect(message).to.equal("The colour should be in valid hex format");
});

Then('I confirm leave page', async function() {
  return await createTagPage.leave(this.driver);
});

Then('I see the same number of tags as before', async function () {
  let actualTags = await tagsListPage.getNumberOfTags(this.driver);
  expect(actualTags).to.equal(tagsNumber);
});

Then('I see a long error message', async function() {
  let message = await createTagPage.getErrorMessage(this.driver);
  expect(message).to.equal("Description cannot be longer than 500 characters.");
});