// Importación de módulos y componentes de React y Material-UI
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import BookIcon from '@mui/icons-material/Book';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { IconButton } from '@mui/material';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

// Función que devuelve el año actual para Copyright
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
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

// Componente funcional Home
export const Home = () => {
  // Hook de navegación de React Router
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handlelogout = () => { 
    signOut(auth).then(() => {
      navigate('/login');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.reload();
    }).catch((error) => {
      console.log(error);
    });
  }

  // Renderizado del componente
  return (
    // Establece el tema por defecto para el componente
    <ThemeProvider theme={defaultTheme}>
      {/* Establece el estilo base de la página */}
      <CssBaseline />

      {/* Barra de navegación */}
      <AppBar position="relative">
        <Toolbar>
          {/* Icono de libro en la barra de navegación */}
          <BookIcon sx={{ mr: 1 }} />

          {/* Título de la barra de navegación */}
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, ml: 2 }}>
            Biblioteca Unicosta
          </Typography>

          {/* Botón para cerrar sesión */}
          <IconButton color="inherit" onClick={handlelogout}>
            <ExitToAppIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Contenido principal */}
      <main>
        {/* Sección hero */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="lg">
            {/* Título y descripción principal */}
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              ¡Bienvenido a la Biblioteca de la CUC!
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              En este sitio podrás encontrar una amplia gama de libros que te ayudarán para tus estudios,
              podrás gestionar préstamos, consultar disponibilidad, devoluciones y mucho más!
            </Typography>
          </Container>
        </Box>

        {/* Sección de tarjetas */}
        <Container sx={{ py: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }} maxWidth="md">
          <Grid container spacing={4} justifyContent="center">
            {/* Tarjeta 1: Disponibilidad */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                {/* Imagen de la tarjeta */}
                <CardMedia
                  component="div"
                  sx={{
                    // Proporciones 16:9
                    pt: '56.25%',
                    width: '100%',
                  }}
                  image="../../assets/img/disponibilidad.jpg"
                />
                {/* Contenido de la tarjeta */}
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  {/* Título de la tarjeta */}
                  <Typography gutterBottom variant="h5" component="h2">
                    Disponibilidad
                  </Typography>
                  {/* Descripción de la tarjeta */}
                  <Typography>
                    En esta sección podrás consultar la disponibilidad de los libros que necesites y realizar préstamos.
                  </Typography>
                </CardContent>
                {/* Acciones de la tarjeta */}
                <CardActions>
                  {/* Botón de enlace para ir a la sección de libros */}
                  <Link href="/books">
                    <Button size="small">Ir</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>

            {/* Tarjeta 2: Gestión de Préstamos */}
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                {/* Imagen de la tarjeta */}
                <CardMedia
                  component="div"
                  sx={{
                    // Proporciones 16:9
                    pt: '56.25%',
                    width: '100%',
                  }}
                  image="../../assets/img/gestion.png"
                />
                {/* Contenido de la tarjeta */}
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  {/* Título de la tarjeta */}
                  <Typography gutterBottom variant="h5" component="h2">
                    Gestión de Préstamos
                  </Typography>
                  {/* Descripción de la tarjeta */}
                  <Typography>
                    En esta sección podrás gestionar los préstamos que tengas pendientes.
                  </Typography>
                </CardContent>
                {/* Acciones de la tarjeta */}
                <CardActions>
                  {/* Botón de enlace para ir a la sección de préstamos */}
                  <Link href="/loans">
                    <Button size="small">Ir</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>

      {/* Pie de página */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Copyright />
      </Box>
      {/* Fin del pie de página */}
    </ThemeProvider>
  );
}
