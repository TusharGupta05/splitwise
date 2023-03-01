import React from 'react';
import { InputNumber } from 'antd';
import floatToFixed from '../../../../helpers/floatToFixed';

const NumberInput = ({ form, name, onChange, defaultValue, addonBefore, min }) => (
  <InputNumber
    defaultValue={defaultValue}
    parser={(newValue) => {
      const regExp = /^\d+(\.\d{0,13})?$/;
      const val = parseFloat(regExp.test(newValue) ? newValue : '');
      return floatToFixed(val);
    }}
    form={form}
    name={name}
    onChange={onChange}
    addonBefore={addonBefore}
    min={min}
    style={{ width: '100%' }}
  />
);

export default NumberInput;
