import React, {Component} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {withStyles} from '@material-ui/core/styles';

export const RenderTextField = (props) => {
    const {input, label, meta: {touched, error}, displayErrorWhenNotTouched, required, variant, inputStyle, ...custom} = props;

    const inputProps = {
        error: !!((touched || displayErrorWhenNotTouched) && error),
        helperText: !!((touched || displayErrorWhenNotTouched) && error) ? error : null,
        fullWidth: true,
        required: !!required,
        label,
        variant,
        ...input,
        ...custom,
        inputProps: {
            style: inputStyle,
        }
    };

    if (custom.minLength) inputProps.maxLength = custom.minLength;
    if (custom.maxLength) inputProps.maxLength = custom.maxLength;
    if (custom.min) inputProps.max = custom.min;
    if (custom.max) inputProps.max = custom.max;
    if (custom.multiline && inputStyle) inputProps.style = inputStyle; // ToDo this is a quick fix, analyse a solution

    return (
        <TextField {...inputProps}/>
    );
};

const styles = {
    selectContainer: {
        maxHeight: 300,
    },
};

export const RenderSelectField = withStyles(styles)(class extends Component {
        state = {
            searchTerm: '',
        };

        render() {
            const {input, label, meta, required, options, disabled, displayErrorWhenNotTouched, classes, variant = 'standard', hideNoneOption, ...custom} = this.props;
            const {touched, error} = meta;

            const inputType = variant === 'outlined'
                ? <OutlinedInput name={label} id={label} labelWidth={label.length * 8}/>
                : <Input name={label} id={label}/>;

            return (
                <FormControl disabled={disabled} error={!!((touched || displayErrorWhenNotTouched) && error)} fullWidth variant={variant}>
                    <InputLabel required={required} htmlFor={label}>{label}</InputLabel>
                    <Select
                        {...input}
                        {...custom}
                        MenuProps={{
                            onEnter: () => {
                                setTimeout(() => {
                                    if (document.activeElement) {
                                        document.activeElement.blur();
                                    }
                                }, 500);
                            },
                        }}
                        input={inputType}
                    >
                        {
                            hideNoneOption
                                ? null
                                : (
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                )
                        }
                        {
                            options
                                .map((option, index) => (
                                        <MenuItem key={index} value={option.value} disabled={!!option.disabled}>
                                            {option.name}
                                        </MenuItem>
                                    )
                                )
                        }
                    </Select>

                    {!!((touched || displayErrorWhenNotTouched) && error) ?
                        <FormHelperText>{error}</FormHelperText> : null}
                </FormControl>
            );
        }
    }
);

export const RenderCheckbox = ({input, label, disabled, ...custom}) => {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={input.value}
                    onChange={input.onChange}
                    disabled={!!disabled}
                    color="secondary"
                    {...custom}
                />
            }
            label={label}
        />
    );
};