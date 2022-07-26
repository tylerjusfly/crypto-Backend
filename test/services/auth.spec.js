const { signupService } = require('../../src/services/auth.service');

let testUser = {
  name: 'tyler',
  username: 'adelaide',
  email: 'tylerjusfly1@gmail.com',
  role: 'user',
  password: 'tylerjusfly',
  wallet: 0
};

test('checking if signup service is defined', async () => {
  expect(signupService).toBeDefined();
});

test('signup service To Require all fields', async () => {
  testUser.username = undefined;
  testUser.email = undefined;
  const signupResponse = await signupService(testUser);

  expect(signupResponse).toEqual({ type: 'Error', message: 'all Fields Required', statusCode: 400 });
});

test('signup service To Block User From setting Roles to admin', async () => {
  let adminData = {
    name: 'tyler',
    username: 'adelaide',
    email: 'tylerjusfly1@gmail.com',
    role: 'admin',
    password: 'tylerjusfly',
    wallet: 0
  };
  const signupResponse = await signupService(adminData);

  expect(signupResponse).toEqual({ type: 'Error', message: 'roleRestriction', statusCode: 400 });
});

test('signup service To Block User From funding Wallet during registeration', async () => {
  let walletData = {
    name: 'tyler',
    username: 'adelaide',
    email: 'tylerjusfly1@gmail.com',
    role: 'user',
    password: 'tylerjusfly',
    wallet: 600
  };
  const signupResponse = await signupService(walletData);

  expect(signupResponse).toEqual({ type: 'Error', message: 'walletFundingRestriction', statusCode: 400 });
});
