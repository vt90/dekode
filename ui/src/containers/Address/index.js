import React from 'react';
import {connect} from 'react-redux';
import compose from 'lodash/fp/compose';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import {
    getAddresses,
    verifyAddress
} from 'actions/address';
import Header from 'components/Address/Header';
import List from 'components/Address/List';
import styles from './styles';

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
        const { classes } = this.props;
        return (
            <React.Fragment>
                <button
                    onClick={this.fetchVerifiedAddresses}
                    color={"primary"}
                >
                    fetch verified addresses
                </button>
                <button
                    onClick={this.fetchUnverifiedAddresses}
                    color={"primary"}
                >
                    fetch unverified addresses
                </button>
                <section className={classes.headerSection}>
                    hello
                </section>

                <Grid container justify="center">
                    <Grid item xs={11} md={10} lg={9}>
                        <Paper
                            className={classes.addressListSection}
                            component="section"
                            elevation={12}
                        >
                            <Header/>
                            <List
                                addresses={this.props.addresses}
                                isVerified={this.props.isVerified}
                                verifyAddress={this.verifyAddress}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
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
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(Address);
