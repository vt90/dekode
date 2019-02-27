/**
 * Created by vladtomsa on 2019-02-07
 */
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import compose from 'lodash/fp/compose';
import {withStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from "@material-ui/core/Chip";
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import MessageText from 'mdi-material-ui/MessageText';
import Quote from 'mdi-material-ui/FormatQuoteClose';
import SearchWeb from 'mdi-material-ui/SearchWeb';
import Timeline from 'components/Timeline';
import {DATE_TIME_FORMAT} from 'constants/global';
import moment from 'moment';
import styles from './styles';

const SourcesTimeline = (props) => {
    const {classes, sources} = props;

    const renderContent = (source) => {
        return (
            <CardContent>
                <Chip
                    avatar={
                        <Avatar>
                            <SearchWeb/>
                        </Avatar>
                    }
                    className={classes.chip}
                    color="secondary"
                    label={
                        <a
                            href={source.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View source
                        </a>
                    }
                />

                <div className="flex">
                    <Typography color="textSecondary">
                        <Quote/>
                    </Typography>
                    &nbsp;
                    <div className="break-word">
                        <Typography>
                            {source.text}
                        </Typography>
                    </div>
                    &nbsp;
                    <Typography color="textSecondary">
                        <Quote/>
                    </Typography>
                </div>
            </CardContent>
        );
    };

    const renderFooter = (source) => {
        return (
            <Fragment>
                <Divider/>

                {/* ToDo verify title || conditions */}
                <CardHeader
                    className={classes.footer}
                    // title={source.sourceName || 'Vlad Tomsa'}
                    title={source.sourceName}
                    subheader={moment(source.createdDate).format(DATE_TIME_FORMAT)}
                />
            </Fragment>
        );
    };

    return (
        <div className={classes.root}>
            {
                sources && sources.length
                    ? (
                        <Timeline
                            cards={sources.map(source => {
                                return {
                                    content: renderContent(source),
                                    footer: renderFooter(source),
                                    icon: <MessageText/>
                                }
                            })}
                        />
                    )
                    : <h1>No sources available</h1> // ToDo style this
            }
        </div>
    )
};

SourcesTimeline.propTypes = {
    classes: PropTypes.object.isRequired,
    sources: PropTypes.array.isRequired,
};

export default compose(
    withStyles(styles),
)(SourcesTimeline)

