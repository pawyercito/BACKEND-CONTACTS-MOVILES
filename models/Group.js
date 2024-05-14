// models/Group.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const GroupSchema = new Schema({
  name: { type: String, required: true },
  contacts: [{ type: Schema.Types.ObjectId, ref: 'Contact' }],
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Group', GroupSchema);