import React from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import { REDUCER_NAMES } from '../../../../constants/reducers.constants';

const SelectUsers = ({ mode = 'single', placeholder, initialState, handleChange }) => {
  const registeredUsers = useSelector((reduxStore) => reduxStore[REDUCER_NAMES.AUTH].registeredUsers);
  return (
    <Select
      key={initialState}
      mode={mode}
      onChange={handleChange}
      placeholder={placeholder}
      defaultValue={initialState}
      style={{ width: '120px' }}
      options={registeredUsers.map(({ username, ...rem }) => ({
        value: username,
        label: username,
      }))}
    />
  );
};

export default SelectUsers;
