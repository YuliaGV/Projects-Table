const { model, Schema } = require('mongoose');


const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    objectives: [
        {
          description: {
            type: String,
            required: true,
          },
          type: {
            type: String,
            enum: ['GENERAL', 'ESPECIFICO'],
            required: true,
          },
        },
    ],
    startDate: {
        type: String,
        default: "",
    },
    endDate: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        enum: ['ACTIVO', 'INACTIVO'],
        default: 'INACTIVO',
    },
    phase: {
        type: String,
        enum: ['INICIADO','TERMINADO', 'NULO'],
        default: 'NULO',
    },
    leader: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    comments: [
        {
          body: String,
          creatorID: String,
          creatorName: String,
          createdAt: String
        }
    ],
    likes: [
        {
          creatorID: String,
          createdAt: String
        }
    ]
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
}
);


projectSchema.virtual('inscriptions', {
    ref: 'Inscription',
    localField: '_id',
    foreignField: 'project'
});

projectSchema.virtual('progresses', {
    ref: 'Progress',
    localField: '_id',
    foreignField: 'project'
});



module.exports = model('Project', projectSchema);


