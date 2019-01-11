import {createMuiTheme} from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';

const error = red;

const themeOverrides = {
    MuiButton: {
        root:{
            letterSpacing: 1.1,
            fontWeight: 300,
            textTransform: 'none',
        },
        outlinedPrimary: {
            background: '#FFFFFF'
        },
    },
    MuiDialog: {
      paper: {
          backgroundColor: '#FFFFFF',
          borderRadius: '4px',
          boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',
          minWidth: 400,
          maxWidth: '96vh',
      }
    },
    MuiTooltip: {
        tooltip: {
            fontSize: 14,
            padding: 8,
            textAlign: 'justify',
        },
    },
    MuiTypography: {
        h4: {
            fontWeight: 300,
        },
    },
};

export default createMuiTheme({
    palette: {
        primary: {
            main: grey[900],
        },
        secondary: {
            light: '#B3E5FC',
            main: '#09D0FF',
            dark: '#01A9EE',
        },
        error: {
            main: error[500],
        },
        background: {default: '#F7F7F7'},
    },
    overrides: themeOverrides,
    typography: {
        useNextVariants: true,
    },
});
