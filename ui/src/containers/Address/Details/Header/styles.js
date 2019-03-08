/**
 * Created by vladtomsa on 2019-03-08
 */
const styles = () => {
    return {
        root: {
            marginTop: 24,
        },
        addressCard: {
            minHeight: 54,
            padding: '6px 12px',
            position: 'relative',
        },
        cardIcon: {
            position: 'absolute',
            left: 8,
            top: -8,
            '& svg': {
                color: '#FFF',
                fontSize: 42,
            }
        },
        accountBalanceContent: {
            marginLeft: 62,
            textAlign: 'right',
            wordBreak: 'break-all',
            '& h6': {
                fontSize: '1rem',
            },
        },
        accountBalanceCard: {
            padding: 12,
            height: '100%',
        },
        accountBalanceHeader: {
            alignItems: 'flex-end',
            display: 'flex',
            marginTop: -40,

            '& svg': {
                color: '#FFF',
                fontSize: 46,
            },
        },

        totalBalance: {
            background: 'linear-gradient(60deg,#ec407a,#d81b60)',
            padding: 8,
        },
        threat: {
            background: 'linear-gradient(60deg,#ffa726,#fb8c00)',
            padding: 8,
        },
        credibility: {
            background: 'linear-gradient(60deg,#26c6da,#00acc1)',
            padding: 8,
        },
        addressType: {
            background: 'linear-gradient(60deg,#66bb6a,#43a047)',
            padding: 8,
        },
    };
};

export default styles;