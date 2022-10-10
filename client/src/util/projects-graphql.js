import { gql } from '@apollo/client'


export const GET_PROJECTS = gql`

  query {

    getProjects {
        _id
        name 
        budget
        shortDescription 
        startDate 
        endDate
        status 
        phase
        leader{
          name
          lastName
        }
    }

  }

`;