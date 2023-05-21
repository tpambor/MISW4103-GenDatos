
async function fillInName(driver, name){
    let nameField = await driver.$('input[name="name"]');
	return await nameField.setValue(name);
}

async function fillInSlug(driver, slug){
    let nameField = await driver.$('#tag-slug');
	return await nameField.setValue(slug);
}

async function fillInColor(driver, color){
    let nameField = await driver.$('input[name="accent-color"]');
	return await nameField.setValue(color);
}

async function fillInDescription(driver, texto){
    let nameField = await driver.$('#tag-description');
	return await nameField.setValue(texto);
}

async function save(driver){
    let button = await driver.$('button=Save');
    button.click();
    return button;
}

module.exports = {fillInName, fillInSlug, fillInColor, fillInDescription, save};