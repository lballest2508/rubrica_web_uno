// Importación de módulos y componentes de React y Material-UI
import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import CloseIcon from '@mui/icons-material/Close';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import styled from '@emotion/styled';

// Estilo para el encabezado del formulario
const headerStyle = {
  backgroundColor: 'primary.main',
  color: 'white',
  textAlign: 'center',
  padding: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

// Estilo para el pie de página del formulario
const footerStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
  marginBottom: '20px',
};

// Estilo para un input oculto para la carga de imágenes
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

// Componente funcional BookForm
export const BookForm = ({ handleCloseModal }) => {
  // Estados para los datos del libro
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [disponibilidad, setDisponibilidad] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Agrega un nuevo documento a la colección 'libros' en Firestore
    const libroDocRef = await addDoc(collection(db, 'libros'), {
      Ano: new Date().getFullYear(),
      Autor: autor,
      Descripcion: descripcion,
      Disponibilidad: parseInt(disponibilidad),
      Estado: 1,
      Titulo: titulo,
    });
    console.log('Libro guardado con éxito. ID del libro:', libroDocRef.id);
    handleCloseModal(); // Cierra el modal después de guardar el libro
  };

  // Renderizado del componente
  return (
    <>
      {/* Encabezado del formulario */}
      <Box sx={headerStyle}>
        <ImportContactsIcon sx={{ mr: 1, mt: 1 }} />
        <Typography variant="h6" gutterBottom>
          Agregar Libro
        </Typography>
        <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleCloseModal} />
      </Box>

      {/* Campos de entrada para los detalles del libro */}
      <Grid
        container
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
        }}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="titulo"
            name="titulo"
            label="Titulo del libro"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="autor"
            name="autor"
            label="Autor del libro"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="descripcion"
            name="descripcion"
            label="Descripción del libro"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type='number'
            id="disponibilidad"
            name="disponibilidad"
            label="Disponibilidad del libro"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={disponibilidad}
            onChange={(e) => setDisponibilidad(e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Pie de página del formulario con botones de carga de imagen y guardar */}
      <Box sx={footerStyle}>
        <Grid item xs={6} style={{ marginRight: '5px' }}>
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Imagen
            {/* Input oculto para la carga de imágenes */}
            <VisuallyHiddenInput type="file" />
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="success" startIcon={<SaveIcon />} onClick={handleSubmit}>
            Guardar
          </Button>
        </Grid>
      </Box>
    </>
  );
};
