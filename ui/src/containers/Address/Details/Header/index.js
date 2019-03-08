/**
 * Created by vladtomsa on 2019-03-08
 */
import React from 'react';
import cx from 'classnames';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AccountTie from 'mdi-material-ui/AccountTie';
import Bitcoin from 'mdi-material-ui/Bitcoin';
import Incognito from 'mdi-material-ui/Incognito';
import ShieldCheck from 'mdi-material-ui/ShieldCheck';
import ShiledRemove from 'mdi-material-ui/ShieldRemove';
import Wallet from 'mdi-material-ui/Wallet';
import {withStyles} from '@material-ui/core/styles';
import {
    ADDRESS_TYPES,
    CREDIBILITY_DESCRIPTIONS,
    CREDIBILITY_TYPES,
    FLAG_DESCRIPTIONS,
} from 'constants/address';
import styles from './styles';

const AddressDetailsHeader = ({ addressInfo, classes}) => {
    const {
        amount,
        credibility,
        flag,
        type,
    } = addressInfo;

    return (
        <div className={classes.root}>
            <Grid container spacing={24}>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={6} className={classes.addressCard}>
                        <Paper className={cx(classes.cardIcon, classes.totalBalance)} elevation={4}>
                            <Wallet/>
                        </Paper>
                        <div className={classes.accountBalanceContent}>
                            <Typography variant="caption" color="textSecondary" gutterBottom>
                                Total balance
                            </Typography>

                            <Typography variant="subheading" gutterBottom className="flex align-center justify-end">
                                {amount}
                                <Bitcoin/>
                            </Typography>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={6} className={classes.addressCard}>
                        <Paper className={cx(classes.cardIcon, classes.threat)} elevation={4}>
                            <Incognito/>
                        </Paper>
                        <div className={classes.accountBalanceContent}>
                            <Typography variant="caption" color="textSecondary" gutterBottom>
                                Threat
                            </Typography>

                            <Typography variant="subheading" gutterBottom>
                                { FLAG_DESCRIPTIONS[flag] }
                            </Typography>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={6} className={classes.addressCard}>
                        <Paper className={cx(classes.cardIcon, classes.credibility)} elevation={4}>
                            {
                                credibility === CREDIBILITY_TYPES.VERIFIED
                                    ? <ShieldCheck />
                                    : <ShiledRemove />
                            }
                        </Paper>
                        <div className={classes.accountBalanceContent}>
                            <Typography variant="caption" color="textSecondary" gutterBottom>
                                Verified
                            </Typography>

                            <Typography variant="subheading" gutterBottom>
                                { CREDIBILITY_DESCRIPTIONS[credibility] }
                            </Typography>
                        </div>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={6} className={classes.addressCard}>
                        <Paper className={cx(classes.cardIcon, classes.addressType)} elevation={4}>
                            <AccountTie />
                        </Paper>
                        <div className={classes.accountBalanceContent}>
                            <Typography variant="caption" color="textSecondary" gutterBottom>
                                Address type
                            </Typography>

                            <Typography variant="subheading" gutterBottom>
                                {
                                    type === ADDRESS_TYPES.UNKNOWN
                                        ? 'Unknown'
                                        : ADDRESS_TYPES[type]
                                }
                            </Typography>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default withStyles(styles)(AddressDetailsHeader);