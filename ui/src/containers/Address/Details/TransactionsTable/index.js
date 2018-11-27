/**
 * Created by vladtomsa on 27/11/2018
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Income from 'mdi-material-ui/ArrowDownBoldCircle';
import Outcome from 'mdi-material-ui/ArrowUpBoldCircle';
import moment from 'moment';

import { DATE_TIME_FORMAT } from '../../../../constants';
import styles from '../styles';

class TransactionsTable extends Component {
  state = {
    sentTransactions: true,
    receivedTransactions: true,
    fromAddress: '',
    toAddress: '',
    minValue: null,
    maxValue: null,
  };

  onFilterChange = (name) => (value) => {
    this.setState({ [name]: value })
  };

  render() {
    const { address, classes, transactions } = this.props;
    const { fromAddress, receivedTransactions, sentTransactions, toAddress } = this.state;

    return (
      <div>
        <CardContent>
          <Paper elevation={6} className={classes.filter}>
            <CardContent>
              <Typography variant="h5" color="textPrimary">
                Filter
              </Typography>

              <Grid container spacing={16}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="From"
                    fullWidth
                    disableUnderline
                    value={fromAddress}
                    onChange={(ev) => this.onFilterChange('fromAddress')(ev.target.value)}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="From"
                    fullWidth
                    disableUnderline
                    value={toAddress}
                    onChange={(ev) => this.onFilterChange('toAddress')(ev.target.value)}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Type</FormLabel>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={sentTransactions}
                            onChange={(ev) => this.onFilterChange('sentTransactions')(ev.target.checked)}
                          />
                        }
                        label="Sent"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={receivedTransactions}
                            onChange={(ev) => this.onFilterChange('receivedTransactions')(ev.target.checked)}
                          />
                        }
                        label="Received"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Paper>
        </CardContent>

        <br />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell numeric>Type</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>TX Hash</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell numeric>Value (ETH)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions
              .filter((trs) => {
                let isValid = true;

                const { from, to } = trs;

                if (!from.toLowerCase().includes(fromAddress.toLowerCase())) return false;

                if (!to.toLowerCase().includes(toAddress.toLowerCase())) return false;

                if (!receivedTransactions && to.toLowerCase() === address) return false;

                if (!sentTransactions && from.toLowerCase() === address) return false;

                return isValid;
              })
              .map(transaction => {
                return (
                  <TableRow key={transaction.hash} className={classes.tableRow} hover>
                    <TableCell numeric>
                      {
                        transaction.from.toLowerCase() === address
                          ? <Outcome className={classes.outcome}/>
                          : <Income className={classes.income}/>
                      }
                    </TableCell>
                    <TableCell className={transaction.from.toLowerCase() === address ? classes.ownAddress : ''}>
                      <Link to={`/address/${transaction.from}`}>
                        <Typography color="primary">
                          { transaction.from }
                        </Typography>
                      </Link>
                    </TableCell>
                    <TableCell className={transaction.to.toLowerCase() === address ? classes.ownAddress : ''}>
                      <Link to={`/address/${transaction.to}`}>
                        <Typography color="primary">
                          { transaction.to }
                        </Typography>
                      </Link>
                    </TableCell>
                    <TableCell>{ transaction.hash }</TableCell>
                    <TableCell>{ moment(transaction.timeStamp * 1000).format(DATE_TIME_FORMAT) }</TableCell>
                    <TableCell numeric>{ transaction.value }</TableCell>
                  </TableRow>
                );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

TransactionsTable.propTypes = {
  address: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  transactions: PropTypes.array.isRequired,
};

export default withStyles(styles)(TransactionsTable);
