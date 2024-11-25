// Importación de módulos y componentes de React y Material-UI
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import image from '../../assets/img/unicosta.jpg';  // Importa la imagen de fondo
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Función para mostrar información de derechos de autor
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Centro Medico Universitario
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// Tema por defecto de Material-UI
const defaultTheme = createTheme();

// Componente funcional Login
export const Login = () => {
  // Hook de navegación de React Router
  const navigate = useNavigate();

  // Estados para el correo electrónico y la contraseña
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  // Función para manejar el inicio de sesión
  const loguear = (() => {
    signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem('id_persona', user.uid);
            localStorage.setItem('accessToken', user.stsTokenManager.accessToken);
            localStorage.setItem('refreshToken', user.stsTokenManager.refreshToken);
            navigate('/home');
            window.location.reload();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
  });

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    loguear();
  };
  
  // Renderizado del componente
  return (
    // Establece el tema por defecto para el componente
    <ThemeProvider theme={defaultTheme}>
      {/* Contenedor principal */}
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        {/* Sección de la imagen de fondo */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${image})`,  // Establece la imagen de fondo
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Sección del formulario de inicio de sesión */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Icono de bloqueo */}
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            
            {/* Título y formulario de inicio de sesión */}
            <Typography component="h1" variant="h5">
              Iniciar sesión
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {/* Campos de entrada para el correo electrónico y la contraseña */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />

              {/* Opciones adicionales del formulario (recordar contraseña) */}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recuérdame"
              />

              {/* Botón de inicio de sesión */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar sesión
              </Button>

              {/* Enlaces adicionales (olvidó su contraseña, registrarse) */}
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Has olvidado tu contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"No tienes una cuenta? Regístrate"}
                  </Link>
                </Grid>
              </Grid>

              {/* Información de derechos de autor */}
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
