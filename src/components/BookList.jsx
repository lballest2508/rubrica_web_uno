import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { BookTable } from './BookTable'; // Crear este componente para la tabla de libros
import { BookForm } from './BookForm'; // Crear este componente para el formulario de libros
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, createTheme } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BookIcon from '@mui/icons-material/Book';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 500,
  bgcolor: "background.paper",
  border: "0px",
  boxShadow: 24,
  p: 4,
  padding: "0px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

export const BookList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {/* Navbar */}
      <AppBar position="relative">
        <Toolbar>
          <BookIcon sx={{ mr: 1 }} />
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, ml: 2 }}>
            Biblioteca Unicosta
          </Typography>
          <IconButton color="inherit">
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Lista de libros */}
      <BookTable />

      {/* Modal para registrar libros */}
      <Modal aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description" open={isModalOpen} onClose={handleCloseModal} closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <Fade in={open}>
          <Box sx={style}>
            <BookForm handleCloseModal={handleCloseModal} />
          </Box>
        </Fade>
      </Modal>

      {/* Botón de añadir nuevo libro */}
      <Fab color="primary" aria-label="add" onClick={handleOpenModal}>
        <AddIcon />
      </Fab>
    </ThemeProvider>
  );
};
