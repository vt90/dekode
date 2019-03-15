import React, {Fragment} from 'react';
import compose from 'lodash/fp/compose';
import withStyles from '@material-ui/core/styles/withStyles';
import TransactionItem from './Item';
// import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import Loading from 'components/Loading';
import styles from './styles';

const TransactionsList = ({
                              classes,
                              selectedAddress,
                              transactions,
                              isLoading,
                          }) => {
    if (isLoading) {
        return <Loading message="Fetching transactions"/>
    }

    if (!transactions) return null;

    if (!transactions.length) return (
        <Typography variant="body1" color="textSecondary">
            Address has no transactions
        </Typography>
    );

    return (
        <Fragment>
            {
                transactions.map((transaction) => {
                    return (
                        <TransactionItem
                            key={transaction.txid}
                            selectedAddress={selectedAddress}
                            transaction={transaction}
                        />
                    )
                })
            }
        </Fragment>
    );
};

export default compose(
    withStyles(styles)
)(TransactionsList);
