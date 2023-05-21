async function getTitleArea(driver) {
	return await driver.$('textarea.gh-editor-title');
}

async function getPostArea(driver) {
	return await driver.$('.koenig-editor__editor.__mobiledoc-editor.__has-no-content');
}

async function getPostsLink(driver) {
	return await driver.$('*=Posts');
}

async function getSettingsBtn(driver){
	return await driver.$('button[title="Settings"]');
}

async function getDateArea(driver){
	return await driver.$('input[placeholder="YYYY-MM-DD"]');
}

async function getDateError(driver){
	let messageField = await driver.$('.gh-date-time-picker-error');
	return await messageField.getProperty("innerText");
}

async function getPublishLink(driver){
	return await driver.$('.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-outline.gh-publishmenu-trigger');
}

async function getOptSchedule(driver){
	return await driver.$('/html/body/div[1]/div/div/section/div/div[2]/div[1]');
}

async function getExcerptArea(driver){
	return await driver.$('#custom-excerpt');
}

async function getScheduleBtn(driver){
	return await driver.$('button=Schedule');
}

module.exports = {getTitleArea, getPostArea, getPostsLink, getSettingsBtn, getDateArea, 
	getDateError, getOptSchedule, getPublishLink, getExcerptArea, getScheduleBtn};
