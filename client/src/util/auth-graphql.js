import { gql } from '@apollo/client'


export const REGISTER_USER = gql`

  mutation registerUser(
        $pin: String!
        $name: String!
        $lastName: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
        $role:String!
    ){
        registerUser(
            userInput:{
                pin: $pin
                name: $name
                lastName: $lastName
                email: $email
                password: $password
                confirmPassword: $confirmPassword
                role: $role
            }
        ){
            pin
            name
            lastName
            email
            token
        }
          
    }
    
`;


export const LOGIN_USER = gql`

  mutation login(

        $email: String!
        $password: String!
       
    ){
        login(
            email: $email
            password: $password
        ){
            pin
            name
            lastName
            email
            token
        }
          
    }
    
`;


