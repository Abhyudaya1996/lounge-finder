import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2A9D8F',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#E9C46A',
    },
    background: {
      default: '#F0F3F4',
      paper: '#ffffff',
    },
    text: {
      primary: '#264653',
      secondary: '#6C757D',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme; 