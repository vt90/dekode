import React from 'react';
import compose from 'lodash/fp/compose';
import ListItem from '@material-ui/core/ListItem';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Income from 'mdi-material-ui/ArrowDownBoldCircle';
import Outcome from 'mdi-material-ui/ArrowUpBoldCircle';
import withStyles from '@material-ui/core/styles/withStyles';
import withWidth from '@material-ui/core/withWidth';
import styles from './styles';

const TransactionItem = ({
                             classes,
                             divider,
                             transaction,
                             width,
                         }) => {
    const SmallListItemSection = ({label, children}) => (
        <div>
            <Hidden mdUp>
                <Typography variant="subtitle1" color="textSecondary">
                    {label}:&nbsp;
                </Typography>
            </Hidden>

            {children}
        </div>
    );
    return (
        <ListItem
            divider={!!divider}
        >
            <Grid
                container
                // justify="space-between"
                // alignItems="center"
            >
                <Grid item xs={1}>
                    {transaction.income ? <Income/> : <Outcome/>}
                </Grid>
                <Grid item xs={9}>
                    <SmallListItemSection label="Txid">
                        {transaction.txid}
                    </SmallListItemSection>
                </Grid>
                <Grid item xs={2} md={true}>
                    <SmallListItemSection label="value">
                        {transaction.value}
                    </SmallListItemSection>
                </Grid>
            </Grid>
        </ListItem>
    );
};

// const AddressListItem = ({address, classes, divider, index, width}) => {
//     const SmallListItemSection = ({label, children}) => (
//         <div className={`flex align-center ${width === 'xs' || width === 'sm' ? '' : 'justify-center'}`}>
//             <Hidden mdUp>
//                 <Typography variant="subtitle1" color="textSecondary">
//                     {label}:&nbsp;
//                 </Typography>
//             </Hidden>
//
//             {children}
//         </div>
//     );
//
//     const CredibilityIcon = credibilityIcon[address.credibility];
//
//     const FlagIcon = flagIcon[address.flag];
//     return (
//         <ListItem
//             button
//             component={Link}
//             to={`/address/${address.address}`}
//             divider={!!divider}
//             key={address.address}
//         >
//             <Grid container justify="space-between" alignItems="center">
//                 <Grid item xs={12} md={true}>
//                     <Typography variant="subtitle2">
//                         {address.address}
//                     </Typography>
//                 </Grid>
//                 <Grid item xs={12} md={2}>
//                     <SmallListItemSection label="Type">
//                         {address.type}
//                     </SmallListItemSection>
//                 </Grid>
//
//                 <Grid item xs={12} md={2}>
//                     <SmallListItemSection label="Credibility">
//                         <Typography className="flex align-center">
//                             <Hidden mdUp>
//                                 {address.credibility}
//                                 &nbsp;
//                             </Hidden>
//
//                             {
//                                 CredibilityIcon &&
//                                 (<Tooltip title={address.credibility}>
//                                     <CredibilityIcon
//                                         className={classes[address.credibility.replace(/ /g, '')]}
//                                     />
//                                 </Tooltip>)
//                             }
//                         </Typography>
//                     </SmallListItemSection>
//                 </Grid>
//
//                 <Grid item xs={12} md={2}>
//                     <SmallListItemSection label="Flag">
//                         <SmallListItemSection label="Credibility">
//                             <Typography className="flex align-center">
//                                 <Hidden mdUp>
//                                     {address.flag}
//                                     &nbsp;
//                                 </Hidden>
//
//                                 {
//                                     FlagIcon &&
//                                     (<Tooltip title={address.flag}>
//                                         <FlagIcon
//                                             className={classes[address.flag]}
//                                         />
//
//                                     </Tooltip>)
//                                 }
//                             </Typography>
//                         </SmallListItemSection>
//                     </SmallListItemSection>
//                 </Grid>
//             </Grid>
//         </ListItem>
//     );
// };
//
export default compose(
    withWidth(),
    withStyles(styles),
)(TransactionItem);
