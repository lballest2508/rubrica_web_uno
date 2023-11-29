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

export const LoansUser = ({books}) => {

    const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState('');

  const filteredBooks = books.filter(
    (book) =>
      book.libro.Titulo.toLowerCase().includes(filter.toLowerCase()) ||
      book.libro.Autor.toLowerCase().includes(filter.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleDevolverLibro = async (bookId, loansId) => {
    try {
      // Actualizar estado de libros_prestados
      const librosPrestadosDocRef = firestoreDoc(db, "libros_prestados", loansId);
      await updateDoc(librosPrestadosDocRef, { estado: 0 });
  
      // Actualizar disponibilidad del libro en la colección libros
      const libroDocRef = firestoreDoc(db, "libros", bookId);
      await setDoc(libroDocRef, { Disponibilidad: 1 }, { merge: true });
  
      console.log(`Libro devuelto con éxito. Libro ID: ${bookId}, Préstamo ID: ${loansId}`);
      window.location.reload();
    } catch (error) {
      console.error("Error al devolver el libro:", error);
    }
  };
  
  return (
    <>
    {/* Input de filtrado */}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <Typography variant="p" component="div" style={{marginLeft: '10px'}}>
            Lista de Prestamos - Mostrando {filteredBooks.length} registros de un total de {books.length}.
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

      {/* Tabla de libros */}
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
  )
}
