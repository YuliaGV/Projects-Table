import React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Logo_1 from "../img/Logo_1.png";

function Register() {
  const theme = createTheme();

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
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="pin"
                      label="N° de documento de identidad (TI/CC/CE/PAS)"
                      name="pin"
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
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Apellido"
                      name="lastName"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Correo electrónico"
                      name="email"
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      required
                      fullWidth
                      //value={}
                      //onChange={handleChange}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                    
                      <MenuItem value="ESTUDIANTE">Estudiante</MenuItem>
                      <MenuItem value="LIDER">Líder</MenuItem>
                      <MenuItem value="ADMINISTRADOR">Administrador</MenuItem>
                    </Select>
                
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
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
                    <Link href="/home" variant="body2">
                      Ir al home
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Container>
    </>
  );
}

export default Register;
