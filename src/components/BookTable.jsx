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

export const BookTable = ({ books }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState('');

  const filteredBooks = books.filter(
    (book) =>
      book.titulo.toLowerCase().includes(filter.toLowerCase()) ||
      book.autor.toLowerCase().includes(filter.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handlePrestarClick = (bookId) => {
    // Lógica para manejar el evento de hacer clic en el botón "prestar"
    // Puedes implementar la lógica según tus necesidades, como cambiar el estado de disponibilidad del libro, etc.
    console.log(`Prestar libro con ID: ${bookId}`);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography variant="p" component="div" style={{marginLeft: '10px'}}>
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
                  <TableCell>{book.titulo}</TableCell>
                  <TableCell>{book.autor}</TableCell>
                  <TableCell>{book.descripcion}</TableCell>
                  <TableCell>{book.disponibilidad}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handlePrestarClick(book.id)}
                      disabled={book.disponibilidad !== 'Disponible'}
                    >
                      Prestar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
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
