import React, {Fragment} from 'react';
import cx from 'classnames';
import compose from 'lodash/fp/compose';
import {withStyles} from '@material-ui/core/styles';
import Info from 'mdi-material-ui/Information';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItemText';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import Next from '@material-ui/icons/NavigateNext';
import Previous from '@material-ui/icons/NavigateBefore';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { FLAG_DESCRIPTIONS } from 'constants/address';
import AddressListItem from './Item';
import Header from '../Header';
import styles from './styles';

const AddressesList = ({
                           initialFilterValues,
                           onFilterSubmit,
                           putAddressFilterValues,
                           addresses,
                           pageHistory,
                           classes,
                           hasNext,
                           hasPrevious,
                           isVerified,
                           verifyAddress,
                           getNextPage,
                           getPreviousPage,
                       }) => {
    if (!addresses) return null;

    const TitleItem = ({className, info, label}) => (
        <Typography variant="subtitle1" color="textSecondary"
                    className={`flex align-center ${className || "justify-center"}`}>
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
        <Fragment>
            <List className={classes.root} subheader={<li/>}>
                <li>
                    <ul>
                        <ListSubheader className={classes.subheader}>
                            <Header
                                initialValues={initialFilterValues}
                                putAddressFilterValues={putAddressFilterValues}
                                onFilterSubmit={onFilterSubmit}
                            />
                            <Hidden smDown>
                                <Grid
                                    container
                                    justify="space-between"
                                    alignItems="center"
                                    className={classes.tableHeader}
                                >
                                    <Grid item xs={12} md={true}>
                                        <TitleItem label="Address" className="text-left"/>
                                    </Grid>

                                    <Grid item md={2}>
                                        <TitleItem label="Type"/>
                                    </Grid>

                                    <Grid item md={2}>
                                        <TitleItem
                                            label="Verified"
                                            info={
                                                <Fragment>
                                                    <p>The credibility for a given address can have one of the fallowing
                                                        values:</p>
                                                    <ul>
                                                        <li>
                                                            <strong>Not verified</strong> - no one verified the sources
                                                        </li>

                                                        <li>
                                                            <strong>Verified</strong> - it was verified by a certified
                                                            user
                                                        </li>
                                                    </ul>
                                                </Fragment>
                                            }
                                        />
                                    </Grid>

                                    <Grid item md={2}>
                                        <TitleItem
                                            label="Threat"
                                            info={
                                                <Fragment>
                                                    <p>Depending on the number of sources the address was found, it can be:</p>
                                                    <ul>
                                                        <li>
                                                            <strong>{FLAG_DESCRIPTIONS.white}</strong> - no sources are available
                                                        </li>

                                                        <li>
                                                            <strong>{FLAG_DESCRIPTIONS.grey}</strong> - one source was submitted
                                                        </li>

                                                        <li>
                                                            <strong>{FLAG_DESCRIPTIONS.black}</strong> - at least 2 sources where found for
                                                            the
                                                            address
                                                        </li>
                                                    </ul>
                                                </Fragment>
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </Hidden>
                        </ListSubheader>

                        {
                            addresses.length
                                ? (
                                    <Fragment>
                                        {
                                            addresses.map((address, index) => {
                                                return (
                                                    <AddressListItem
                                                        address={address}
                                                        divider={index !== addresses.length - 1}
                                                        key={address.address}
                                                    />
                                                )
                                            })
                                        }
                                    </Fragment>
                                )
                                : (
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <Typography variant="h5" color="textSecondary">
                                                    Search criteria has no results
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                )
                        }
                    </ul>
                </li>
            </List>

            {
                addresses.length
                    ? (<div className={cx('flex', 'justify-end')}>
                            <Button disabled={pageHistory.length === 0} onClick={getPreviousPage}><Previous/></Button>
                            <Button disabled={!hasNext} onClick={getNextPage}><Next/></Button>
                        </div>
                    )
                    : null
            }
        </Fragment>
    );
};

export default compose(
    withStyles(styles)
)(AddressesList);
