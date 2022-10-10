import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


import styled from 'styled-components'

const DateBox = styled.div`
  text-align: right;
  color:#132f4c;
  font-size: 0.8rem;
`


function Project({ project }) {
  return (
    <Card>
      <CardContent>
        <DateBox>Desde {project.startDate.split('T').shift()}</DateBox>
        <Typography variant="h5" component="div">
          {project.name.toUpperCase()}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Creado por: {project.leader.name} {project.leader.lastName}
        </Typography>
        <Typography variant="p">¿De qué se trata?</Typography>
        <Typography variant="body2">{project.shortDescription}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Conoce más</Button>
      </CardActions>
    </Card>
  );
}

export default Project;
