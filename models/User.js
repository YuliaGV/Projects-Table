const { model, Schema } = require('mongoose');


const userSchema = new Schema({
    pin:{  //Documento de identidad 
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (email) =>{
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: 'Este no es un email valido',
        }
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
        enum: ["ESTUDIANTE", "LIDER", "ADMINISTRADOR"]
    },
    status:{
        type: String,
        enum: ["PENDIENTE", "AUTORIZADO", "NO_AUTORIZADO",],
        default: 'PENDIENTE'
    },

        
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});


userSchema.virtual('projectsByLeader', {
    ref: 'Project',
    localField: '_id',
    foreignField: 'leader'
});


module.exports = model('User', userSchema);