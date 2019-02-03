const styles = (theme) => {
    const ICON_SIZE = 48;
    const ARROW_COLOR = theme.palette.primary.main;
    const ARROW_SIZE = 10;

    return {
        timelineContainer: {
            position: 'relative',
            '& h4, h5': {
                color: '#FFFFFF',
                fontSize: 24,
                marginBottom: 10,
            },
            '& h5': {
                fontSize: 17,
                '& svg': {
                    marginRight: 6,
                },
            },
            '& p, p a, ul, li': {
                color: '#E8E9FF',
                fontSize: 15,
                lineHeight: '24px',
            },
            '& ul': {
                paddingLeft: 20,
            },
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
                padding: 20,
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
                    marginTop: -240,
                },
            },
            '& .timeline-item-container:nth-child(1)': {
                [theme.breakpoints.up('md')]: {
                    marginTop: 0,
                },
            },
        },
        timelinePaper: {
            borderRadius: 40,
            padding: 40,
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
            width: 1,
            height: '100%',
            background: '#FFFFFF',
            [theme.breakpoints.up('md')]: {
                left: '50%',
            },
        },
        circle: {
            background: `${theme.palette.primary.light}`,
            borderRadius: '50%',
            '& :before': {
                borderRadius: '50%',
            },
        },
        percentage: {
            position: 'relative',
            '& .value': {
                position: 'absolute',
                top: 12,
                left: 12,
                width: 116,
                height: 116,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'rgba(139, 141, 197, 0.3)',
                borderRadius: '50%',
                color: 'rgba(255, 255, 255, 0.59)',
                fontSize: 28,
                fontWeight: 700,
            },
        },
    };
};

export default styles;
