import AUTH_ERRORS from './authErrors.constants';

const VALIDATION_RULES = {
  EMAIL: [
    { required: true, message: AUTH_ERRORS.EMPTY_EMAIL },
    {
      type: 'email',
      message: AUTH_ERRORS.INVALID_EMAIL,
    },
  ],
  NAME: [
    { required: true, message: AUTH_ERRORS.EMPTY_NAME },
    {
      pattern: /^[A-Za-z\s]{1,}[.]{0,1}[A-Za-z\s]{0,}$/,
      message: AUTH_ERRORS.INVALID_NAME,
    },
  ],
  USERNAME: [
    { required: true, message: AUTH_ERRORS.EMPTY_USERNAME },
    // {
    //   // pattern: new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/),
    //   message: AUTH_ERRORS.INVALID_USERNAME,
    // },
  ],
};

export default VALIDATION_RULES;
