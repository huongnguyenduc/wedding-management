import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
  primary: {
    main: '#005b96',    
    light: '#b3cde0',
    dark: '#011f4b'
  },
  secondary: {
    light: '#6497b1',
    main: '#03396c',
    contrastText: '#eec9d2',
  },
    },
    overrides: {
    MuiInputLabel: { 
        root: { 
        color:'black',
        fontSize: 13, 
        },
    },
    MuiTableCell: { 
        root: { 
        color:'black',
        fontSize: 15, 
        },
    },
    },
    typography: {
    htmlFontSize: 11,
  },
});


export default theme;