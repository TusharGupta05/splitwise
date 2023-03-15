import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

const EditableComponent = ({ path, childComponentProps, component }) => {
  const Component = component;
  const defaultValue = useSelector((reduxStore) => _.get(reduxStore, path));
  const childCompProps = { ...childComponentProps };
  if (path.findIndex((val) => val === 'date') !== -1) {
    childCompProps.defaultValue = dayjs(defaultValue);
  } else {
    childCompProps.defaultValue = defaultValue;
  }
  return <Component {...childCompProps} />;
};

EditableComponent.propTypes = {
  path: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
  childCompProps: PropTypes.object,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.object]),
};

export default EditableComponent;
