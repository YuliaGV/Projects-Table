const { model, Schema } = require('mongoose');


const progressSchema = new Schema({

    date: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reviews: [
        {
          text: {
            type: String,
            required: true,
          },
          date: {
            type: String,
            required: true,
          },
        },
    ],
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
      },
    leader: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }

});

module.exports = model('Progress', progressSchema);