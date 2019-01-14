/**
 * Created by vladtomsa on 10/01/2019
 */
import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import compose from 'lodash/fp/compose';
import {getAddress} from 'actions/address';
import Loading from 'components/Loading';
import {addressesConstants, ADDRESS_TYPES} from 'constants/address';
import {withStyles} from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Back from 'mdi-material-ui/ChevronLeft';
import styles from './styles';

const TABS = {
    SOURCES: {
        value: 0,
        name: 'Sources',
    },
    TRANSACTIONS: {
        value: 1,
        name: 'Transactions'
    },
    FLOW: {
        value: 2,
        name: 'Flow',
    },
    LOGS: {
        value: 3,
        name: 'Logs'
    }
};

class AddressDetails extends Component {

    state = {
        currentTab: TABS.SOURCES.value,
    };

    onTabChange = (index) => {
        this.setState({currentTab: index});
    };

    render() {
        const {classes, isLoading, selectedAddress} = this.props;
        const {currentTab} = this.state;

        if (isLoading && isLoading[addressesConstants.GET_ADDRESS_BY_ADDRESS_REQUEST]) {
            return <Loading message="Fetching address details"/>
        }

        if (!selectedAddress) return <Loading/>;

        return (
            <Fragment>
                <Paper square elevation={8} className={classes[selectedAddress.flag]}>
                    <CardContent className={classes.header}>
                        <Button
                            component={Link}
                            to="/"
                            className={classes.backButton}
                        >
                            <Back/>&nbsp;Back to addresses
                        </Button>

                        <Typography variant="h4" gutterBottom>
                            {selectedAddress.address}
                        </Typography>

                        <Typography variant="subtitle2">
                            {selectedAddress.type === ADDRESS_TYPES.UNKNOWN ? 'Unknown' : selectedAddress.type}&nbsp;address
                        </Typography>
                    </CardContent>
                </Paper>

                <div className={classes.tabsContainer}>
                    <Grid container spacing={16} justify="center">
                        <Grid item xs={11}>
                            <Paper elevation={8}>
                                <AppBar position="static" color="default">
                                    <Tabs
                                        value={currentTab}
                                        onChange={(_, value) => this.onTabChange(value)}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        variant="scrollable"
                                        scrollButtons="auto"
                                    >
                                        {
                                            Object.keys(TABS).map(key => {
                                                return (
                                                    <Tab key={key} label={TABS[key].name}/>
                                                );
                                            })
                                        }
                                    </Tabs>
                                </AppBar>

                                <pre>{JSON.stringify(selectedAddress, null, 2)}</pre>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Fragment>
        );
    }

    componentDidMount() {
        const {getAddress, match: {params: {address}}} = this.props;

        getAddress(address);
    }
}

const mapStateToProps = (state) => {
    const {address} = state;
    return {
        isLoading: address.isLoading,
        selectedAddress: address.selectedAddress,
    }
};

const mapDispatchToProps = {
    getAddress
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(AddressDetails);
