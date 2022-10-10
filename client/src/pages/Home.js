import React from 'react'

import Container from '@mui/material/Container';
import MenuBar from '../components/MenuBar';

function Home() {
  return (
    <div>
      <MenuBar currentElement = 'Home'/>
      <Container maxWidth="lg" style={{ margin: '2rem auto', textAlign: 'center' }}>
        <h1>Inicio</h1>
        <p>Bienvenid@ a ProjectsTable, gestor de proyectos académicos</p>
      </Container>
    </div>
  )
}

export default Home