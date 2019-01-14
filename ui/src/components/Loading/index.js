import React, {Fragment} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const Loading = ({message}) => (
    <div className="flex justify-center layout-padding" style={{width: '100%', padding: 20,}}>
        <CircularProgress size={46} color="secondary"/>
        {
            message
                ? (
                    <Fragment>
                        &nbsp;
                        <Typography color="secondary">
                            {message}
                        </Typography>
                    </Fragment>
                )
                : null
        }
    </div>
);

export default Loading;
