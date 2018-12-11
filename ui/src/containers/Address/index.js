import React from 'react';
import {connect} from 'react-redux';
import compose from 'lodash/fp/compose';
import {
    getAddresses,
    verifyAddress
} from 'actions/address';
import List from 'components/Address/List';
import Button from '@material-ui/core/Button';

class Address extends React.Component {

    fetchVerifiedAddresses = () => {
        this.props.getAddresses(true);
    };

    fetchUnverifiedAddresses = () => {
        this.props.getAddresses(false);
    };

    verifyAddress = async (e) => {
        const _id = e.currentTarget.getAttribute('data-id');
        await this.props.verifyAddress(_id);
        this.fetchUnverifiedAddresses();
    };

    render() {
        return (
            <div>
                <Button
                    onClick={this.fetchVerifiedAddresses}
                    color={"primary"}
                >
                    fetch verified addresses
                </Button>
                <Button
                    onClick={this.fetchUnverifiedAddresses}
                    color={"primary"}
                >
                    fetch unverified addresses
                </Button>
                <List
                    addresses={this.props.addresses}
                    isVerified={this.props.isVerified}
                    verifyAddress={this.verifyAddress}
                />
            </div>
        );
    }

    componentDidMount() {
        this.props.getAddresses();
    }

    componentWillMount() {

    }

}

const mapStateToProps = ({address}) => ({
    addresses: address.addresses,
    isVerified: address.isVerified,
});

const mapDispatchToProps = {
    getAddresses,
    verifyAddress,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(Address);
