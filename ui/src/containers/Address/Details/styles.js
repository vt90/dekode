/**
 * Created by vladtomsa on 26/11/2018
 */
const styles = (theme) => {
  return {
    accountBalanceCard: {
      padding: 12,
      height: '100%',
    },
    accountBalanceHeader: {
      alignItems: 'flex-end',
      display: 'flex',
      marginTop: -24,

      '& svg': {
        color: '#FFF',
        fontSize: 46,
      },
    },
    accountBalanceContent: {
      flexGrow: 1,
      textAlign: 'right',
      wordBreak: 'break-all',
      '& span': {
        marginTop: 20,
      },
      '& h2': {
        fontSize: '1rem',
      },
    },
    totalBalance: {
      background: 'linear-gradient(60deg,#ec407a,#d81b60)',
      padding: 8,
    },
    totalOutcome: {
      background: 'linear-gradient(60deg,#ffa726,#fb8c00)',
      padding: 8,
    },
    totalIncome: {
      background: 'linear-gradient(60deg,#66bb6a,#43a047)',
      padding: 8,
    },
    totalTransactions: {
      background: 'linear-gradient(60deg,#26c6da,#00acc1)',
      padding: 8,
    },
    transactionsFlow: {
      background: 'linear-gradient(45deg, #616161, #212121)',
    },
    tableRow: {
      '& td': {
        maxWidth: 160,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }
    },
    income: {
      color: '#43a047',
    },
    outcome: {
      color: '#fb8c00'
    },
    ownAddress: {
      '& *': {
        fontWeight: 700,
      }
    },
    transactionsFlowHeader: {
      padding: '46px 46px 0px',
      '& *': {
        color: 'rgba(255,255,255,0.9)'
      },
      '& > div': {
        width: 120,
        maxWidth: '100%',
      },
    },
    filter: {
      background: 'linear-gradient(45deg, #616161, #212121)',
      '& *': {
        color: '#FFF'
      },
    }
  };
};

export default styles;
