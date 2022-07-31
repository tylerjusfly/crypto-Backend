const { signupService, SigninService, ResetPassword } = require('../../src/services/auth.service');

let testUser = {
  name: 'tyler',
  username: 'adelaide',
  email: 'tylerjusfly1@gmail.com',
  role: 'user',
  password: 'tylerjusfly',
  wallet: 0
};

describe('Signup Service', () => {
  // WRITING TEST FOR SIGNUP SERVICE

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
});

describe('SignIn service', () => {
  // WRITING TEST FOR SIGNUP

  test('checking if signin service is defined', async () => {
    expect(SigninService).toBeDefined();
  });

  test('signin requires all fields', async () => {
    const userLogin = { email: undefined, password: undefined };

    const signInRes = await SigninService(userLogin);

    expect(signInRes).toEqual({ statusCode: 400, message: 'email Or PasswordRequired' });
  });
});

describe('Reset Password Service', () => {
  test('reset Password Requires Same Password', async () => {
    const resetPassword = await ResetPassword('3SDE4G', 'ladygaga', 'differentpass');

    expect(resetPassword).toEqual({ type: 'Error', statusCode: 400, message: 'password Does not match' });
  });
});
