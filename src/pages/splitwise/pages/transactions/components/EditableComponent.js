import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const EditableComponent = ({ path, childComponentProps, component }) => {
  const Component = component;
  const defaultValue = useSelector((reduxStore) => _.get(reduxStore, path));
  const childCompProps = { ...childComponentProps };
  childCompProps.defaultValue = defaultValue;
  return <Component {...childCompProps} />;
};

export default EditableComponent;
