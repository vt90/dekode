/**
 * Created by vladtomsa on 26/11/2018
 */
const styles = (theme) => {
  return {
    toolbar: {
      backgroundColor: '#FFF',
      '& h6': {
        fontWeight: 300,
      },
    },
    searchForm: {
      minWidth: 500,
      maxWidth: '100%',
      '& button': {
        '& *': {
          color: '#FFF',
        },
      },
    },
  };
};

export default styles;
