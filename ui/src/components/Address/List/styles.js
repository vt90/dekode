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
            '& ul': {
                padding: 0,
            },
        },
        subheader: {
            backgroundColor: theme.palette.background.paper,
        },
    };
};