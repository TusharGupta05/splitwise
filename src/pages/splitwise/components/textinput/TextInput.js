import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

const TextInput = ({ onChange, defaultValue, style }) => (
  <Input style={style} onChange={(event) => onChange(event.target.value)} defaultValue={defaultValue} />
);

TextInput.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  style: PropTypes.object,
};

export default TextInput;
