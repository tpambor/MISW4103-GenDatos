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

module.exports = {getErrorMessage};