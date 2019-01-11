/**
 * Created by vladtomsa on 09/01/2019
 */
import React from 'react';
import PropTypes from 'prop-types';
import {reduxForm, Field} from 'redux-form';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {RenderTextField, RenderSelectField} from 'components/FormInputs';
import {ADDRESS_TYPES, CREDIBILITY_TYPES, FLAG_TYPES} from 'constants/address';

const addressTypeOptions = Object.keys(ADDRESS_TYPES).map(key => {
    return {
        name: ADDRESS_TYPES[key] === ADDRESS_TYPES.UNKNOWN ? 'Unknown' : ADDRESS_TYPES[key],
        value: ADDRESS_TYPES[key],
    };
});

const credibilityOptions = Object.keys(CREDIBILITY_TYPES).map(key => {
    return {
        name: CREDIBILITY_TYPES[key],
        value: CREDIBILITY_TYPES[key],
    };
});

const flagOptions = Object.keys(FLAG_TYPES).map(key => {
    return {
        name: FLAG_TYPES[key],
        value: FLAG_TYPES[key],
    };
});

const validate = (values) => {
    const errors = {};

    if (values.term) {
        if (values.term.length < 3) {
            errors.term = 'Please be more detailed';
        }
    }

    return errors;
};

const AddressesFilterForm = ({handleSubmit}) => {
    const onInputChange = () => {
        setTimeout(handleSubmit, 100);
    };

    const filterFormFieldStyle = {
      backgroundColor: '#FFFFFF',
    };

    return (
        <form onSubmit={handleSubmit}>
            <br />
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Field
                        name="term"
                        component={RenderTextField}
                        label="Address"
                        inputStyle={filterFormFieldStyle}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Field
                        name="type"
                        component={RenderSelectField}
                        options={addressTypeOptions}
                        label="Type"
                        onChange={onInputChange}
                        style={filterFormFieldStyle}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Field
                        name="credibility"
                        component={RenderSelectField}
                        options={credibilityOptions}
                        label="Credibility"
                        onChange={onInputChange}
                        style={filterFormFieldStyle}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Field
                        name="flag"
                        component={RenderSelectField}
                        options={flagOptions}
                        onChange={onInputChange}
                        label="Flag"
                        style={filterFormFieldStyle}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12}>
                    <br/>
                    <div className="flex justify-end">
                        <Button type="submit" variant="contained" color="primary">Search</Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    )
};

AddressesFilterForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
    form: 'AddressesFilterForm',
    validate,
})(AddressesFilterForm);
