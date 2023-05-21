async function createNewTag(driver) {
	let btnNewTag = await driver.$('a[href="#/tags/new/"]');
    return btnNewTag.click();
}

module.exports = {createNewTag};