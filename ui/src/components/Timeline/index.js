import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Bounce from 'react-reveal/Bounce';
import Calendar from 'mdi-material-ui/CalendarCheck';
import {withStyles} from '@material-ui/core/styles';
import Percentage from './Percentage';

/* eslint-disable */
import styles from './styles';

const Timeline = ({cards, classes}) => {
    return (
        <Fragment>
            <Grid container spacing={8} className={classes.timelineContainer}>
                {
                    cards.map((card, index) => {
                        return (
                            <Grid item xs={12} className="timeline-item-container" key={card.name}>
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
                                        <Bounce>
                                            <Paper elevation={12} className={`paper ${classes.timelinePaper}`}>
                                                <div className="flex justify-center">
                                                    <Percentage value={card.percentage}/>
                                                </div>

                                                <h4>
                                                    {card.name}
                                                </h4>

                                                {card.content}

                                                {
                                                    card.timeline
                                                        ? (
                                                            <div>
                                                                <br/>
                                                                {
                                                                    card.timeline.map(timeline => (
                                                                        <div key={card.name + timeline.time}>
                                                                            <h5 className="flex align-center">
                                                                                <Calendar/> {timeline.time}
                                                                            </h5>

                                                                            <ul>
                                                                                {
                                                                                    timeline.activities.map(activity => (
                                                                                        <li key={activity}>
                                                                                            <p>{activity};</p>
                                                                                        </li>
                                                                                    ))
                                                                                }
                                                                            </ul>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        )
                                                        : null
                                                }

                                            </Paper>

                                            <div className="timelineIcon">
                                                {card.icon}
                                            </div>
                                        </Bounce>
                                    </Grid>
                                </Grid>
                            </Grid>
                        );
                    })
                }

                <div className={classes.divider}/>
            </Grid>
        </Fragment>
    )
};

Timeline.propTypes = {
    cards: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
};

/* eslint-enable */
export default withStyles(styles)(Timeline);
