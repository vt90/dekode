/**
 * Created by vladtomsa on 08/01/2019
 */

export default (theme) => {
    return {
        addressListSection: {
            marginBottom: 20,
            marginTop: -40,
        },
        headerSection: {
            backgroundColor: '#343434',
            // backgroundSize: '550% 450%',
            background: 'radial-gradient(ellipse at center,#585858 0,#232323 100%)',
            boxShadow: theme.shadows[11],
            minHeight: '90vh',
        }
    }
}