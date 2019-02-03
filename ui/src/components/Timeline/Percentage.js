import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';

/* eslint-disable */
class TimelinePercentage extends Component {
    // state = {
    //   completed: 0,
    // };
    //
    // componentDidMount() {
    //   this.timer = setInterval(this.progress, 20);
    // }
    //
    // componentWillUnmount() {
    //   clearInterval(this.timer);
    // }
    //
    // progress = () => {
    //   const { completed } = this.state;
    //   const { value } = this.props;
    //
    //   if (completed < value) {
    //     this.setState({ completed: completed + 1 });
    //   } else {
    //     clearInterval(this.timer);
    //   }
    // };

    render() {
        // const { completed } = this.state;
        const {classes, value} = this.props;
        return (
            <div className={classes.percentage}>
                <CircularProgress
                    variant="static"
                    color="secondary"
                    size={140}
                    value={value}
                    classes={{
                        colorSecondary: classes.circle,
                    }}
                />

                <div className="value">
                    {value}
                    &nbsp;%
                </div>
            </div>
        );
    }
}

TimelinePercentage.propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.number.isRequired,
};

export default withStyles(styles)(TimelinePercentage);
/* eslint-enable */
