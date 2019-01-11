/**
 * Created by vladtomsa on 09/01/2019
 */
import React from 'react';
import { Link } from 'react-router-dom'
import compose from 'lodash/fp/compose';
import BlackFlag from 'mdi-material-ui/Flag';
import GreyFlag from 'mdi-material-ui/FlagOutline';
import Verified from 'mdi-material-ui/ShieldCheck';
import NotVerified from 'mdi-material-ui/ShieldOutline';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';
import {withStyles} from '@material-ui/core/styles';
import {CREDIBILITY_TYPES, FLAG_TYPES} from 'constants/address';
import styles from './styles';

const credibilityIcon = {
  [CREDIBILITY_TYPES.VERIFIED]: Verified,
  [CREDIBILITY_TYPES.NOT_VERIFIED]: NotVerified,
};

const flagIcon = {
    [FLAG_TYPES.Black]: BlackFlag,
    [FLAG_TYPES.GREY]: GreyFlag,
};

const AddressListItem = ({address, classes, divider, index, width}) => {
    const SmallListItemSection = ({label, children}) => (
        <div className={`flex align-center ${width === 'xs' || width === 'sm' ? '' : 'justify-center'}`}>
            <Hidden mdUp>
                <Typography variant="subtitle1" color="textSecondary">
                    {label}:&nbsp;
                </Typography>
            </Hidden>

            {children}
        </div>
    );

    const CredibilityIcon = credibilityIcon[address.credibility];

    const FlagIcon = flagIcon[address.flag];

    return (
        <ListItem
            button
            component="div"
            divider={!!divider}
            key={address.address}
        >
            <Grid container justify="space-between" alignItems="center">
                <Grid item xs={12} md={true}>
                    <Link to={`/address/${address.address}`}>
                        <Typography variant="subtitle2">
                            {address.address}
                        </Typography>
                    </Link>
                </Grid>
                <Grid item xs={12} md={2}>
                    <SmallListItemSection label="Type">
                        {address.type}
                    </SmallListItemSection>
                </Grid>

                <Grid item xs={12} md={2}>
                    <SmallListItemSection label="Credibility">
                        <Typography className="flex align-center">
                            <Hidden mdUp>
                                {address.credibility}
                                &nbsp;
                            </Hidden>

                            <Tooltip title={address.credibility}>
                                {
                                    CredibilityIcon &&
                                    (   <CredibilityIcon
                                            className={classes[address.credibility.replace(/ /g,'')]}
                                        />
                                    )
                                }
                            </Tooltip>
                        </Typography>
                    </SmallListItemSection>
                </Grid>

                <Grid item xs={12} md={2}>
                    <SmallListItemSection label="Flag">
                        <SmallListItemSection label="Credibility">
                            <Typography className="flex align-center">
                                <Hidden mdUp>
                                    {address.flag}
                                    &nbsp;
                                </Hidden>

                                <Tooltip title={address.flag}>
                                    {
                                        FlagIcon &&
                                        (   <FlagIcon
                                                className={classes[address.flag]}
                                            />
                                        )
                                    }
                                </Tooltip>
                            </Typography>
                        </SmallListItemSection>
                    </SmallListItemSection>
                </Grid>
            </Grid>
        </ListItem>
    );
};

export default compose(
    withWidth(),
    withStyles(styles),
)(AddressListItem);