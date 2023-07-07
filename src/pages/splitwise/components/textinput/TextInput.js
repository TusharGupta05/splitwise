import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

const TextInput = ({ onChange, value, style }) => <Input style={style} onChange={(event) => onChange(event.target.value)} defaultValue={value} />;

TextInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  style: PropTypes.object,
};

TextInput.defaultProps = {
  onChange: null,
  value: null,
  style: null,
};

export default TextInput;
