import React, {useContext} from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Logo_1 from "../img/Logo_1.png";

import { useFormik } from 'formik';
import * as yup from 'yup';


import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../util/auth-graphql';

import { AuthContext } from '../context/auth'

import { useNavigate } from 'react-router-dom';

function Login() {

  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const theme = createTheme();

  const validationSchema = yup.object({
    email: yup
      .string('Ingresa tu email')
      .email('Ingresa un email válido')
      .required('El email es requerido'),
    password: yup
      .string('Ingresa tu clave')
      .required('La clave es requerida')
  });


  const [loginUser,{ loading, error }] = useMutation(LOGIN_USER, {
    update(_, result){
      context.login(result.data.login);
    },
    onCompleted: data => {
      navigate('/');
    }
  });


  
  const formik = useFormik({
    initialValues: {
      email: '', 
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values,{resetForm}) => {
      loginUser({ variables: values });
      resetForm();
    },
  });


  return (
    <>
      <Container
        maxWidth="lg"
        style={{ margin: "2rem auto", textAlign: "center" }}
      >
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={Logo_1} alt="Logo" />

              <Typography component="h1" variant="h5">
                Iniciar sesión
              </Typography>

              <Box
              sx={{
                marginTop: 8,
                marginBottom: 4,
              }}
              >
              
                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={2}>
              
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Correo electrónico"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}

                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}

                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Ingresar
                  </Button>
                  <Grid container>
                    <Grid item xs={12}>
                      <Link href="/register" variant="body2">
                      ¿Todavía no tienes una cuenta? Regístrate
                      </Link>
                    </Grid>
                    <Grid item xs={12}>
                      <Link href="/" variant="body2">
                        Ir al home
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </Box>
              {
                loading &&
                <Alert severity="info">Cargando...</Alert>
              }
              {
                error &&
                <Alert severity="error">{error.message}</Alert>
              }
            </Box>


          </Container>
        </ThemeProvider>
      </Container>
    </>
  );
}

export default Login;
