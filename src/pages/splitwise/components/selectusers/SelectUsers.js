import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import { REDUCER_NAMES } from '../../../../constants/reducers.constants';

const SelectUsers = ({ mode = 'single', placeholder, defaultValue, onChange, form }) => {
  const registeredUsers = useSelector((reduxStore) => reduxStore[REDUCER_NAMES.AUTH].registeredUsers);
  const [value, setValue] = useState(mode === 'single' ? defaultValue : []);
  useEffect(() => {
    setValue((prevValue) => {
      let newValue = defaultValue;
      if (mode !== 'single') {
        if (defaultValue) {
          newValue = defaultValue;
        } else {
          newValue = prevValue;
        }
      }
      if (defaultValue && defaultValue !== newValue) {
        onChange(newValue);
      }
      return newValue;
    });
  }, [defaultValue, mode, onChange]);
  return (
    <Select
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
      style={{ width: mode === 'single' ? '120px' : '200px' }}
      options={registeredUsers.map(({ username }) => ({
        value: username,
        label: username,
      }))}
    />
  );
};

export default SelectUsers;
