const jwt = require('jsonwebtoken');

exports.GenerateToken = (userId, type, secret, expires) => {
  const payload = { sub: userId, type };

  let token = jwt.sign(payload, secret, { expiresIn: expires });

  return token;
};

//exports.AccessToken = GenerateToken(user.id, )
