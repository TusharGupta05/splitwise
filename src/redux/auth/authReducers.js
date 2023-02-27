import LS_CACHE_KEYS from '../../constants/localStorage.cacheKeys';
import AUTH_REDUCERS from '../constants/authReducers.actionTypes';
import {
  setItemInLocalStorage,
  getItemFromLocalStorage,
} from '../../helpers/localStorage';

const authInitialState = {
  currentUser: getItemFromLocalStorage(LS_CACHE_KEYS.CURRENT_USER),
  registeredUsers: getItemFromLocalStorage(LS_CACHE_KEYS.REGISTERED_USERS),
};

const authReducers = (state = authInitialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case AUTH_REDUCERS.CHANGE:
      onChange(newState, action);
      break;
    case AUTH_REDUCERS.LOGIN:
      onLogin(newState, action);
      break;
    case AUTH_REDUCERS.REGISTER:
      onRegister(newState, action);
      break;
    case AUTH_REDUCERS.UPDATE_PROFILE:
      onUpdateProfile(newState, action);
      break;
    case AUTH_REDUCERS.LOGOUT:
      onLogout(newState, action);
      break;
    default:
      break;
  }
  return newState;
};

const onChange = (state, action) => {
  state.currentUser = action.payload;
  setItemInLocalStorage(LS_CACHE_KEYS.CURRENT_USER, state.currentUser);
};
const onLogin = (state, action) => {
  const { username, password } = action.payload;
  const registeredUsers =
    getItemFromLocalStorage(LS_CACHE_KEYS.REGISTERED_USERS) || [];

  const registeredUser = registeredUsers.find(
    (user) => user.username === username && user.password === password
  );
  if (registeredUser) {
    state.currentUser = username;
    setItemInLocalStorage(LS_CACHE_KEYS.CURRENT_USER, state.currentUser);
    return;
  }
  throw 'invalid username or password';
};

const onRegister = (state, action) => {
  const user = action.payload;
  const registeredUsers =
    getItemFromLocalStorage(LS_CACHE_KEYS.REGISTERED_USERS) || [];
  const isRegistered = registeredUsers.find((registeredUser) => {
    return registeredUser.username === user.username;
  });
  if (isRegistered) {
    throw 'User with same username already exists!';
  }
  registeredUsers.push(user);
  setItemInLocalStorage(LS_CACHE_KEYS.REGISTERED_USERS, registeredUsers);
  state.registeredUsers = registeredUsers;
};

const onUpdateProfile = (state, action) => {
  const updatedUser = action.payload;
  const registeredUserIndex = state.registeredUsers.findIndex(
    (registeredUser) => registeredUser.username === updatedUser.username
  );
  if (registeredUserIndex !== -1) {
    state.registeredUsers[registeredUserIndex] = {
      password: state.registeredUsers[registeredUserIndex].password,
      ...updatedUser,
    };
    setItemInLocalStorage(
      LS_CACHE_KEYS.REGISTERED_USERS,
      state.registeredUsers
    );
  }
};

const onLogout = (state) => {
  state.currentUser = null;
  setItemInLocalStorage(LS_CACHE_KEYS.CURRENT_USER, null);
};

export default authReducers;
