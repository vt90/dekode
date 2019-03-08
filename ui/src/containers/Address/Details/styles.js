/**
 * Created by vladtomsa on 08/01/2019
 */
export default (theme) => {
    return {
        banner: {
            backgroundColor: '#343434',
            background: 'radial-gradient(ellipse at center,#484848 0,#232323 100%)',
            paddingBottom: 40,
            [theme.breakpoints.up('sm')]: {
                padding: '20px 40px !important',
                paddingBottom: '80px !important',
            },
        },
        header: {
            '& *': {
                color: '#FFFFFF',
            },
            '& h4': {
                wordBreak: 'break-all',
            },
        },
        backButton: {
            marginBottom: 6,
            paddingLeft: 0,
        },
        tabsContainer: {
            marginTop: -64,
            padding: 16,
        },
        tabHeader: {
            marginBottom: 3,
            '& *': {
                color: 'rgba(255,255,255,0.9)',
            },
        },
        chip: {
            background: 'linear-gradient(60deg,#FFFFFF,#EDEDED)',
            border: '1px solid #FFF',
            boxShadow: theme.shadows[2],
            height: 26,
            margin: '3px 6px',
            '& div': {
                background: 'rgba(0,0,0,0)',
            },
        },
    }
}
