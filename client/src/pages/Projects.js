import React, {useEffect, useState} from 'react'
import {useQuery} from '@apollo/client';

import { GET_PROJECTS } from '../util/projects-graphql';

import MenuBar from '../components/MenuBar';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Masonry from '@mui/lab/Masonry';


function Projects() {


  const [projects, setProjects] = useState([]);

  const {loading, error, data} = useQuery(GET_PROJECTS);
  
  useEffect(() => {
        if (data) {
            setProjects(data.getProjects);
        }
  } , [data, projects]);
    

  return (
    <div>
       <MenuBar currentElement = 'Proyectos'/>

       <Container maxWidth="lg" style={{ margin: '2rem auto', textAlign: 'center' }}>
          <h1>Lista de proyectos</h1>
          {loading ? (

          <h2>Cargando proyectos...</h2>
        ) : (
          <Masonry columns={4} spacing={2}>
            {projects &&
              projects.map((project) => (
                <Card>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {project.name}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {project.shortDescription }
                      </Typography>
                      <Typography variant="body2">
                        Inserte descripción
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Ver detalles</Button>
                    </CardActions>
                </Card>
              ))}
          </Masonry>
        )}


       </Container>
      
    </div>
  )
}




export default Projects