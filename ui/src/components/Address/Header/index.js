/**
 * Created by vladtomsa on 08/01/2019
 */
import React, { Fragment, useState } from 'react';
import compose from 'lodash/fp/compose';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Close from '@material-ui/icons/Close';
import Search from '@material-ui/icons/Search';
import styles from './styles';

const AddressesHeader = ({ classes }) => {
    const [isExpandend, setExpanded] = useState(false);

    return (
       <Fragment>
           <ExpansionPanel
               classes={{ root: classes.root }}
               expanded={isExpandend}
               onChange={() => setExpanded(!isExpandend)}
           >
               <ExpansionPanelSummary
                   className={classes.expansionPanelSummary}
                   expandIcon={isExpandend ? <Close/> : <Search />}
               >
                   <Typography variant="h4" color="textSecondary">Addresses</Typography>
               </ExpansionPanelSummary>
               <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                   <Card square className={classes.filter}>
                       <CardContent>
                           <Typography>
                               Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                               maximus est, id dignissim quam.
                           </Typography>
                       </CardContent>
                   </Card>
               </ExpansionPanelDetails>
           </ExpansionPanel>
       </Fragment>
    );
};

export default compose(
    withStyles(styles),
)(AddressesHeader);