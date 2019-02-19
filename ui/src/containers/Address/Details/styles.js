/**
 * Created by vladtomsa on 08/01/2019
 */
import {FLAG_TYPES} from 'constants/address';

export default (theme) => {
    return {
        [FLAG_TYPES.Black]: {
            backgroundColor: '#343434',
            background: 'radial-gradient(ellipse at center,#484848 0,#232323 100%)',
            '& *': {
                color: '#FFFFFF',
            }
        },
        [FLAG_TYPES.GREY]: {
            backgroundColor: '#A4A4A4',
            background: 'radial-gradient(ellipse at center,#E1E1E1 0,#D8D8D8 100%)',
        },
        header: {
            '& h4': {
              wordBreak: 'break-all',
            },
            [theme.breakpoints.up('sm')]: {
                padding: '80px 40px !important',
            },
            paddingBottom: 40,
        },
        backButton: {
            marginBottom: 6,
            paddingLeft: 0,
        },
        tabsContainer: {
            marginTop: -60,
            padding: 16,
        },
        tabHeader: {
          marginBottom: 3,
        },
    }
}