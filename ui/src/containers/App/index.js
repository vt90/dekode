import React, {Component, Fragment} from 'react'
// import Address from 'containers/Address/List';
// import Details from 'containers/Address/Details';

import { Route } from 'react-router';
import ConnectedSwitch from 'components/ConnectedSwitch';
import { getApplicationRoutes } from 'config/routes';

class App extends Component {
    render() {
        const routes = getApplicationRoutes();

        const router = (
            <ConnectedSwitch>
                {
                    routes.map((route, index) => (
                        <Route key={index} exact={route.exact} path={route.path} name={route.name} component={route.component}/>
                    ))
                }

                <Route render={() => (<div>Not existing</div>)} />
            </ConnectedSwitch>
        );

        return (
            <Fragment>
                { router }
            </Fragment>
        );
    }
}

export default App;
