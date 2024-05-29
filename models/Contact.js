const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
  name: { type: String, required: true }, // Ahora es requerido
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
  address: { type: String, required: false }, // Este campo sigue siendo opcional
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Este campo sigue siendo requerido
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true // Esto automáticamente agrega los campos createdAt y updatedAt
});

module.exports = mongoose.model('Contact', ContactSchema);