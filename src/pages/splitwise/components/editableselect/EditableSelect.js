import React, { useCallback } from 'react';
import CreatableSelect from 'react-select/creatable';

const EditableSelect = (props) => {
  const theme = useCallback(
    (baseTheme) => ({
      ...baseTheme,
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
  return <CreatableSelect {...props} theme={theme} />;
};

export default EditableSelect;
