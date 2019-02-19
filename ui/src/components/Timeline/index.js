import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';

/* eslint-disable */
import styles from './styles';

const Timeline = ({cards, classes}) => {
    return (
        <div>
            <Grid container spacing={8} className={classes.timelineContainer}>
                {
                    cards.map((card, index) => {
                        return (
                            <Grid item xs={12} className="timeline-item-container" key={index}>
                                <Grid container>
                                    {
                                        index % 2 !== 0
                                            ? <Grid item xs={12} md={6}/>
                                            : null
                                    }
                                    <Grid
                                        className="timeline-card"
                                        item
                                        key={index}
                                        xs={12}
                                        md={6}
                                    >
                                        <div>
                                            <Paper elevation={12} className={`paper ${classes.timelinePaper}`}>
                                                {
                                                    card.header
                                                        ? card.header
                                                        : null
                                                }

                                                {
                                                    card.content
                                                        ? card.content
                                                        : null
                                                }

                                                {
                                                    card.footer
                                                        ? card.footer
                                                        : null
                                                }
                                            </Paper>

                                            <div className="timelineIcon">
                                                {card.icon}
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        );
                    })
                }

                <div className={classes.divider}/>
            </Grid>
        </div>
    )
};

Timeline.propTypes = {
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            content: PropTypes.any.isRequired,
            footer: PropTypes.any,
            header: PropTypes.any,
            icon: PropTypes.any,
        })
    ).isRequired,
    classes: PropTypes.object.isRequired,
};

/* eslint-enable */
export default withStyles(styles)(Timeline);
