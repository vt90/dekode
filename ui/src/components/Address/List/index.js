import React, {Fragment} from 'react';
import compose from 'lodash/fp/compose';
import {withStyles} from '@material-ui/core/styles';
import Info from 'mdi-material-ui/Information';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AddressListItem from './Item';
import styles from './styles';

const AddressesList = ({
                           addresses,
                           classes,
                           isVerified,
                           verifyAddress,
                       }) => {
    if (!addresses) return null;

    const TitleItem = ({className, info, label}) => (
        <Typography variant="subtitle1" color="textSecondary" className={`flex align-center ${className || "justify-center"}`}>
            {label}
            {
                info
                    ? (
                        <Tooltip title={info}>
                            <Info className={classes.info}/>
                        </Tooltip>
                    )
                    : null
            }
        </Typography>
    );

    return (
        <List className={classes.root} subheader={<li/>}>
            <li>
                <ul>
                    <ListSubheader className={classes.subheader}>
                        <Hidden smDown>
                            <Grid container justify="space-between" alignItems="center">
                                <Grid item xs={12} md={true}>
                                    <TitleItem label="Address" className="text-left"/>
                                </Grid>

                                <Grid item md={2}>
                                    <TitleItem label="Type"/>
                                </Grid>

                                <Grid item md={2}>
                                    <TitleItem
                                        label="Credibility"
                                        info={
                                            <Fragment>
                                                <p>The credibility for a given address can have one of the fallowing values:</p>
                                                <ul>
                                                    <li>
                                                        <strong>Not verified</strong> - no one verified the sources
                                                    </li>

                                                    <li>
                                                        <strong>Verified</strong> - it was verified by a certified user
                                                    </li>
                                                </ul>
                                            </Fragment>
                                        }
                                    />
                                </Grid>

                                <Grid item md={2}>
                                    <TitleItem
                                        label="Flag"
                                        info={
                                            <Fragment>
                                                <p>Depending on the number of sources the address was found, it's flag is set to:</p>
                                                <ul>
                                                    <li>
                                                        <strong>White</strong> - no sources are available
                                                    </li>

                                                    <li>
                                                        <strong>Grey</strong> - one source was submitted
                                                    </li>

                                                    <li>
                                                        <strong>White</strong> - at least 2 sources where found for the address
                                                    </li>
                                                </ul>
                                            </Fragment>
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </Hidden>
                    </ListSubheader>

                    {addresses.map((address, index) => {
                        return (
                            <AddressListItem
                                address={address}
                                divider={index !== addresses.length - 1}
                                key={address.address}
                            />
                        )
                    })}
                </ul>
            </li>
        </List>
    );
};

export default compose(
    withStyles(styles)
)(AddressesList);
