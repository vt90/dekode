const styles = (theme) => {
    const ICON_SIZE = 48;
    const ARROW_COLOR = '#bdbaba';
    const ARROW_SIZE = 10;

    return {
        timelineContainer: {
            padding: 12,
            position: 'relative',
            '& .timeline-card': {
                position: 'relative',
                marginBottom: ICON_SIZE / 2,
                [theme.breakpoints.down('md')]: {
                    paddingLeft: ICON_SIZE,
                },
            },
            '& .timelineIcon': {
                alignItems: 'center',
                backgroundColor: theme.palette.secondary.main,
                border: '2px solid #FFFFFF',
                borderRadius: '50%',
                boxShadow: '0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(0,188,212,.4)',
                display: 'flex',
                height: ICON_SIZE,
                justifyContent: 'center',
                position: 'absolute',
                top: 34,
                width: ICON_SIZE,
                zIndex: 999,
                '& svg': {
                    color: '#FFFFFF',
                },
                [theme.breakpoints.down('sm')]: {
                    left: -1 * (ICON_SIZE / 2),
                },
            },
            '& .timelineIcon:nth-child(odd)': {
                top: 60,
            },
            [theme.breakpoints.up('md')]: {
                '& .timeline-card:nth-child(odd)': {
                    marginTop: 0,
                    paddingRight: ICON_SIZE,
                    '& .timelineIcon': {
                        right: -1 * (ICON_SIZE / 2),
                    },
                    '& .paper': {
                        '&:before': {
                            right: -20,
                            border: `${ARROW_SIZE}px solid transparent`,
                            borderLeft: `${ARROW_SIZE}px solid ${ARROW_COLOR}`,
                        },
                    },
                },
                '& .timeline-card:nth-child(even)': {
                    marginTop: ICON_SIZE,
                    paddingLeft: ICON_SIZE,
                    '& .timelineIcon': {
                        left: -1 * (ICON_SIZE / 2),
                    },
                },
            },
            '& .timeline-item-container': {
                [theme.breakpoints.up('md')]: {
                    marginTop: -70,
                },
            },
            '& .timeline-item-container:nth-child(1)': {
                [theme.breakpoints.up('md')]: {
                    marginTop: 0,
                },
            },
            '& .timeline-item-container:nth-child(2)': {
                [theme.breakpoints.up('md')]: {
                    marginTop: -110,
                },
            },
        },
        timelinePaper: {
            borderRadius: 16,
            padding: 16,
            '&:before': {
                content: '""',
                position: 'absolute',
                top: ICON_SIZE,
                right: '100%',
                height: 0,
                width: 0,
                border: `${ARROW_SIZE}px solid transparent`,
                borderRight: `${ARROW_SIZE}px solid ${ARROW_COLOR}`,
            },
        },
        divider: {
            position: 'absolute',
            top: 0,
            width: 2,
            height: '100%',
            background: '#e5e5e5',
            left: 17,
            [theme.breakpoints.up('md')]: {
                left: '50%',
            },
        },
    };
};

export default styles;
