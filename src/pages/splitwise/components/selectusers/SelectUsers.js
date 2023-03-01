import React from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import { REDUCER_NAMES } from '../../../../constants/reducers.constants';

const SelectUsers = ({ compKey, mode = 'single', placeholder, defaultValue, onChange }) => {
  const registeredUsers = useSelector((reduxStore) => reduxStore[REDUCER_NAMES.AUTH].registeredUsers);
  return (
    <Select
      key={compKey}
      mode={mode}
      onChange={onChange}
      placeholder={placeholder}
      defaultValue={defaultValue}
      style={{ width: mode === 'single' ? '120px' : '200px' }}
      options={registeredUsers.map(({ username }) => ({
        value: username,
        label: username,
      }))}
    />
  );
};

export default SelectUsers;
