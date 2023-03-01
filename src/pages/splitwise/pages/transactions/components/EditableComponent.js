import React from 'react';
import { useSelector } from 'react-redux';
import { REDUCER_NAMES } from '../../../../../constants/reducers.constants';

const EditableComponent = ({ parentComponentProps, childComponentProps, component }) => {
  const { index, transactionKey } = parentComponentProps;

  const Component = component;
  const defaultValue = useSelector((reduxStore) => reduxStore[REDUCER_NAMES.TRANSACTIONS][index][transactionKey]);
  const childCompProps = { ...childComponentProps };
  childCompProps.defaultValue = defaultValue;
  return <Component {...childCompProps} />;
};

export default EditableComponent;
