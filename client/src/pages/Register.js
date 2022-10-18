import React, {useState} from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
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
import { REGISTER_USER } from '../util/auth-graphql';



function Register() {

  const theme = createTheme();


  
  const validationSchema = yup.object({
    pin: yup
      .string('Ingresa tu número de documento de identidad')
      .required('El documento es requerido'),
    name: yup
      .string('Ingresa tu nombre')
      .required('El nombre es requerido'),
    lastName: yup
      .string('Ingresa tu apellido')
      .required('El apellido es requerido'),
    email: yup
      .string('Ingresa tu email')
      .email('Ingresa un email válido')
      .required('El email es requerido'),
    password: yup
      .string('Crea tu clave')
      .min(8, 'La clave debe tener al menos 8 caracteres')
      .required('La clave es requerida'),
    confirmPassword: yup
      .string('Repite tu clave')
      .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
      .required('Debes repetir la clave'),
    role: yup
      .string('Selecciona tu rol')
      .required('El rol es requerido'),
  });


  const [completed, setCompleted] = useState(false);


  const [registerUser,{ loading, error }] = useMutation(REGISTER_USER, {
    update(proxy, result){
      //console.log(result)
    },
    onCompleted: data => {
      setCompleted(true);
    }
  });


  const formik = useFormik({
    initialValues: {
      pin: '',
      name: '',
      lastName: '',
      email: '', 
      password: '',
      confirmPassword: '',
      role:''
    },
    validationSchema: validationSchema,
    onSubmit: (values,{resetForm}) => {
      registerUser({ variables: values });
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
                Registrarte
              </Typography>

              <Typography component="p" variant="p"  sx={{
                marginTop: 4
              }}>

                Nota: Todavía no podrás iniciar sesión con tu nueva cuenta, debes esperar a que sea aprobada por un administrador
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
                        autoFocus
                        required
                        fullWidth
                        id="pin"
                        label="N° de documento de identidad (TI/CC/CE/PAS)"
                        name="pin"
                        value={formik.values.pin}
                        onChange={formik.handleChange}
                        error={formik.touched.pin && Boolean(formik.errors.pin)}
                        helperText={formik.touched.pin && formik.errors.pin}

                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="Nombre"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Apellido"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                                  />
                    </Grid>
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
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Repite la contraseña"
                        type="password"
                        id="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                      />
                    </Grid>
                    <Grid item xs={12}>
                    <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="role"
                        name='role'
                        required
                        fullWidth
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        error={formik.touched.role && Boolean(formik.errors.role)}
                      >
                      
                        <MenuItem value="ESTUDIANTE">Estudiante</MenuItem>
                        <MenuItem value="LIDER">Líder</MenuItem>
                        <MenuItem value="ADMINISTRADOR">Administrador</MenuItem>
                      </Select>
                  
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        required
                        control={
                          <Checkbox 
                          color="primary" />
                        }
                        label="Acepto los términos y condiciones"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Registrarte
                  </Button>
                  <Grid container>
                    <Grid item xs={12}>
                      <Link href="/login" variant="body2">
                        Ya tienes una cuenta? Inicia sesión
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
                error &&
                <Alert severity="error">{error.message}</Alert>
              }
              {
                loading &&
                <Alert severity="info">Enviando datos...</Alert>
              }
              {
                completed &&
                <Alert severity="success">Registro exitoso, espera la aprobación de tu cuenta</Alert>
              }
            </Box>
          </Container>
        </ThemeProvider>
      </Container>
    </>
  );
}

export default Register;
