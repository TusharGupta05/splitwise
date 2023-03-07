import React from 'react';
import { Input } from 'antd';

const TextInput = ({ onChange, defaultValue, style }) => (
  <Input style={style} onChange={(event) => onChange(event.target.value)} defaultValue={defaultValue} />
);

export default TextInput;
