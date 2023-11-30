// Importación de módulos y componentes de React y Material-UI
import { useEffect, useState } from "react";
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
import { LoansUser } from "../hooks/LoansUser"; // Importa un componente para la tabla de préstamos del usuario
import { collection, getDocs, getDoc, where, query, doc as firestoreDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

// Definición del componente BookLoans
export const BookLoans = () => {
    const defaultTheme = createTheme();
    const [books, setBooks] = useState([]); // Estado para almacenar la lista de libros prestados
    const navigate = useNavigate();

    // Función para cerrar sesión
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

    // Función para redireccionar al usuario a la página de inicio
    const redireccionar = () => {
        navigate('/home');
    }

    // Efecto secundario para obtener la lista de libros prestados al usuario
    useEffect(() => {
        const obtenerDocumentos = async () => {
            try {
                // Obtener el ID del usuario en sesión desde localStorage
                const userId = localStorage.getItem("id_persona");

                // Consultar la colección libros_prestados para el usuario en sesión
                const librosPrestadosCollectionRef = collection(db, "libros_prestados");
                const q = query(librosPrestadosCollectionRef, where("id_persona", "==", userId));
                const librosPrestadosSnapshot = await getDocs(q);

                const listaDocumentos = [];
                for (const doc of librosPrestadosSnapshot.docs) {
                    // Obtener el ID del libro prestado
                    const libroPrestadoId = doc.data().id_libro;

                    // Consultar la colección libros para obtener información adicional
                    const libroRef = firestoreDoc(db, "libros", libroPrestadoId);
                    const libroSnapshot = await getDoc(libroRef);

                    // Agregar información a la lista de documentos
                    listaDocumentos.push({
                        id: doc.id,
                        libro: {
                            id: libroSnapshot.id,
                            ...libroSnapshot.data(),
                        },
                        ...doc.data(),
                    });
                }

                setBooks(listaDocumentos);
            } catch (error) {
                console.error("Error al obtener documentos:", error);
            }
        };

        obtenerDocumentos();
    }, []);

    // Renderizado del componente
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
                        sx={{ flexGrow: 1, ml: 2, cursor: "pointer" }}
                        onClick={redireccionar}
                    >
                        Biblioteca Unicosta
                    </Typography>
                    <IconButton color="inherit" onClick={handlelogout}>
                        <ExitToAppIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Componente LoansUser para mostrar la tabla de préstamos del usuario */}
            <LoansUser books={books} />

            {/* Botón de añadir nuevo libro (enlazado a la página de libros) */}
            <Box
                sx={{
                    position: "fixed",
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
            >
                <Link to="/books">
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Link>
            </Box>
        </ThemeProvider>
    );
};
