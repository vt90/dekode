import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import {Provider} from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from 'config/redux';
import {JssProvider} from 'react-jss';
import sheetsRegistry from 'config/sheetsRegistry';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from 'config/theme';
import './styles/global.css';

const store = configureStore();

const Root = (
    <Provider store={store}>
        <JssProvider registry={sheetsRegistry}>
            <MuiThemeProvider theme={theme}>
                <ConnectedRouter history={history}>
                    <App/>
                </ConnectedRouter>
            </MuiThemeProvider>
        </JssProvider>
    </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));

