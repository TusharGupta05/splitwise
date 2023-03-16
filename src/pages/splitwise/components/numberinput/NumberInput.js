import React from 'react';
import { InputNumber } from 'antd';
import PropTypes from 'prop-types';
import floatToFixed from '../../../../helpers/floatToFixed';

const NumberInput = ({ form, name, onChange, value, addonBefore, min, disabled, style }) => (
  <InputNumber
    value={value}
    parser={(newValue) => {
      const regExp = /^\d+(\.\d{0,13})?$/;
      const val = parseFloat(regExp.test(newValue) ? newValue : '');
      return floatToFixed(val);
    }}
    disabled={disabled}
    form={form}
    name={name}
    onChange={onChange}
    addonBefore={addonBefore}
    min={min}
    style={style ?? { width: '100%' }}
  />
);

NumberInput.propTypes = {
  form: PropTypes.object,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.number,
  addonBefore: PropTypes.string,
  min: PropTypes.number,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

NumberInput.defaultProps = {
  form: null,
  name: null,
  onChange: null,
  value: null,
  addonBefore: null,
  min: null,
  disabled: false,
  style: null,
};

export default NumberInput;
