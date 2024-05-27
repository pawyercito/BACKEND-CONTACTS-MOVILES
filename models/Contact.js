const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
  name: { type: String, required: false },
  lastName: { type: String, required: false },
  phoneNumbers: [{
    type: { type: String, enum: ['home', 'work', 'personal'], required: false },
    number: { type: String, required: true }
  }],
  email: { type: String, required: false, validate: {
    validator: function(v) {
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
    },
    message: props => `${props.value} is not a valid email`
  }},
  address: { type: String, required: false }, // This field is optional
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Add this field
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true // This automatically adds the createdAt and updatedAt fields
});

module.exports = mongoose.model('Contact', ContactSchema);