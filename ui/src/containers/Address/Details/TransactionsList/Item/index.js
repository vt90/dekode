import React from 'react';
import compose from 'lodash/fp/compose';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Bitcoin from 'mdi-material-ui/Bitcoin';
import Income from 'mdi-material-ui/ArrowDownBoldCircle';
import Outcome from 'mdi-material-ui/ArrowUpBoldCircle';
import moment from 'moment';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

const TransactionItem = ({
                             classes,
                             selectedAddress,
                             transaction,
                         }) => {
    const cardHeaderProps = {
        title: `Tx ID: ${transaction.txid}`,
        titleTypographyProps: {
            className: 'break-all',
        },
    };

    const timestamp = moment(transaction.timestamp * 1000);

    if (transaction.income) {
        cardHeaderProps.avatar = <Income className={classes.income}/>;
        cardHeaderProps.subheader = `Received on ${timestamp}`;
    } else {
        cardHeaderProps.avatar = <Outcome className={classes.outcome}/>;
        cardHeaderProps.subheader = `Sent on ${timestamp}`;
    }

    const renderAddress = (txAddress, index) => {
        return (
            <Typography
                key={`${txAddress} - ${index}`}
                className="break-all"
                color={txAddress === selectedAddress ? 'textPrimary' : 'textSecondary'}
                variant={txAddress === selectedAddress ? 'body1' : 'body2'}
            >
                {txAddress}
            </Typography>
        );
    };

    return (
        <Paper className={classes.root} elevation={6}>
            <CardHeader {...cardHeaderProps}/>

            <Divider/>

            <CardContent>
                <Grid container spacing={16}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="caption" color="textSecondary">
                            From
                        </Typography>

                        {
                            transaction.vin.map(({address}, index) => renderAddress(address, index))
                        }
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="caption" color="textSecondary">
                            To
                        </Typography>

                        {
                            transaction.vout.map(({address}, index) => renderAddress(address, index))
                        }
                    </Grid>

                </Grid>
            </CardContent>

            <CardActions className="flex justify-end">
                <Typography variant="subheading" className="flex align-center">
                    {transaction.value}
                    &nbsp;
                    <Bitcoin/>
                </Typography>
            </CardActions>
        </Paper>
    );
};

export default compose(
    withStyles(styles),
)(TransactionItem);
