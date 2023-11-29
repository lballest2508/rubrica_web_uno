import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const LoansUser = ({books}) => {

    const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState('');

  const filteredBooks = books.filter(
    (book) =>
      book.Titulo.toLowerCase().includes(filter.toLowerCase()) ||
      book.Autor.toLowerCase().includes(filter.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleDevolverLibro = (bookId) => {
    console.log(`Prestar libro con ID: ${bookId}`);
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
                  <TableCell>{book.Titulo}</TableCell>
                  <TableCell>{book.Autor}</TableCell>
                  <TableCell>{book.Descripcion}</TableCell>
                  <TableCell>{book.Disponibilidad}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDevolverLibro(book.id)}
                      disabled={book.Disponibilidad !== 'Disponible'}
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
