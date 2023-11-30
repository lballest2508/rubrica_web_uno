// Importación de módulos y componentes de React y Material-UI
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import { addDoc, collection, serverTimestamp, doc as firestoreDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Componente funcional BookTable
export const BookTable = ({ books }) => {
  // Estados para manejar la paginación y el filtrado de libros
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState('');

  // Filtrar libros basado en el título o autor
  const filteredBooks = books.filter(
    (book) =>
      book.Titulo.toLowerCase().includes(filter.toLowerCase()) ||
      book.Autor.toLowerCase().includes(filter.toLowerCase())
  );

  // Funciones para manejar cambios de página y filas por página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  // Función para manejar el clic en el botón de prestar un libro
  const handlePrestarClick = async (bookId) => {
    const id_persona = localStorage.getItem('id_persona');
    // Agregar un nuevo préstamo a la colección 'libros_prestados'
    const prestamo_doc = await addDoc(collection(db, 'libros_prestados'), {
      id_persona,
      id_libro: bookId,
      fecha_registra: serverTimestamp(),
    });
    // Obtener la referencia al documento del libro en Firestore
    const libroDocRef = firestoreDoc(db, 'libros', bookId);
    // Actualizar la disponibilidad del libro a 0 (no disponible)
    await updateDoc(libroDocRef, {
      Disponibilidad: 0,
    });
    window.location.reload(); // Recargar la página después de prestar un libro
    console.log('Libro prestado con éxito. ID del préstamo:', prestamo_doc.id);
  };

  // Renderizado del componente
  return (
    <>
      {/* Encabezado con cuadro de texto para filtrar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography variant="p" component="div" style={{ marginLeft: '10px' }}>
            Lista libros - Mostrando {filteredBooks.length} registros de un total de {books.length}.
          </Typography>
        </div>
        <TextField
          label="Filtrar por título o autor"
          variant="filled"
          margin="normal"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </Box>

      {/* Tabla para mostrar la lista de libros */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Disponibilidad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Mapear y mostrar libros en función de la página y filas por página */}
            {filteredBooks
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.Titulo}</TableCell>
                  <TableCell>{book.Autor}</TableCell>
                  <TableCell>{book.Descripcion}</TableCell>
                  <TableCell>
                    {book.Disponibilidad !== 1 ? <span>No Disponible</span> : <span>Disponible</span>}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handlePrestarClick(book.id)}
                      disabled={book.Disponibilidad !== 1}
                    >
                      Prestar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Paginación para navegar entre las páginas */}
        <Pagination
          count={Math.ceil(filteredBooks.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Libros por página"
        />
      </TableContainer>
    </>
  );
};
