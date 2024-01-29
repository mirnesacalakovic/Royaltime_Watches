import "./styles.css";
import { Container, CssBaseline, createTheme } from "@mui/material";
import Header from "./Header";
import { ThemeProvider } from "@emotion/react";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import { fetchCurrentUser } from "../../features/account/AccountSlice";
import HomePage from "../../features/home/HomePage";



function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync())
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

  useEffect ( () => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light"; 
  const theme = createTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Montserrat',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(',')
    },
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#EEF0E5' : '#163020'  
      },
      primary: {
        main: paletteType === 'light' ? '#0c422a' : '#163020', 
        dark: '#0c422a',
        light: paletteType === 'light' ? '#EEF0E5': '#163020',
        contrastText: '#fff',
      },
      secondary: {
        main: '#ED7D31',
        dark: '#f0530f',
        light: '#EEF0E5',
        contrastText: '#fff',
      },
      text: {
        primary: paletteType === 'light' ? '#0c422a' : '#EEF0E5',
        secondary: paletteType === 'light' ? '#0c422a' : '#EEF0E5',
        disabled: paletteType === 'light' ? '#0c422a' : '#EEF0E5',
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  
  return (
    <ThemeProvider theme={theme}> 
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      {loading ?  <LoadingComponent message="Initialising app..." /> 
       : location.pathname === '/' ? <HomePage />
       : <Container sx={{mt: '1rem'}}>
            <Outlet />
         </Container>
    
    }
      
    </ThemeProvider>
      
  );
}

export default App;

