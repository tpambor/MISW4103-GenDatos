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

async function getHelpPageURL(driver){
	return await driver.$$('.ember-text-field.gh-input.ember-view')[7];
}

async function getSaveDesignBtn(driver){
	return await driver.$('button=Save');
}

module.exports = {getErrorMessage, getHelpPageURL, getSaveDesignBtn};