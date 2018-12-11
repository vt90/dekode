import {createMuiTheme} from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';

const error = red;

const themeOverrides = {};

export default createMuiTheme({
    palette: {
        primary: {
            main: lightBlue[500],
            dark: lightBlue[800],
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
});
