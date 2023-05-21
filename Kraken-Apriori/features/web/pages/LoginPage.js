async function login(driver, email, password) {
    let fldEmail = await driver.$('input[name="identification"]');
    await fldEmail.setValue(email);
	let fldPwd = await driver.$('input[name="password"]');
    await fldPwd.setValue(password);
	let btnSignIn = await driver.$('button[type="submit"]');
    return await btnSignIn.click();
}

module.exports = {login};