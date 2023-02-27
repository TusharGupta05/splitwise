import React from 'react';
import { InputNumber } from 'antd';

const NumberInput = ({ form, name, handleChange, addonBefore, min }) => {
  return (
    <InputNumber
      parser={(newValue) => {
        const regExp = /^\d+(\.\d{0,13})?$/;
        const val = regExp.test(newValue) ? newValue : '';
        const floatVal = parseFloat(parseFloat(val).toFixed(2));
        const numVal = parseInt(parseFloat(val));
        return floatVal == numVal ? numVal : floatVal;
      }}
      form={form}
      name={name}
      onChange={handleChange}
      addonBefore={addonBefore}
      min={min}
      style={{ width: '100%' }}
    />
  );
};

export default NumberInput;
