
async function fillInName(driver, name){
    let nameField = await driver.$('input[name="name"]');
	return await nameField.setValue(name);
}

async function fillInColor(driver, color){
    let nameField = await driver.$('input[name="accent-color"]');
	return await nameField.setValue(color);
}

async function fillInShortDescription(driver, name){
    let nameField = await driver.$('#tag-description');
	return await nameField.setValue(name);
}

async function save(driver){
    let button = await driver.$('button=Save');
    button.click();
    return button;
}

async function getSlug(driver){
    return await driver.$('input[name="slug"]');
}

async function getErrorMessage(driver) {
    let messages = await driver.$$('.response');
    let message;
    for (const element of messages){
        message = await element.getProperty("innerText");
        if (message.trim() != "") {
            return message;
        }
    }
    return "";
}

async function leave(driver){
    let buttonLeave = await driver.$('button=Leave');
    return buttonLeave.click();
}

async function leaveStaff(driver){
    let buttonLeave = await driver.$('.gh-btn-red');
    return buttonLeave.click();
}

module.exports = {fillInName, fillInColor, fillInShortDescription,
    leaveStaff, save, getSlug, getErrorMessage, leave};