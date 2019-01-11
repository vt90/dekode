/**
 * Created by vladtomsa on 09/01/2019
 */
export default (theme) => {
    return {
        info: {
            fontSize: 18,
            color: theme.palette.text.hint,
        },
        root: {
            [theme.breakpoints.down('md')]: {
                marginTop: 80,
            },
            [theme.breakpoints.up('lg')]: {
                maxHeight: 'calc(80vh - 40px)',
                overflowY: 'scroll',
            },
            '& ul': {
                padding: 0,
            },
        },
        subheader: {
            backgroundColor: theme.palette.background.paper,
            padding: 0,
        },
        tableHeader: {
            padding: '4px 16px',
        },
    };
};