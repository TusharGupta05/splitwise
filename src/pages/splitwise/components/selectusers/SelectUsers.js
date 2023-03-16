import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { REDUCER_NAMES } from '../../../../constants/reducers.constants';

const SelectUsers = ({ mode = 'single', placeholder, defaultValue, onChange, form, style }) => {
  const registeredUsers = useSelector((reduxStore) => reduxStore[REDUCER_NAMES.AUTH].registeredUsers);
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    setValue((prevValue) => {
      const newValue = defaultValue;
      if (mode === 'single') {
        onChange(newValue);
        return newValue;
      }
      return prevValue;
    });
  }, [defaultValue, mode, onChange]);
  return (
    <Select
      // disabled
      form={form}
      mode={mode}
      onChange={(newValue) => {
        if (value !== newValue) {
          onChange(newValue);
          setValue(newValue);
        }
      }}
      placeholder={placeholder}
      value={value}
      style={style ?? { width: '100px' }}
      options={registeredUsers.map(({ username }) => ({
        value: username,
        label: username,
      }))}
    />
  );
};

SelectUsers.propTypes = {
  mode: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  onChange: PropTypes.func,
  form: PropTypes.object,
  style: PropTypes.object,
};

SelectUsers.defaultProps = {
  mode: 'single',
  placeholder: null,
  defaultValue: undefined,
  onChange: null,
  form: null,
  style: null,
};

export default SelectUsers;
