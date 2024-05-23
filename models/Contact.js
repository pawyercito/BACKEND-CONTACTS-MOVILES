const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumbers: [{
    type: { type: String, enum: ['home', 'work', 'personal'], required: true },
    number: { type: String, required: true }
  }],
  email: { type: String, required: true, validate: {
    validator: function(v) {
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
    },
    message: props => `${props.value} no es un correo electrónico válido`
  }},
  address: { type: String, required: false }, // Este campo es opcional
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Agrega este campo
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true // Esto automáticamente añade los campos createdAt y updatedAt
});

module.exports = mongoose.model('Contact', ContactSchema);
