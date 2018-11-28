/**
 * Created by vladtomsa on 26/11/2018
 */
import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Typography from '@material-ui/core/Typography';
import {getAddressDetails, getAddressTransactionFlow, selectAddress} from '../../../actions/addresses';
import Loading from '../../../components/Loading';
import TransactionsFlow from '../../../components/Addresses/Reports/TransactionsFlow';
import Activity from './Activity';
import AddressDetailsHeader from './Header';
import TransactionsTable from './TransactionsTable';
import styles from './styles';

const TABS = {
  transactions: 0,
  activity: 1,
  'flow chart': 2,
};

class AddressDetails extends Component {
  state = {
    currentTab: TABS.transactions,
  };

  componentDidMount() {
    const {
      selectAddress,
      match: {params: {address}}
    } = this.props;

    selectAddress(address);

    this.getAddressDetails({ address });
    this.getAddressTransactionFlow({address});
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    const { match, selectAddress } = this.props;
    const oldAddress = match.params.address;

    const newAddress = newProps.match.params.address;

    if (oldAddress !== newAddress) {
      selectAddress(newAddress);

      this.getAddressDetails({address: newAddress});
      this.getAddressTransactionFlow({address: newAddress});
    }
  }

  getAddressDetails = (params) => {
    const {
      getAddressDetails,
      selectedAddress,
      blockchainId,
    } = this.props;

    getAddressDetails({
      address: params.address || selectedAddress,
      blockchainId: params.blockchainId || blockchainId,
    });
  };

  getAddressTransactionFlow = (params) => {
    const {
      getAddressTransactionFlow,
      selectedAddress,
      levelsBefore,
      levelsAfter,
      blockchainId,
    } = this.props;

    getAddressTransactionFlow({
      address: params.address || selectedAddress,
      levelsBefore: params.levelsBefore || levelsBefore,
      levelsAfter: params.levelsAfter || levelsAfter,
      blockchainId: params.blockchainId || blockchainId,
    });
  };

  handleTabChange = (event, value) => {
    this.setState({ currentTab: value });
  };

  render() {
    const {
      addressDetails,
      classes,
      goToAddressDetails,
      transactionsFlow,
      selectedAddress,
      levelsBefore,
      levelsAfter,
      blockchainId,
      isLoading,
    } = this.props;

    const { currentTab } = this.state;

    if (isLoading) return <Loading/>;

    return (
      <div>
        <CardContent>
          <br />
          <Typography variant="h5" color="textPrimary">
            {selectedAddress}
          </Typography>
          <br />

          { isLoading }

          <div>
            {
              !!addressDetails
                ? (
                  <AddressDetailsHeader
                    address={selectedAddress}
                    balance={addressDetails.balance}
                  />

                )
                : null
            }
          </div>
        </CardContent>

        {
          !!addressDetails
            ? (
              <Fragment>
                <br />
                <AppBar position="static" color="inherit">
                  <Tabs
                    value={currentTab}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    scrollable
                    scrollButtons="auto"
                  >
                    {
                      Object.keys(TABS)
                        .map((key) => {
                          return (
                            <Tab key={key} label={key} />
                          );
                        })
                    }
                  </Tabs>
                </AppBar>

                {
                  currentTab === TABS.transactions
                    ? (
                      <Paper>
                        <TransactionsTable
                          address={selectedAddress.toLowerCase()}
                          transactions={addressDetails.transactions}
                        />
                      </Paper>
                    )
                    : null
                }

                {
                  currentTab === TABS.activity
                    ? (
                      <Paper>
                        <Activity
                          address={selectedAddress.toLowerCase()}
                          transactions={addressDetails.transactions}
                        />
                      </Paper>
                    )
                    : null
                }

                {
                  currentTab === TABS["flow chart"] && transactionsFlow
                    ? (
                      <Paper elevation={8} className={classes.transactionsFlow}>
                        <div className={`flex wrap-content ${classes.transactionsFlowHeader}`}>
                          <Typography variant="h4" className="fill-flex">
                            Transactions flow
                          </Typography>

                          <FormControl>
                            <InputLabel>
                              Levels Before
                            </InputLabel>
                            <Select
                              fullWidth
                              value={levelsBefore}
                              onChange={(ev) => this.getAddressTransactionFlow({ levelsBefore: ev.target.value })}
                              disableUnderline
                              inputProps={{
                                label: 'Levels before'
                              }}
                            >
                              <MenuItem value={0}>None</MenuItem>
                              <MenuItem value={1}>One</MenuItem>
                              <MenuItem value={2}>Two</MenuItem>
                              {/*<MenuItem value={3}>Three</MenuItem>*/}
                            </Select>
                          </FormControl>

                          &nbsp;
                          &nbsp;

                          <FormControl>
                            <InputLabel>
                              Levels after
                            </InputLabel>
                            <Select
                              value={levelsAfter}
                              onChange={(ev) => this.getAddressTransactionFlow({ levelsAfter: ev.target.value })}
                              disableUnderline
                              inputProps={{
                                label: 'Levels after',
                              }}
                            >
                              <MenuItem value={0}>None</MenuItem>
                              <MenuItem value={1}>One</MenuItem>
                              <MenuItem value={2}>Two</MenuItem>
                              {/*<MenuItem value={3}>Three</MenuItem>*/}
                            </Select>
                          </FormControl>
                        </div>

                        <TransactionsFlow
                          analysedAddress={selectedAddress}
                          chartData={transactionsFlow}
                          onAddressChange={goToAddressDetails}
                        />
                      </Paper>
                    )
                    : null
                }
              </Fragment>
            )
            : null
        }
      </div>
    )
  }
}

AddressDetails.propTypes = {};

const mapStateToProps = (state) => {
  return {
    addressDetails: state.addresses.addressDetails,
    selectedAddress: state.addresses.selectedAddress,
    transactionsFlow: state.addresses.transactionsFlow,
    levelsBefore: state.addresses.levelsBefore,
    levelsAfter: state.addresses.levelsAfter,
    blockchainId: state.addresses.blockchainId,
    isLoading: state.addresses.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAddressDetails: (params) => dispatch(getAddressDetails(params)),
    getAddressTransactionFlow: (params) => dispatch(getAddressTransactionFlow(params)),
    goToAddressDetails: (address) => dispatch(push(`/address/${address}`)),
    selectAddress: (address) => dispatch(selectAddress(address)),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)(AddressDetails);

export default withStyles(styles)(withConnect);
