import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from '@emotion/styled';
import SaveIcon from '@mui/icons-material/Save';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import CloseIcon from '@mui/icons-material/Close';

const headerStyle = {
    backgroundColor: "primary.main",
    color: "white",
    textAlign: "center",
    padding: "10px",
    display: "flex",
    justifyContent: 'space-between',
    alignItems: 'center',
};

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

const footerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    marginBottom: "20px",
  };

export const BookForm = ({ handleCloseModal }) => {
    // Lógica para manejar el formulario y registrar un nuevo libro

    const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica para enviar la información del nuevo libro
        // ...
        // Cerrar el modal después de enviar el formulario
        handleCloseModal();
    };

    return (
        <>
            <Box sx={headerStyle}>
                <ImportContactsIcon sx={{ mr: 1, mt: 1 }} />
                <Typography variant="h6" gutterBottom>
                    Agregar Libro
                </Typography>
                <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleCloseModal} />
            </Box>
            <Grid container
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "40px",
                }}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="titulo"
                        name="titulo"
                        label="Titulo del libro"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
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
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="disponibilidad"
                        name="disponibilidad"
                        label="Disponibilidad del libro"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                    />
                </Grid>
            </Grid>
                <Box sx={ footerStyle }>
                    <Grid item xs={6} style={{marginRight: '5px'}}>
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Imagen
                            <VisuallyHiddenInput type="file" />
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" color="success" startIcon={<SaveIcon />}>
                            Guardar
                        </Button>
                    </Grid>
                </Box>
        </>
    );
};
