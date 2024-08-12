import { createTheme } from "@mui/material";

export const dark_theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#5587fa',
      light: '#9fb7fc',
      dark: '#3360cd'
    },
    secondary: {
      main: '#00bbae',
      light: '#b2e4de',
      dark: '#009084'
    },
    error: {
      main: '#eb0c2b',
      light: '#f48e92',
      dark: '#b70416'
    },
    info: {
      main: '#0046e6',
      light: '#B1B9F7',
      dark: '#0329b9'
    },
    success: {
      main: '#04bb19',
      light: '#91d692',
      dark: '#018f0b'
    },
    background: {
      default: '#121212',
      paper: '#121212'
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)'
    }
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    allVariants: {
      color: '#fff'
    },
    button: {
      textTransform: 'none'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          fontSize: '18px',
          borderRadius: '4px',
          lineHeight: '100%',
          padding: "10px 30px",
          textWrap: "nowrap",
        },
        outlined: {
          fontSize: '18px',
          borderRadius: '4px',
          lineHeight: '100%',
          padding: "8px 30px",
          color: '#fff',
          border: '2px solid #fff',
          textWrap: "nowrap",
          ":hover": {
            color: '#5587fa',
            border: '2px solid #5587fa'
          }
        }
      }
    },
  }
})

export const light_theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: '#5587fa',
      light: '#9fb7fc',
      dark: '#3360cd'
    },
    secondary: {
      main: '#00bbae',
      light: '#b2e4de',
      dark: '#009084'
    },
    error: {
      main: '#eb0c2b',
      light: '#f48e92',
      dark: '#b70416'
    },
    info: {
      main: '#0046e6',
      light: '#B1B9F7',
      dark: '#0329b9'
    },
    success: {
      main: '#04bb19',
      light: '#91d692',
      dark: '#018f0b'
    },
    background: {
      default: '#fff',
      paper: '#78797d'
    },
    text: {
      primary: '#121212',
      secondary: '#12121270',
      disabled: '#12121250'
    }
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    allVariants: {
      color: '#121212'
    },
    button: {
      textTransform: 'none'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          fontSize: '18px',
          borderRadius: '20px',
          lineHeight: '100%',
          padding: "10px 30px",
          textWrap: "nowrap",
        },
        outlined: {
          fontSize: '18px',
          borderRadius: '20px',
          lineHeight: '100%',
          padding: "8px 30px",
          color: '#121212',
          border: '2px solid #121212',
          textWrap: "nowrap",
          ":hover": {
            color: '#5587fa',
            border: '2px solid #5587fa'
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        outlined: {
          ':root': {
            backgroundColor: '#3360cd10',
            borderRadius: '15px'
          }
        }
      }
    },
  }
})