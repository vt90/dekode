/**
 * Created by vladtomsa on 09/01/2019
 */
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import compose from 'lodash/fp/compose';
import {reduxForm, Field, FormSection, FieldArray} from 'redux-form';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Plus from 'mdi-material-ui/PlusCircleOutline';
import Minus from 'mdi-material-ui/MinusCircle';
import {withStyles} from '@material-ui/core/styles';
import {RenderTextField} from 'components/FormInputs';
import styles from './styles';

const filterFormFieldStyle = {
    backgroundColor: '#FFFFFF',
};

// ToDo add validation
const validate = (values) => {
    const errors = {};

    return errors;
};


const renderAddresses = ({fields, meta: {error, submitFailed}}) => (
    <Fragment>
        {
            fields.map((member, index) => (
                <div key={index}>
                    <div className="flex align-center">
                    <div className="fill-flex">
                        <Field
                            name={member}
                            component={RenderTextField}
                            label={`Address ${index + 1}`}
                            inputStyle={filterFormFieldStyle}
                            variant="outlined"
                        />
                    </div>

                    {
                        fields.length > 1
                            ? (
                                <Fragment>
                                    &nbsp;
                                    <Tooltip title="Remove">
                                        <IconButton onClick={() => fields.remove(index)}>
                                            <Minus />
                                        </IconButton>
                                    </Tooltip>
                                </Fragment>
                            )
                            : null
                    }
                    </div>
                    <br />
                </div>
            ))
        }

        <div className="flex justify-end">
            <Button type="button" variant="outlined" color="primary" onClick={() => fields.push('')}>
                <Plus/>&nbsp;Add Address
            </Button>
        </div>
        <br />
        <br />
    </Fragment>
);

const AddressesCreateForm = ({classes, handleSubmit, onClose}) => {
    return (

        <Dialog
            PaperComponent="form"
            onSubmit={handleSubmit}
            open={true}
            onClose={onClose}
        >
            <DialogTitle>
                Report a new address
            </DialogTitle>

            <DialogContent className={classes.content}>
                <br/>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    <strong>Your details</strong>
                </Typography>

                <FormSection name="contactInfo">
                    <Grid container spacing={16}>
                        <Grid item xs={12}>
                            <Field
                                name="firstName"
                                component={RenderTextField}
                                label="First name"
                                inputStyle={filterFormFieldStyle}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Field
                                name="lastName"
                                component={RenderTextField}
                                label="Last name"
                                inputStyle={filterFormFieldStyle}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Field
                                name="email"
                                component={RenderTextField}
                                label="Email"
                                inputStyle={filterFormFieldStyle}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </FormSection>

                <br/>
                <Divider />
                <br/>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    <strong>Addresses to report</strong>
                </Typography>

                <FieldArray
                    name="addresses"
                    component={renderAddresses}
                />

                <Divider />
                <br/>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    <strong>Reason for reporting</strong>
                </Typography>

                <Grid container spacing={16}>
                    <Grid item xs={12}>
                        <Field
                            name="link"
                            component={RenderTextField}
                            label="Link"
                            inputStyle={filterFormFieldStyle}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Field
                            name="text"
                            component={RenderTextField}
                            label="Summary"
                            inputStyle={filterFormFieldStyle}
                            variant="outlined"
                            multiline
                            rows={3}
                            rowsMax={7}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <div className="flex justify-end">
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                    &nbsp;
                    <Button type="button" variant="outlined" color="primary" onClick={onClose}>Cancel</Button>
                </div>
            </DialogActions>
        </Dialog>
    )
};

AddressesCreateForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default compose(
    withStyles(styles),
    reduxForm({
        form: 'AddressesCreateForm',
        validate,
    }),
)(AddressesCreateForm);

