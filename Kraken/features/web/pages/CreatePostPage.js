async function getTitleArea(driver) {
	return await driver.$('textarea.gh-editor-title');
}

async function getPostArea(driver) {
	return await driver.$('.koenig-editor__editor.__mobiledoc-editor.__has-no-content');
}

async function getPostsLink(driver) {
	return await driver.$('*=Posts');
}

async function getPublishLink(driver){
	return await driver.$('.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-outline.gh-publishmenu-trigger');
}

async function getPublishBtn(driver){
	return await driver.$('button=Publish');
}

async function getSettingsBtn(driver){
	return await driver.$('button[title="Settings"]');
}

async function getOptSchedule(driver){
	return await driver.$('/html/body/div[1]/div/div/section/div/div[2]/div[1]');
}

async function getScheduleBtn(driver){
	return await driver.$('button=Schedule');
}

async function getSettingsCloseBtn(driver){
	return await driver.$('button=Close');
}

async function getUrlArea(driver){
	return await driver.$('input[name="post-setting-slug"]');
}

async function getExcerptArea(driver){
	return await driver.$('#custom-excerpt');
}

module.exports = {getTitleArea, getPostArea, getPostsLink, getPublishLink, getPublishBtn, 
	getSettingsBtn, getUrlArea, getOptSchedule, getScheduleBtn, getSettingsCloseBtn, getExcerptArea};
