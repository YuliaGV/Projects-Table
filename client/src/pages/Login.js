import React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Logo_1 from "../img/Logo_1.png";

function Login() {
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
                Iniciar sesión
              </Typography>
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
            
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Correo electrónico"
                      name="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
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
                    <Link href="/register" variant="body2">
                      Todavía no tienes una cuenta? Regístrate
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

export default Login;
