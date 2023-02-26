import React from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';

const SelectUsers = ({
  mode = 'single',
  placeholder,
  initialState,
  handleChange,
}) => {
  const registeredUsers = useSelector((reduxStore) => {
    return reduxStore.auth.registeredUsers;
  });
  return (
    <Select
      mode={mode}
      onChange={handleChange}
      placeholder={placeholder}
      defaultValue={initialState}
      style={{ width: '120px' }}
      options={registeredUsers.map(({ username, ...rem }) => {
        return {
          value: username,
          label: username,
        };
      })}
    />
  );
};

export default SelectUsers;
