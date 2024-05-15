const mongoose = require('mongoose');
const { Schema } = mongoose;

const FavoriteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  contactId: { type: Schema.Types.ObjectId, ref: 'Contact', required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Favorite', FavoriteSchema);