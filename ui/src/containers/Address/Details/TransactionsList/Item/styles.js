/**
 * Created by vladtomsa on 08/01/2019
 */
import lightGreen from '@material-ui/core/colors/lightGreen';

export default (theme) => {
  return {
      verified: {
          color: lightGreen['A700'],
      },
      notverified: {
          color: theme.palette.text.hint,
      },
      grey: {
          color: theme.palette.text.hint,
      }
  }
};