const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const { faker } = require('@faker-js/faker');

require("./EditProfilePage");

const createPostPage = require("../pages/CreatePostPage");
const postsListPage = require("../pages/PostsListPage");
const loginPage = require("../pages/LoginPage");
const tagsListPage = require("../pages/TagsListPage");
const createTagPage = require("../pages/CreateTagPage");

//LOGIN
Given('I sign in with {kraken-string} and {kraken-string}', async function (email, password) {
  return await loginPage.login(this.driver, email, password);
});

//POSTS
Given('I select create new Post', async function () {
    let btnNewPost = await postsListPage.getBtnNewPost(this.driver);
    return await btnNewPost.click();
});

When('I put as title {kraken-string}', async function (title) {
    let titleArea = await createPostPage.getTitleArea(this.driver);
    return await titleArea.setValue(title);
});

When('I click on post settings', async function () {
    let settingsBtn = await createPostPage.getSettingsBtn(this.driver);
    return await settingsBtn.click();
});

When('I change the slug with {kraken-string}', async function (slug) {
    let urlArea = await createPostPage.getUrlArea(this.driver);
    return await urlArea.setValue(slug);
});

When('I write a random long excerpt', async function () {
  let excerptArea = await createPostPage.getExcerptArea(this.driver);
  let excerpt = faker.lorem.words(70);
  return await excerptArea.setValue(excerpt);
});

When('I click on close settings', async function () {
    let settingsBtn = await createPostPage.getSettingsCloseBtn(this.driver);
    return await settingsBtn.click();
});

When('I click on description area', async function () {
    let postArea = await createPostPage.getPostArea(this.driver);
    return await postArea.click();
});

When('I write a random description', async function () {
    let postArea = await createPostPage.getPostArea(this.driver);
    let description = faker.lorem.words(10);
    return await postArea.setValue(description);
});

When('I click on publish link', async function () {
    let publishLink = await createPostPage.getPublishLink(this.driver);
    return await publishLink.click();
});

When('I click on publish button', async function () {
    let publishBtn = await createPostPage.getPublishBtn(this.driver);
    return await publishBtn.click();
});

When('I select schedule it for later', async function () {
    let optSchedule = await createPostPage.getOptSchedule(this.driver);
    return await optSchedule.click();
});

When('I click on schedule button', async function () {
    let scheduleBtn = await createPostPage.getScheduleBtn(this.driver);
    return await scheduleBtn.click();
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
    let postListed = await postsListPage.getPost(this.driver, postTitle);
    let actualPostTitle = await postListed.getProperty("innerText");
    expect(actualPostTitle).to.equal(postTitle);
    return postListed.click();
});

Then('I could navigate to page with {kraken-string}', async function(url) {
    let completeURL = "http://localhost:2368/".concat(url);
    return await this.driver.url(completeURL);
});

Then('I see a excerpt error message', async function() {
  let message = await createTagPage.getErrorMessage(this.driver);
  expect(message).to.equal("Excerpt cannot be longer than 300 characters.");
});

//STAFF
let bio;
let website;
When("I click in author user to modify", async function () {
    let element = await this.driver.$$(global.EditProfilePage.staff.userToEdit)[1];
    return await element.click();
 });

When("I fill profile fullname with text {kraken-string}", async function (name) {
    let element = await this.driver.$(global.EditProfilePage.staff.inputName);
    return await element.setValue(name);
});

When("I save edit profile changes", async function () {
    let element = await this.driver.$(global.EditProfilePage.staff.saveBtn);
    return await element.click();
});
  
When("I fill profile location with text {kraken-string}", async function (name) {
    let element = await this.driver.$(global.EditProfilePage.staff.inputLocation);
    return await element.setValue(name);
});

When("I fill profile Website with random url", async function () {
    let element = await this.driver.$(global.EditProfilePage.staff.website);
    website = faker.internet.url();
    return await element.setValue(website);
});

When("I fill profile Website with {kraken-string}", async function (texto) {
  let element = await this.driver.$(global.EditProfilePage.staff.website);
  return await element.setValue(texto);
});

When("I fill profile facebook with random url", async function () {
    let element = await this.driver.$(global.EditProfilePage.staff.facebook);
    let new_facebook_url = faker.internet.url();
    return await element.setValue(new_facebook_url);
});

When("I fill profile twitter with random url", async function () {
    let element = await this.driver.$(global.EditProfilePage.staff.twitter);
    new_twitter_url = faker.internet.url();
    return await element.setValue(new_twitter_url);
});

When("I fill profile bio with random text", async function () {
    bio = faker.lorem.words(10);
    let element = await this.driver.$(global.EditProfilePage.staff.inputBio);
    return await element.setValue(bio);
});

When("I fill profile long bio with random text", async function () {
    let fullName = faker.lorem.words(80);
    let element = await this.driver.$(global.EditProfilePage.staff.inputBio);
    return await element.setValue(fullName);
});
  
Then("I should see user in list with fullname {kraken-string}",async function (name) {
    let elements = await this.driver.$$(global.EditProfilePage.staff.listedStaff);
    let encontro = false;
    for (const staff of elements){
      message = await staff.getProperty("innerText");
      if (message.trim() == name) {
          encontro = true;
          break;
      }
    }
    expect(encontro).to.equal(true);
});

Then("I should see user location in list with text {kraken-string}",async function (name) {
    let element = await this.driver.$(global.EditProfilePage.staff.inputLocation);
    const actualTitle = await element.getValue();
    expect(actualTitle).to.equal(name);
});

Then("I should see user Website with random url",async function () {
    let element = await this.driver.$(global.EditProfilePage.staff.website);
    const actualSite = await element.getValue();
    expect(actualSite).to.equal(website);
});

Then('I should see a facebook error message', async function() {
  let message = await createTagPage.getErrorMessage(this.driver);
  expect(message).to.equal("The URL must be in a format like https://www.facebook.com/yourPage");
});

Then('I should see a twitter error message', async function() {
  let message = await createTagPage.getErrorMessage(this.driver);
  expect(message).to.equal("Your Username is not a valid Twitter Username");
});

Then("I should see user bio with random text",async function () {
    let element = await this.driver.$(global.EditProfilePage.staff.inputBio);
    const actualBio = await element.getValue();
    expect(actualBio).to.equal(bio);
});

Then('I should see a website error message', async function() {
  let message = await createTagPage.getErrorMessage(this.driver);
  expect(message).to.equal("Website is not a valid url");
});

Then('I should see a long bio error message', async function() {
  let message = await createTagPage.getErrorMessage(this.driver);
  expect(message).to.equal("Bio is too long");
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

When('I fill in the name with random', async function () {
    tagName = faker.lorem.words(2);
    return await createTagPage.fillInName(this.driver,tagName);
});

When('I fill in the name with long random', async function () {
  tagName = faker.lorem.words(50);
  return await createTagPage.fillInName(this.driver,tagName);
});

When('I fill in the slug with random', async function () {
  let slug = faker.lorem.slug();
  return await createTagPage.fillInSlug(this.driver, slug);
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
  expect(message).to.equal("The color should be in valid hex format");
});

Then('I see a long name error message', async function() {
  let message = await createTagPage.getErrorMessage(this.driver);
  expect(message).to.equal("Tag names cannot be longer than 191 characters.");
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