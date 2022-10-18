const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const { UserInputError } = require('apollo-server');

const { AuthenticationError } = require('apollo-server');

const { SECRET_KEY } = require('../../config')

const User = require('../../models/User')

const { validateRegisterInput, validateLoginInput }  = require('../../util/validators')

const checkAuth = require('../../util/check-auth');


function generateToken(user){
    return jwt.sign({
        id: user.id,
        name:user.name,
        lastName:user.lastName,
        role: user.role,
        status: user.status
    },  SECRET_KEY, {expiresIn: '4h'} )

}


module.exports = {


    Query: {
        async getUsers(){
            try{
                const users = await User.find();
                return users;

            }catch(err){
                throw new Error(err);
            }
        },
        async getUser(_, {idUser}){
            const user = await User.findById(idUser);
            if(user){
                return user;
            }else{
                throw new Error('User not found');
            }
        }
    },

    Mutation:{

        async registerUser(_, {userInput: {pin, name, lastName, email, password, confirmPassword, role}}) {   //Register a new user
            
            //Validate User data
            const {valid, errors} = validateRegisterInput(pin, name, lastName, email, password, confirmPassword, role)
            if(!valid) {
                throw new UserInputError('Errors', { errors });
            }

            //Make sure the user is not already registered
            
            const pinExist = await User.findOne({ pin });
            const emailExist = await User.findOne({ email });

            if( pinExist ){
                throw new UserInputError('Este documento de identidad ya se encuentra registrado', {
                    errors:{
                        pin: 'Este documento de identidad ya se encuentra registrado'
                    }
                })
            }

            if( emailExist ){
                throw new UserInputError('Este email ya se encuentra registrado', {
                    errors:{
                        email: 'Este email ya se encuentra registrado'
                    }
                })
            }


            //hash password 
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                pin, 
                name, 
                lastName, 
                email:email.toLowerCase(), 
                password,  
                role
            })

            const res = await newUser.save();

            const token = generateToken(res);

            return{
                ...res._doc,
                id: res._id,
                token
            }
        },  
        async login(_, {email, password}) {  //Login

            email = email.toLowerCase();

            const {errors, valid} = validateLoginInput(email, password);

            if(!valid) {
                throw new UserInputError('Errors', {errors})
            }

            const user = await User.findOne({ email }); 

            if(!user){
                errors.general = 'Usuario no encontrado';
                throw new UserInputError('Usuario no encontrado', {errors})
            }

            if(user.status === 'PENDIENTE'){
                errors.general = 'Usuario pendiente por autorización';
                throw new UserInputError('Usuario pendiente por autorización', {errors})
            }

            if(user.status === 'NO_AUTORIZADO'){
                errors.general = 'Lo sentimos, tu cuenta no está autorizada';
                throw new UserInputError('Lo sentimos, tu cuenta no está autorizada', {errors})
            }

            const match = await bcrypt.compare(password, user.password);

            if(!match){
                errors.general = 'Contraseña incorrecta';
                throw new UserInputError('Contraseña incorrecta', {errors})
            }

            const token = generateToken(user);

            return{
                ...user._doc,
                id:user._id,
                token
            }
        },
        async approveAccount (_, {idUser, approved}, context){

            const user = checkAuth(context);

            if(user.status === 'AUTORIZADO' && user.role === 'ADMINISTRADOR'){

                if(approved){

                    return await User.findByIdAndUpdate(idUser, {
                        status: "AUTORIZADO"
                    });

                }else{

                    return await User.findByIdAndUpdate(idUser, {
                        status: "NO_AUTORIZADO"
                    });
                }

               
            }else{

                throw new AuthenticationError("Acción no permitida");

            }


        },
        async updateProfile(_, {idUser, name, lastName, email, password, confirmPassword}, context){

            const { id, status } = checkAuth(context);
            

            if(status === 'AUTORIZADO' && id === idUser){
                
                const emailExist = await User.findOne({ email });

                if( emailExist && emailExist.id !== id){
                    throw new UserInputError('Este email ya se encuentra registrado por otro usuario', {
                        errors:{
                            email: 'Este email ya se encuentra registrado por otro usuario'
                        }
                    })
                }

                if(password !== confirmPassword){
                    throw new UserInputError('Las contraseñas no coinciden', {
                        errors:{
                            email: 'Las contraseñas no coinciden'
                        }
                    })
                }

                //hash password 
                password = await bcrypt.hash(password, 12);

                return await User.findByIdAndUpdate(idUser, {
                    name, 
                    lastName, 
                    email:email.toLowerCase(), 
                    password
                });

            }
        }

        

    }
}