import React, { useCallback } from 'react';
import CreatableSelect from 'react-select/creatable';
import { capitalizeFirst } from '../../../../helpers/capitalizeFirst';

const EditableSelect = (props) => {
  const newProps = { ...props };
  if (newProps.value) {
    newProps.value = {
      value: newProps.value,
      label: capitalizeFirst(newProps.value),
    };
  }
  const theme = useCallback(
    (baseTheme) => ({
      ...baseTheme,
      spacing: {
        ...baseTheme.spacing,
        controlHeight: 10,
        baseUnit: 3,
      },
      borderRadius: 5,
      colors: {
        ...baseTheme.colors,
        text: 'rgba(0, 0, 0, 0.88)',
        primary25: 'rgba(0, 0, 0, 0.04)',
        primary: '#1ac29f',
        fontSize: '10px',
      },
      fontSize: '10px',
    }),
    [],
  );
  return (
    <div style={newProps.style}>
      <CreatableSelect
        {...newProps}
        theme={theme}
        components={{
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  );
};

export default EditableSelect;
