// Importación de módulos y componentes de Material-UI, React y Firebase
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { updateDoc, doc as firestoreDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

// Componente funcional LoansUser
export const LoansUser = ({ books }) => {
  // Estados para manejar la paginación y el filtrado de préstamos
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState('');

  // Filtrar préstamos basado en el título o autor del libro
  const filteredBooks = books.filter(
    (book) =>
      book.libro.Titulo.toLowerCase().includes(filter.toLowerCase()) ||
      book.libro.Autor.toLowerCase().includes(filter.toLowerCase())
  );

  // Funciones para manejar cambios de página y filas por página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  // Función para manejar la devolución de un libro prestado
  const handleDevolverLibro = async (bookId, loansId) => {
    try {
      // Actualizar estado de libros_prestados a 0 (devuelto)
      const librosPrestadosDocRef = firestoreDoc(db, "libros_prestados", loansId);
      await updateDoc(librosPrestadosDocRef, { estado: 0 });

      // Actualizar disponibilidad del libro en la colección libros a 1 (disponible)
      const libroDocRef = firestoreDoc(db, "libros", bookId);
      await setDoc(libroDocRef, { Disponibilidad: 1 }, { merge: true });

      console.log(`Libro devuelto con éxito. Libro ID: ${bookId}, Préstamo ID: ${loansId}`);
      window.location.reload(); // Recargar la página después de devolver un libro
    } catch (error) {
      console.error("Error al devolver el libro:", error);
    }
  };

  // Renderizado del componente
  return (
    <>
      {/* Input de filtrado y texto de resumen */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography variant="p" component="div" style={{ marginLeft: '10px' }}>
            Lista de Préstamos - Mostrando {filteredBooks.length} registros de un total de {books.length}.
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

      {/* Tabla de préstamos */}
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
            {/* Mapear y mostrar préstamos en función de la página y filas por página */}
            {filteredBooks
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.libro.Titulo}</TableCell>
                  <TableCell>{book.libro.Autor}</TableCell>
                  <TableCell>{book.libro.Descripcion}</TableCell>
                  <TableCell>{book.libro.Disponibilidad}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDevolverLibro(book.libro.id, book.id)}
                      disabled={book.libro.Disponibilidad !== 0}
                    >
                      Devolver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginación */}
      <Pagination
        count={Math.ceil(filteredBooks.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Libros por página"
        style={{ marginTop: '10px', marginLeft: '10px' }}
      />
    </>
  );
};
