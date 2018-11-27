/**
 * Created by vladtomsa on 26/11/2018
 */
import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {push} from 'react-router-redux';
import Paper from '@material-ui/core/Paper';
import {getAddresses} from '../../actions/addresses';
import {addressesConstants} from '../../constants/addresses';
import AddressList from '../../components/Addresses/List';
import Loading from '../../components/Loading';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getAddresses();
  }

  onAddressSelect = (addressInfo) => {
    this.props.goToAddressDetails(addressInfo.name);
  };

  render() {
    const {addressInfoList, isLoading} = this.props;
    return (
      <Fragment>
        {
          isLoading === addressesConstants.ON_GET_ADDRESSES_INIT
            ? <Loading/>
            : (
              <Paper>
                <AddressList
                  addressInfoList={addressInfoList}
                  onSelect={this.onAddressSelect}
                />
              </Paper>
            )
        }
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
  addressInfoList: PropTypes.array.isRequired,
  getAddresses: PropTypes.func.isRequired,
  isLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    addressInfoList: state.addresses.addressInfoList,
    isLoading: state.addresses.isLoading,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAddresses: () => dispatch(getAddresses()),
    goToAddressDetails: (address) => dispatch(push(`/address/${address}`)),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default withConnect;
