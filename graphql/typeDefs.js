const gql = require('graphql-tag')


module.exports = gql `

    type User {
        _id: ID!
        pin: String!
        name: String!
        lastName: String!
        email: String!
        password: String!
        role: String!
        status: String!
        token: String!
    }

    
    type Project{
        _id: ID!
        name: String!
        budget: Float!
        shortDescription: String!
        objectives: [Objective]!
        startDate: String!
        endDate: String!
        status: String!
        phase: String!
        leader: User!
        inscriptions: [Inscription]!
        progresses: [Progress]!
        comments: [Comment]!
        likes: [Like]!

    }

    type Objective{
        _id: ID!
        description: String!
        type: String!
    }


    type Inscription{
        status: String!
        entryDate: String!
        exitDate: String!
        project: Project!
        student: User!
    }

    type Progress{
        date: String!
        description:String!
        reviews: [Review]!
        project: Project!
    }

    type Review{
        text: String!
        date: String!
    }

    type Comment {
        id: ID!
        createdAt: String!
        creatorID: String!
        creatorName: String!
        body: String!
    }
    type Like {
        id: ID!
        createdAt: String!
        creatorID: String!
    }

    input UserInput{
        pin: String!
        name: String!
        lastName: String!
        email: String!
        password: String!
        confirmPassword: String!
        role: String!
    }

    input ProjectInput{
        name: String!
        budget: Float!
        shortDescription: String!
        objectives: [ObjectiveInput]!
    }

    input ObjectiveInput {
        description: String!
        type: String!
    }

    type Query {
        getUsers: [User]
        getUser(idUser:ID!):User
        getProjects: [Project]
    }


    type Mutation{

        registerUser(userInput: UserInput): User!
        login(email: String!, password: String!): User!
        approveAccount(idUser: ID!, approved: Boolean!): User! 
        updateProfile(idUser: ID!, name: String!, lastName: String!, email: String!, password: String!, confirmPassword: String! ): User!

     
        registerProject(projectInput: ProjectInput):Project!
        approveProject(idProject: ID!):Project!
        likeProject(idProject: ID!):Project!
        createComment(idProject:  ID!, body: String!): Project!
        deleteComment(idProject: ID!, idComment: ID!): Project!
        

    }




`;
