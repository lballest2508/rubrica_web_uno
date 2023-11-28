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
import {  signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export const Home = () => {

  const navigate = useNavigate();

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

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <BookIcon sx={{ mr: 1 }} />
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, ml: 2 }}>
            Biblioteca Unicosta
          </Typography>
          {/* Mueve el IconButton al final del Toolbar */}
          <IconButton color="inherit" onClick={handlelogout}>
            <ExitToAppIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="lg ">
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
              En este sitio podrás encontrar una amplia gama de libros que te ayudarán para tus estudios, podrás gestionar préstamos, consultar disponibilidad, devoluciones y mucho más!
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%',
                    width: '100%',
                  }}
                  image="../../assets/img/disponibilidad.jpg"
                />
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Disponibilidad
                  </Typography>
                  <Typography>
                    En esta sección podrás consultar la disponibilidad de los libros que necesites y realizar préstamos.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href="/books">
                  <Button size="small">Ir</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: '56.25%',
                    width: '100%',
                  }}
                  image="../../assets/img/gestion.png"
                />
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Gestión de Préstamos
                  </Typography>
                  <Typography>
                    En esta sección podrás gestionar los préstamos que tengas pendientes.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href="/loans">
                  <Button size="small">Ir</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}