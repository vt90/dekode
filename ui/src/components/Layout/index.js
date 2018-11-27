/**
 * Created by vladtomsa on 26/09/2018
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Dashboard from 'mdi-material-ui/ViewDashboard';
import Incognito from 'mdi-material-ui/Incognito';
import styles from './styles';

class Layout extends Component {
  state = {
    searchAddress: '',
  };

  componentDidMount() {
    const {selectedAddress} = this.props;

    this.setState({searchAddress: selectedAddress})
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    const {selectedAddress} = this.props;

    if (
      newProps
      && newProps.selectedAddress
      && selectedAddress !== newProps.selectedAddress
    ) {
      this.setState({searchAddress: newProps.selectedAddress});
    }
  }


  render() {
    const {
      children,
      classes,
      goToAddressDetails,
    } = this.props;

    const {searchAddress} = this.state;

    return (
      <div>
        <AppBar position="static" color="default" className={classes.toolbar}>
          <Toolbar className="wrap-content">
            <Typography variant="h6" color="primary" className="flex align-center">
              <Incognito/>&nbsp;DEKODE
            </Typography>
            &nbsp;&nbsp;
            <NavLink to="/">
              <Typography variant="subtitle1" color="textSecondary" className="flex align-center">
                <Dashboard/> &nbsp; Dashboard
              </Typography>
            </NavLink>

            <span className="fill-flex">&nbsp;</span>

            <Paper elevation={4} className={`flex align-center ${classes.searchForm}`}>
              <form
                onSubmit={(ev) => {
                  ev.preventDefault();
                  goToAddressDetails(searchAddress);
                }}
                className="fill-flex"
              >
                <TextField
                  style={{ padding: '6px 12px' }}
                  fullWidth
                  value={searchAddress}
                  onChange={(ev) => this.setState({searchAddress: ev.target.value})}
                  placeholder="Search for address"
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </form>
              <Button variant="contained" color="primary" type="submit">
                Search
              </Button>
            </Paper>
          </Toolbar>
        </AppBar>

        {children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  selectedAddress: PropTypes.any,
  goToAddressDetails: PropTypes.func.isRequired,
};

export default withStyles(styles)(Layout);
