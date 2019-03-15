/**
 * Created by vladtomsa on 10/01/2019
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import compose from 'lodash/fp/compose';
import cx from 'classnames';
import {getAddress} from 'actions/address';
import {getTransactionsByAddress, getAddressFlow, getAddressFlowBefore, getAddressFlowAfter} from 'actions/transaction';
import Loading from 'components/Loading';
import {addressesConstants} from 'constants/address';
import {transactionConstants} from 'constants/transaction';
import {withStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Back from 'mdi-material-ui/ChevronLeft';
import Pound from 'mdi-material-ui/Pound';
import Header from './Header';
import Next from '@material-ui/icons/NavigateNext';
import Previous from '@material-ui/icons/NavigateBefore';
import SourcesTimeline from './SourcesTimeline';
import TransactionsList from './TransactionsList';
import TransactionsFlow from './TransactionsFlow';
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
    // LOGS: {
    //     value: 3,
    //     name: 'Logs'
    // }
};

class AddressDetails extends Component {

    state = {
        currentTab: TABS.SOURCES.value,
    };

    onTabChange = (index) => {
        const {selectedAddress: {address}, getAddressFlow} = this.props;
        if (index === TABS.FLOW.value) {
            getAddressFlow(address);
        }
        this.setState({currentTab: index});
    };

    getCurrentTabContent = () => {
        const {selectedAddress, transactions, chartData, isLoading} = this.props;
        const {currentTab} = this.state;

        switch (currentTab) {
            case TABS.SOURCES.value:
                return <SourcesTimeline sources={selectedAddress.sources}/>;
            case TABS.TRANSACTIONS.value:
                return <TransactionsList
                    selectedAddress={selectedAddress.address}
                    transactions={transactions}
                    isLoading={isLoading && isLoading[transactionConstants.GET_ADDRESS_TRANSACTIONS_REQUEST]}
                />;
            case TABS.FLOW.value:
                return <TransactionsFlow
                    analysedAddress={selectedAddress.address}
                    transactions={transactions}
                    chartData={chartData}
                    isLoading={isLoading && isLoading[transactionConstants.GET_ADDRESS_FLOW_REQUEST]}
                />;
            default:
                return <pre>{JSON.stringify(selectedAddress, null, 2)}</pre>;
        }
    };

    render() {
        const {classes, isLoading, selectedAddress, getAddressFlowBefore, getAddressFlowAfter} = this.props;
        const {currentTab} = this.state;

        if (isLoading && isLoading[addressesConstants.GET_ADDRESS_BY_ADDRESS_REQUEST]) {
            return <Loading message="Fetching address details"/>
        }

        if (!selectedAddress) return <Loading/>;

        return (
            <div>
                <Paper square elevation={8} className={classes.banner}>
                    <CardContent>
                        <div className={classes.header}>
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
                        </div>
                        <div className="flex wrap-content">
                            {
                                selectedAddress.tags.length
                                && selectedAddress.tags.map((tag, index) => (
                                    <Chip
                                        avatar={
                                            <Avatar>
                                                <Pound/>
                                            </Avatar>
                                        }
                                        className={classes.chip}
                                        key={index}
                                        label={tag}
                                    />
                                ))
                            }
                        </div>

                        <Header addressInfo={selectedAddress}/>
                    </CardContent>
                </Paper>

                <div className={classes.tabsContainer}>
                    <Grid container spacing={16} justify="center">
                        <Grid item xs={11}>
                            <div>
                                <div
                                    className={classes.tabHeader}
                                >
                                    <Tabs
                                        value={currentTab}
                                        onChange={(_, value) => this.onTabChange(value)}
                                        indicatorColor="secondary"
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
                                    {
                                        currentTab === TABS.FLOW.value && <div className={cx('flex', 'justify-end')}>
                                            <Button
                                                className={classes.button}
                                                onClick={getAddressFlowBefore}
                                            >
                                                <Previous/>
                                            </Button>
                                            <Button
                                                className={classes.button}
                                                onClick={getAddressFlowAfter}
                                            >
                                                <Next/>
                                            </Button>
                                        </div>

                                    }
                                </div>

                                {this.getCurrentTabContent()}
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const {getAddress, match: {params: {address}}, getTransactionsByAddress} = this.props;

        getAddress(address);

        getTransactionsByAddress(address);

    }
}

const mapStateToProps = (state) => {
    const {address, transaction} = state;
    return {
        isLoading: {...address.isLoading, ...transaction.isLoading},
        selectedAddress: address.selectedAddress,
        transactions: transaction.transactions,
        chartData: transaction.chartData,
    }
};

const mapDispatchToProps = {
    getAddress,
    getTransactionsByAddress,
    getAddressFlow,
    getAddressFlowBefore,
    getAddressFlowAfter,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(AddressDetails);
