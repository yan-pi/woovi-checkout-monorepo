import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4D4D4D',
    },
    secondary: {
      main: '#AFAFAF',
    },
    success: {
      main: '#03D69D',
    },
    error: {
      main: '#FF0000',
    },
    background: {
      default: '#F4FBF9',
      paper: '#E5E5E5',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#133A6F',
          '&:hover': {
            backgroundColor: '#0F2A4B',
          },
          '&.Mui-disabled': {
            backgroundColor: '#E5E5E5',
          },
          borderRadius: '8px',
        },
      },
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontSize: 14,
    h1: {
      fontSize: '24px',
    },
    h2: {
      fontSize: '18px',
    },
    body1: {
      fontSize: '16px',
    },
    body2: {
      fontSize: '14px',
    },
  },
  customColors: {
    thirdiary: '#03D69D',
    tag: '#133A6F',
    selected: '#F4FBF9',
    checked: '#03D69D',
    label: '#E5E5E5',
  },
  customBorders: {
    primary: '#E5E5E5',
    thirdiary: '#03D69D',
  },
  customBackgrounds: {
    buttonPrimary: '#133A6F',
    buttonHover: '#0F2A4B',
    buttonDisabled: '#E5E5E5',
  },
});

export type ThemeProps = typeof theme;

export default theme;
