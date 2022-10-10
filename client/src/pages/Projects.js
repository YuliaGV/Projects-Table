import React, {useEffect, useState} from 'react'
import {useQuery} from '@apollo/client';

import { GET_PROJECTS } from '../util/projects-graphql';

import MenuBar from '../components/MenuBar';
import Container from '@mui/material/Container';
import Masonry from '@mui/lab/Masonry';
import Project from '../components/Project';


function Projects() {


  const [projects, setProjects] = useState([]);

  const {loading, error, data} = useQuery(GET_PROJECTS);
  
  useEffect(() => {
        if (data) {
            setProjects(data.getProjects.filter(elem => elem.phase==='INICIADO')); //It shows only projects 
        }
  } , [data]);
    

  return (
    <div>
       <MenuBar currentElement = 'Proyectos'/>

       <Container maxWidth="lg" style={{ margin: '2rem auto', textAlign: 'center' }}> 

          <h1>Proyectos activos</h1>

          <div style={{ margin: '2rem auto'}}>

          {loading && ( <h2>Cargando proyectos...</h2>)}
         
          {!error && projects.length > 0 ? (
          <Masonry columns={{ xs: 1, sm: 2, md:4, lg:4 }} spacing={2} style={{ margin: '2rem auto'}}>
            {projects.map((project) => (
               <Project project={project} key={project._id}/>
            ))}
          </Masonry>
         
        ) : (<p>No hay proyectos en este momento</p>)}
        
        {error && (<p>Ups! Error al intentar cargar los proyectos</p>)}

        </div>

       </Container>
      
    </div>
  )
}




export default Projects