// Importación de módulos y componentes de React y Material-UI
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Importa funciones de autenticación de Firebase
import { auth } from '../firebase';  // Importa el objeto de autenticación de Firebase

// Función para mostrar información de derechos de autor
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://biblioteca.cuc.edu.co/">
                Biblioteca Unicosta
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// Tema por defecto de Material-UI
const defaultTheme = createTheme();

// Componente funcional SignUp
export default function SignUp() {
    // Estados para el correo electrónico, la contraseña y mensajes de error
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');

    // Función para manejar el registro de usuario
    const registrar = React.useCallback(() => {
        createUserWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setError(errorMessage); // Actualiza el estado de error en caso de un error durante el registro
            });
    }, [email, pass]);

    // Función para manejar el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();
        registrar();
    };

    // Renderizado del componente
    return (
        // Establece el tema por defecto para el componente
        <ThemeProvider theme={defaultTheme}>
            {/* Contenedor principal */}
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                {/* Sección del formulario de registro */}
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {/* Icono de bloqueo */}
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    {/* Título y formulario de registro */}
                    <Typography component="h1" variant="h5">
                        Registrarse
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        {/* Campos de entrada para el correo electrónico y la contraseña */}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Correo electrónico"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    name="password"
                                    autoComplete="new-password"
                                    type="password"
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        {/* Botón de registro */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Registrarse
                        </Button>

                        {/* Enlace para iniciar sesión si ya tienes una cuenta */}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Ya tienes una cuenta? Inicia sesión
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                {/* Información de derechos de autor */}
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}
