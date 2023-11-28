import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Home } from '../components/Home';
import { BookList } from '../components/BookList';
import { Login } from '../components/Login';
import SignUp from '../components/SingUp';
import { BookLoans } from '../components/BookLoans';

export const AppRoutes = () => {
  // Estado para almacenar el token de acceso
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Verificar la existencia del token al cargar la aplicación
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  // Función para verificar la existencia del token
  const isAuthenticated = () => {
    return accessToken !== null;
  };

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated() ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/home" element={<Home />} />
            <Route path="/loans" element={<BookLoans />} />
          </>
        ) : (
          <>
          <Route path="/*" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
