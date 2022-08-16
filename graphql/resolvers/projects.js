const { AuthenticationError } = require('apollo-server');

const Project = require('../../models/Project')

const checkAuth = require('../../util/check-auth');

module.exports = {


    Query: {
        async getProjects(){
            return Project.find().populate('leader');
        }
    },

    Mutation:{

        async registerProject(_, {projectInput: {name, budget, shortDescription, objectives}}, context) {   //Register a new user
            
            const { status, role, id } = checkAuth(context)

            if(status === 'AUTORIZADO' && role === 'LIDER'){

                const newProject = new Project({
                    name, 
                    budget, 
                    shortDescription,
                    objectives,
                    leader:  id
                })
    
                const res = await newProject.save();
    
                return{
                    ...res._doc,
                    id: res._id,
                }

            }else{

                throw new AuthenticationError("Acción no permitida");
            }

          
        },  
        async approveProject (_, {idProject}, context){

            const { status, role } = checkAuth(context)

            if(status === 'AUTORIZADO' && role === 'ADMINISTRADOR'){


                return await Project.findByIdAndUpdate(idProject, {
                    startDate: new Date().toISOString(),
                    status: "ACTIVO",
                    phase: "INICIADO"
                });

            }else{
                throw new AuthenticationError("Acción no permitida");
            }


        },

        async likeProject(_, { idProject }, context) {

            const { id } = checkAuth(context);
      
            const project = await Project.findById(idProject);

            if (project) {
              if (project.likes.find((like) => like.creatorID === id)) {
                // Project already likes, unlike it
                project.likes = project.likes.filter((like) => like.creatorID !== id);
              } else {
                // Not liked, like project
                project.likes.push({
                  creatorID: id,
                  createdAt: new Date().toISOString()
                });
              }
      
              await project.save();
              return project;
            } else{
              throw new UserInputError('Proyecto no encontrado');
            }
        },


        async createComment(_, { idProject, body }, context){

            const { id } = checkAuth(context);

            if (body.trim() === '') {
              throw new UserInputError('Comentario vacío', {
                errors: {
                  body: 'El comentario no puede ir vacío'
                }
              });
            }
      
            const project = await Project.findById(idProject);
      
            if (project) {
                project.comments.unshift({
                body,
                creatorID: id,
                createdAt: new Date().toISOString()
              });
              await project.save();
              return project;
            } else throw new UserInputError('Proyecto no encontrado');
        },
      
        async deleteComment(_, {idProject, idComment}, context) {

            const { id } = checkAuth(context);
      
            const project = await Project.findById(idProject);
      
            if (project) {
              const commentIndex = project.comments.findIndex((c) => c.id === idComment);
      
              if (project.comments[commentIndex].creatorID === id) {
                project.comments.splice(commentIndex, 1);
                await project.save();
                return project;
              } else {
                throw new AuthenticationError('Acción no permitida');
              }
            } else {
              throw new UserInputError('Proyecto no encontrado');
            }
        }
        
        

    }
}