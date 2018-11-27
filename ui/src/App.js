import React, {Component, Fragment} from 'react';
import {Route} from 'react-router';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {push} from 'react-router-redux';
import * as notificationActions from './actions/notifications';
import Layout from './components/Layout';
import Notification from './components/Notification';
import ConnectedSwitch from './components/ConnectedSwitch';
import {getApplicationRoutes} from './config/routes';

class App extends Component {
  render() {
    const {
      goToAddressDetails, selectedAddress, notification, onNotificationClose,
    } = this.props;

    const routes = getApplicationRoutes();

    const router = (
      <ConnectedSwitch>
        {
          routes.map((route, index) => (
            <Route key={index} exact={route.exact} path={route.path} name={route.name}
                   component={route.component}/>
          ))
        }

        <Route render={() => (<div>Not existing</div>)}/>
      </ConnectedSwitch>
    );

    return (
      <Fragment>
        {
          !!(notification)
            ? (
              <Notification
                notification={notification}
                onNotificationClose={onNotificationClose}
              />
            )
            : null
        }

        <Layout selectedAddress={selectedAddress} goToAddressDetails={goToAddressDetails}>
          {router}
        </Layout>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedAddress: state.addresses.selectedAddress,
    notification: state.notification.notification,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onNotificationClose: () => dispatch(notificationActions.onNotificationClose()),
  goToAddressDetails: (address) => dispatch(push(`/address/${address}`)),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps)(App);

export default withRouter(withRedux);
