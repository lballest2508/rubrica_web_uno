import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import BookIcon from "@mui/icons-material/Book";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { LoansUser } from "../hooks/LoansUser";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";



export const BookLoans = () => {
    const defaultTheme = createTheme();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const obtenerDocumentos = async () => {
          try {
            const librosCollectionRef = collection(db, 'libros_prestados');
            const snapshot = await getDocs(librosCollectionRef);
      
            const listaDocumentos = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
    
            setBooks(listaDocumentos); 
            
          } catch (error) {
            console.error('Error al obtener documentos:', error);
          }
        };
      
        obtenerDocumentos();
      }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            {/* Navbar */}
            <AppBar position="relative">
                <Toolbar>
                    <BookIcon sx={{ mr: 1 }} />
                    <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1, ml: 2 }}
                    >
                        Biblioteca Unicosta
                    </Typography>
                    <IconButton color="inherit">
                        <ExitToAppIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <LoansUser books={books} />

            {/* Botón de añadir nuevo libro */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            >
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Box>
        </ThemeProvider>
    );
};
