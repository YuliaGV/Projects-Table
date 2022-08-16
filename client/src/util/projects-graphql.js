import { gql } from '@apollo/client'


export const GET_PROJECTS = gql`

  query {

    getProjects {
        name 
        budget
        shortDescription 
        startDate 
        endDate
        status 
        phase
    }

  }

`;