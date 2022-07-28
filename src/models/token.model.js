const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  tokenId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  type: { type: String, required: true }
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
