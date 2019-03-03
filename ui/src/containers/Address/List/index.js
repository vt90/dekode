import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import compose from 'lodash/fp/compose';
import Add from 'mdi-material-ui/PlusCircleOutline';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
    createAddresses,
    getAddresses,
    getAddressesSummary,
    toggleCreateOpen,
    putAddressFilterValues,
    getAddressesNextPage,
    getAddressesPreviousPage,
    setAddressAddressPageHistory,
} from 'actions/address';
import Create from 'components/Address/Create/index';
import List from 'components/Address/List/index';
import SummaryReport from 'components/Address/Reports/Summary/index';
import Loading from 'components/Loading/index';
import {addressesConstants, addressInitialFilterValues} from 'constants/address';
import styles from './styles';

const initialCreateValues = {
    addresses: [''],
    contactInfo: {},
};

class Address extends Component {

    getAddresses = (id, next) => {
        const {filterFormValues, getAddresses, setAddressAddressPageHistory} = this.props;
        setAddressAddressPageHistory([]);
        getAddresses({
            ...filterFormValues,
            id,
            next,
        });
    };

    getNextPage = () => {
        const {addresses} = this.props;
        const {filterFormValues, getAddressesNextPage} = this.props;
        const id = addresses[addresses.length - 1]._id;
        const next = true;
        getAddressesNextPage({
            ...filterFormValues,
            id,
            next,
        });
    };

    getPreviousPage = () => {
        const {filterFormValues, getAddressesPreviousPage} = this.props;
        const next = true;
        getAddressesPreviousPage({
            ...filterFormValues,
            next,
        });
    };

    onSubmitReport = ({addresses, contactInfo: {firstName, lastName, email}, link, text}) => {
        const sourceName = [firstName, lastName, email].filter(el => !!el).join(' ');

        const data = {
            addresses,
            link,
            sourceName,
            text,
        };

        this.props.createAddresses(data);

        this.props.getAddressesSummary();
    };

    render() {
        const {
            classes,
            isCreateOpen,
            isLoading,
            hasNext,
            hasPrevious,
            toggleCreateOpen,
            nrOfAddresses,
            nrOfBlackListedAddresses,
            nrOfGrayListedAddresses,
            nrOfVerifiedAddresses,
            nrOfSources,
            filterFormValues,
            putAddressFilterValues,
        } = this.props;

        return (
            <Fragment>
                <section className={classes.mainSection}>
                    <Grid container spacing={24} justify="center" alignItems="center">
                        <Grid item xs={11} lg={5}>
                            <Grid
                                container
                                justify="center"
                                alignItems="center"
                            >
                                <Grid
                                    item
                                    xs={11}
                                    className={classes.textContent}
                                >
                                    <Typography variant="h2" gutterBottom>
                                        DEKODE
                                    </Typography>

                                    <Typography variant="h5">
                                        Using proprietary technologies and a total
                                        of <strong>{nrOfSources} sources</strong>, and
                                        counting, DEKODE DEVELOPS SOLUTIONS FOR MONITORING, ANALYZING AND TRACKING
                                        CRYPTOCURRENCY FLOWS
                                        across multiple blockchains, providing actionable insight on the whole
                                        cryptocurrency ecosystem.
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={11}
                                >
                                    {
                                        isLoading && isLoading[addressesConstants.GET_ADDRESS_SUMMARY_REQUEST]
                                            ? <Loading message="Generating summary"/>
                                            : (
                                                <SummaryReport
                                                    nrOfAddresses={nrOfAddresses}
                                                    nrOfBlackListedAddresses={nrOfBlackListedAddresses}
                                                    nrOfGrayListedAddresses={nrOfGrayListedAddresses}
                                                    nrOfVerifiedAddresses={nrOfVerifiedAddresses}
                                                />
                                            )
                                    }
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={11} lg={7} xl={5}>
                            {
                                isLoading && isLoading[addressesConstants.GET_ADDRESS_REQUEST]
                                    ? <Loading message="Fetching addresses"/>
                                    : (
                                        <Paper
                                            component="section"
                                            elevation={8}
                                        >
                                            <List
                                                initialFilterValues={filterFormValues}
                                                onFilterSubmit={() => this.getAddresses()}
                                                putAddressFilterValues={putAddressFilterValues}
                                                addresses={this.props.addresses}
                                                pageHistory={this.props.pageHistory}
                                                isVerified={this.props.isVerified}
                                                verifyAddress={this.verifyAddress}
                                                hasNext={hasNext}
                                                hasPrevious={hasPrevious}
                                                getNextPage={this.getNextPage}
                                                getPreviousPage={this.getPreviousPage}
                                            />
                                        </Paper>
                                    )
                            }
                        </Grid>
                    </Grid>
                </section>


                <Button
                    variant="contained"
                    color="primary"
                    className={`fab ${classes.fab}`}
                    onClick={() => toggleCreateOpen(true)}
                >
                    <Add/>&nbsp;Report address
                </Button>

                {
                    isCreateOpen
                        ? (
                            <Create
                                onSubmit={this.onSubmitReport}
                                initialValues={initialCreateValues}
                                onClose={() => toggleCreateOpen(false)}
                            />
                        )
                        : null
                }
            </Fragment>
        );
    }

    componentDidMount() {
        const {filterFormValues, getAddresses, getAddressesSummary} = this.props;
        getAddresses({...filterFormValues});

        getAddressesSummary();
    }

    componentWillUnmount() {
        const {putAddressFilterValues} = this.props;

        putAddressFilterValues(addressInitialFilterValues);
        setAddressAddressPageHistory([]);
    }

}

const mapStateToProps = (state) => {
    const {address} = state;
    return {
        addresses: address.addresses,
        hasNext: address.hasNext,
        hasPrevious: address.hasPrevious,
        isVerified: address.isVerified,
        isLoading: address.isLoading,
        isCreateOpen: address.isCreateOpen,
        nrOfAddresses: address.nrOfAddresses,
        nrOfBlackListedAddresses: address.nrOfBlackListedAddresses,
        nrOfGrayListedAddresses: address.nrOfGrayListedAddresses,
        nrOfVerifiedAddresses: address.nrOfVerifiedAddresses,
        nrOfSources: address.nrOfSources,
        filterFormValues: address.filterValues,
        pageHistory: address.pageHistory,
    }
};

const mapDispatchToProps = {
    createAddresses,
    getAddresses,
    getAddressesSummary,
    toggleCreateOpen,
    putAddressFilterValues,
    getAddressesNextPage,
    getAddressesPreviousPage,
    setAddressAddressPageHistory,
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(Address);
