const { hashPassword, compareHashPassword } = require('../../src/middlewares/password');

test('hashPassword successfully, and compare to return true', async () => {
  const pass = 'mySecretPassword';
  const passwordHash = await hashPassword(pass);

  const verifyHashedPassword = await compareHashPassword(pass, passwordHash);

  expect(passwordHash).not.toBeNull;
  expect(verifyHashedPassword).toEqual(true);
  expect(verifyHashedPassword).toBeTruthy();
});

test('hashPassword successfully, and compare wrong password to return false', async () => {
  const right_pass = 'mySecretPassword';
  const wrong_pass = 'myWrongPasswprd';
  const passwordHash = await hashPassword(right_pass);

  const verifyHashedPassword = await compareHashPassword(wrong_pass, passwordHash);

  expect(passwordHash).not.toBeNull;
  expect(verifyHashedPassword).toEqual(false);
  expect(verifyHashedPassword).toBeFalsy();
});
