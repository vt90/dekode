import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CalendarIcon from 'mdi-material-ui/Calendar';
import LeftIcon from 'mdi-material-ui/ChevronLeft';
import RightIcon from 'mdi-material-ui/ChevronRight';

import {
  DatePicker,
} from 'material-ui-pickers';

import { DATE_FORMAT } from 'constants';

import {withStyles} from '@material-ui/core/styles';

export const RenderTextField = (props) => {
  const { input, label, meta: { touched, error }, displayErrorWhenNotTouched, required, ...custom} = props;

  const inputProps = { required: !!required };

  if (custom.minLength) inputProps.maxLength = custom.minLength;
  if (custom.maxLength) inputProps.maxLength = custom.maxLength;
  if (custom.min) inputProps.max = custom.min;
  if (custom.max) inputProps.max = custom.max;

  return (
    <FormControl required={!!required} error={!!((touched || displayErrorWhenNotTouched) && error)} fullWidth>
      {
        label ? <InputLabel required={required}>{label}</InputLabel> : null
      }
      <Input
        { ...input } { ...custom } inputProps={inputProps}
      />
      { !!((touched || displayErrorWhenNotTouched) && error) ? <FormHelperText>{ error }</FormHelperText> : null }
    </FormControl>
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
    const {input, label, meta, required, options, disabled, displayErrorWhenNotTouched, t, classes, hideNoneOption, ...custom} = this.props;
    const {touched, error} = meta;

    return (
      <FormControl disabled={disabled} error={!!((touched || displayErrorWhenNotTouched) && error)} fullWidth>
        <InputLabel required={required}>{label}</InputLabel>
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
                  {typeof option.name === 'string' ? option.name : option.name}
                </MenuItem>
                )
              )
          }
        </Select>

        {!!((touched || displayErrorWhenNotTouched) && error) ? <FormHelperText>{error}</FormHelperText> : null}
      </FormControl>
    );
  }
}
);

export const RenderCheckbox = ({ input, label, disabled, ...custom}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value}
          onChange={input.onChange}
          disabled={!!disabled}
          color="secondary"
          { ...custom }
        />
      }
      label={label}
    />
  );
};

export const RenderDatePicker = ({ input, label, disablePast, meta, required, format, minDate, maxDate, openToYearSelection }) => {
  const { touched, error } = meta;

  return (
    <div className="date-picker-wrapper">
      <DatePicker
        label={<span>{label} <span>{required ? '*' : ''}</span></span>}
        invalidLabel={''}
        autoOk
        clearable
        keyboard
        onOpen={input.onBlur}
        onChange={(e) => input.onChange(e ? e.format(format || DATE_FORMAT) : null)}
        error={!!(touched && error)}
        helperText={!!(touched && error) ? error : ''}
        value={input.value}
        format={format || DATE_FORMAT}
        leftArrowIcon={<LeftIcon/>}
        rightArrowIcon={<RightIcon/>}
        keyboardIcon={<CalendarIcon/>}
        disablePast={!!disablePast}
        minDate={minDate}
        maxDate={maxDate}
        openToYearSelection={openToYearSelection}
        fullWidth
      />
    </div>
  );
};
