async function getBtnNewPost(driver) {
	return await driver.$('=New post');
}

async function getPost(driver, postTitle) {
	return await driver.$('h3='.concat(postTitle));
}

module.exports = {getBtnNewPost, getPost};
