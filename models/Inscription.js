const { model, Schema } = require('mongoose');


const inscriptionSchema = new Schema({

    status: {
        type: String,
        enum: ['ACEPTADO', 'RECHAZADO', 'PENDIENTE'],
        default: 'PENDIENTE',
        required: true,
    },
    entryDate: {
        type: String,
        default: "",
    },
    exitDate: {
        type: String,
        default: "",
      },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
      },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

});

module.exports = model('Inscription', inscriptionSchema);
