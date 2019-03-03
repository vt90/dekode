/**
 * Created by vladtomsa on 08/01/2019
 */
import cyan from '@material-ui/core/colors/cyan';

export default (theme) => {
    return {
        fab: {
            padding: '10px 16px',
        },
        mainSection: {
            backgroundColor: '#343434',
            // backgroundSize: '550% 450%',
            background: 'radial-gradient(ellipse at center,#484848 0,#232323 100%)',
            padding: '0 40px',
            '& >div': {
                minHeight: '102vh',
            },
            [theme.breakpoints.down('md')]: {
                paddingTop: 40,
                paddingBottom: 80,
            }
        },
        textContent: {
            '& *': {
                fontWeight: 300,
            },
            '& h2': {
                color: cyan[500],
            },
            '& h5': {
                color: '#DDD',
                fontSize: 20,
            },
            '& strong': {
                fontWeight: 500,
                color: '#FFF',
            }
        },
        pagination: {
            display: 'flex',
            justifyContent: 'flex-end',
        }
    }
}
