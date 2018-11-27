/**
 * Created by vladtomsa on 27/11/2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Income from 'mdi-material-ui/ArrowDownBoldCircle';
import Outcome from 'mdi-material-ui/ArrowUpBoldCircle';
import Transactions from 'mdi-material-ui/PollBox';
import Wallet from 'mdi-material-ui/Wallet';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

const AddressDetailsHeader = ({ address, balance, classes }) => {
  return (
    <Grid container spacing={24}>
      <Grid item xs={12} sm={6} md={3}>
        <Paper className={classes.accountBalanceCard} elevation={6}>
          <div className={classes.accountBalanceHeader}>
            <Paper className={classes.totalBalance} elevation={4}>
              <Wallet />
            </Paper>

            <div className={classes.accountBalanceContent}>
              <Typography variant="caption" color="textSecondary" gutterBottom>
                Total balance
              </Typography>

              <Typography variant="title" gutterBottom>
                { balance.final_balance }
              </Typography>
            </div>
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper className={classes.accountBalanceCard} elevation={6}>
          <div className={classes.accountBalanceHeader}>
            <Paper className={classes.totalIncome} elevation={4}>
              <Income />
            </Paper>

            <div className={classes.accountBalanceContent}>
              <Typography variant="caption" color="textSecondary" gutterBottom>
                Total received
              </Typography>

              <Typography variant="title" gutterBottom>
                { balance.total_received }
              </Typography>
            </div>
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper className={classes.accountBalanceCard} elevation={6}>
          <div className={classes.accountBalanceHeader}>
            <Paper className={classes.totalOutcome} elevation={4}>
              <Outcome />
            </Paper>

            <div className={classes.accountBalanceContent}>
              <Typography variant="caption" color="textSecondary" gutterBottom>
                Total sent
              </Typography>

              <Typography variant="title" gutterBottom>
                { balance.total_sent }
              </Typography>
            </div>
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper className={classes.accountBalanceCard} elevation={6}>
          <div className={classes.accountBalanceHeader}>
            <Paper className={classes.totalTransactions} elevation={4}>
              <Transactions />
            </Paper>

            <div className={classes.accountBalanceContent}>
              <Typography variant="caption" color="textSecondary" gutterBottom>
                Transactions
              </Typography>

              <Typography variant="title" gutterBottom>
                { balance.final_n_tx }
              </Typography>
            </div>
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
};

AddressDetailsHeader.propTypes = {
  address: PropTypes.string.isRequired,
  balance: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddressDetailsHeader);
