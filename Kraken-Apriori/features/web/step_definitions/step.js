const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const { faker } = require('@faker-js/faker');

require("./EditProfilePage");

const createPostPage = require("../pages/CreatePostPage");
const postsListPage = require("../pages/PostsListPage");
const loginPage = require("../pages/LoginPage");
const tagsListPage = require("../pages/TagsListPage");
const createTagPage = require("../pages/CreateTagPage");
const general = require("../pages/General");

//LOGIN
Given('I sign in with {kraken-string} and {kraken-string}', async function (email, password) {
  return await loginPage.login(this.driver, email, password);
});

//GENERAL - ERROR MESSAGES
Then('I see the message {string}', async function(errorMessage) {
  let message = await general.getErrorMessage(this.driver);
  expect(message).to.equal(errorMessage);
});

//POSTS
Given('I select create new Post', async function () {
    let btnNewPost = await postsListPage.getBtnNewPost(this.driver);
    return await btnNewPost.click();
});

When('I put as title {string}', async function (title) {
    let titleArea = await createPostPage.getTitleArea(this.driver);
    return await titleArea.setValue(title);
});

When('I put as description {string}', async function (description) {
  let postArea = await createPostPage.getPostArea(this.driver);
  return await postArea.setValue(description);
});

When('I click on post settings', async function () {
    let settingsBtn = await createPostPage.getSettingsBtn(this.driver);
    return await settingsBtn.click();
});

When('I change the date with {string}', async function (date) {
  let urlArea = await createPostPage.getDateArea(this.driver);
  return await urlArea.setValue(date);
});

When('I click on excerpt area', async function () {
  let excerptArea = await createPostPage.getExcerptArea(this.driver);
  return await excerptArea.click();
});

When('I click on publish link', async function () {
    let publishLink = await createPostPage.getPublishLink(this.driver);
    return await publishLink.click();
});

When('I select schedule it for later', async function () {
    let optSchedule = await createPostPage.getOptSchedule(this.driver);
    return await optSchedule.click();
});

When('I click on schedule', async function () {
    let scheduleBtn = await createPostPage.getScheduleBtn(this.driver);
    return await scheduleBtn.click();
});

When('I click on posts links', async function () {
    let postsLink = await createPostPage.getPostsLink(this.driver);
    return await postsLink.click();
});

Then('I see the date message {string}', async function(errorMessage) {
  let message = await createPostPage.getDateError(this.driver);
  expect(message).to.equal(errorMessage);
}); 

//STAFF
When("I click in author user to modify", async function () {
    let element = await this.driver.$$(global.EditProfilePage.staff.userToEdit)[1];
    return await element.click();
 });

When("I fill name with {string}", async function (name) {
    let element = await this.driver.$(global.EditProfilePage.staff.inputName);
    return await element.setValue(name);
});

When("I save edit profile changes", async function () {
    let element = await this.driver.$(global.EditProfilePage.staff.saveBtn);
    return await element.click();
});

When("I fill email with {string}", async function (email) {
  let element = await this.driver.$(global.EditProfilePage.staff.email);
  return await element.setValue(email);
});

When("I fill website with {string}", async function (website) {
  let element = await this.driver.$(global.EditProfilePage.staff.website);
  await element.setValue(website);
  let otroElement = await this.driver.$(global.EditProfilePage.staff.twitter);
  return await otroElement.click();
});

When("I fill facebook with {string}", async function (facebook_url) {
  let element = await this.driver.$(global.EditProfilePage.staff.facebook);
  return await element.setValue(facebook_url);
});

When("I fill location with {string}", async function (location) {
    let element = await this.driver.$(global.EditProfilePage.staff.inputLocation);
    return await element.setValue(location);
});
  
// TAGS
When('I create a new tag', async function () {
    return await tagsListPage.createNewTag(this.driver);
});

When('I fill in the name with {string}', async function (tagName) {
    return await createTagPage.fillInName(this.driver,tagName);
});

When('I fill in the slug with {string}', async function (slug) {
  return await createTagPage.fillInSlug(this.driver, slug);
});

When('I fill in the color with {string}', async function (color) {
  return await createTagPage.fillInColor(this.driver, color);
});

When('I fill in the description with {string}', async function (texto) {
  return await createTagPage.fillInDescription(this.driver,texto);
});

When('I save', async function () {
    return await createTagPage.save(this.driver);
});
