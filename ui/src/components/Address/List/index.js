import React, {Fragment} from 'react';
import compose from 'lodash/fp/compose';
import {withStyles} from '@material-ui/core/styles';
import Info from 'mdi-material-ui/Information';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItemText';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import TablePagination from '@material-ui/core/TablePagination';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AddressListItem from './Item';
import Header from '../Header';
import styles from './styles';

const AddressesList = ({
                           initialFilterValues,
                           onFilterSubmit,
                           addresses,
                           classes,
                           isVerified,
                           verifyAddress,
                           pageNumber,
                           pageSize,
                           totalEntities,
                           onPaginationChange,
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
                                            label="Credibility"
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
                                            label="Flag"
                                            info={
                                                <Fragment>
                                                    <p>Depending on the number of sources the address was found, it's
                                                        flag
                                                        is set to:</p>
                                                    <ul>
                                                        <li>
                                                            <strong>White</strong> - no sources are available
                                                        </li>

                                                        <li>
                                                            <strong>Grey</strong> - one source was submitted
                                                        </li>

                                                        <li>
                                                            <strong>White</strong> - at least 2 sources where found for
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
                    ? (
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={totalEntities}
                            rowsPerPage={pageSize}
                            page={pageNumber - 1}
                            onChangePage={(_, page) => onPaginationChange({
                                pageNumber: page + 1,
                                pageSize: pageSize,
                            })}
                            onChangeRowsPerPage={(ev) => onPaginationChange({
                                pageNumber: pageNumber,
                                pageSize: ev.target.value,
                            })}
                        />
                    )
                    : null
            }
        </Fragment>
    );
};

export default compose(
    withStyles(styles)
)(AddressesList);
