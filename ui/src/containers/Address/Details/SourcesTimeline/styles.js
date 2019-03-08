/**
 * Created by vladtomsa on 2019-02-07
 */
export default () => {
    return {
        root: {
            padding: 16,
        },
        chip: {
            height: 28,
            marginBottom: 6,
            '& *': {
                color: '#ffffff',
                fontSize: '0.75rem',
            },
            '& svg': {
                borderRadius: '50%',
                height: 28,
                width: 28,
            },
        },
        footer: {
            paddingBottom: 0,
            '& *': {
                fontSize: '0.875rem',
            },
        },
    };
};