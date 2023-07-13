import { handleActions } from 'redux-actions';
import produce from 'immer';
import LS_CACHE_KEYS from '../../constants/localStorage.cacheKeys';
import AUTH_REDUCER from '../constants/authReducer.actionTypes';
import { setItemInLocalStorage, getItemFromLocalStorage } from '../../helpers/localStorage';

const authInitialState = {
  currentUser: getItemFromLocalStorage(LS_CACHE_KEYS.CURRENT_USER) || '',
  registeredUsers: getItemFromLocalStorage(LS_CACHE_KEYS.REGISTERED_USERS) || [],
};

const handleUserChange = produce((state, action) => {
  const newState = state;
  newState.currentUser = action.payload;
  setItemInLocalStorage(LS_CACHE_KEYS.CURRENT_USER, newState.currentUser);
});
const handleLogin = produce((state, action) => {
  const newState = state;
  const { username, password } = action.payload;

  const { registeredUsers } = state;
  const registeredUser = registeredUsers.find((user) => user.username === username && user.password === password);
  if (registeredUser) {
    newState.currentUser = username;
    setItemInLocalStorage(LS_CACHE_KEYS.CURRENT_USER, newState.currentUser);
    return;
  }
  throw new Error('Invalid username or password');
});

const handleRegister = produce((state, action) => {
  const newState = state;
  const user = action.payload;
  const { registeredUsers } = state;
  const isRegistered = registeredUsers.find((registeredUser) => registeredUser.username === user.username);
  if (isRegistered) {
    throw new Error('User with same username already exists!');
  }
  registeredUsers.push(user);
  setItemInLocalStorage(LS_CACHE_KEYS.REGISTERED_USERS, registeredUsers);
  newState.registeredUsers = registeredUsers;
});

const handleUpdateProfile = produce((state, action) => {
  const newState = state;
  const updatedUser = action.payload;
  const registeredUserIndex = newState.registeredUsers.findIndex((registeredUser) => registeredUser.username === updatedUser.username);
  if (registeredUserIndex !== -1) {
    newState.registeredUsers[registeredUserIndex] = {
      password: newState.registeredUsers[registeredUserIndex].password,
      ...updatedUser,
    };

    setItemInLocalStorage(LS_CACHE_KEYS.REGISTERED_USERS, newState.registeredUsers);
  }
});

const handleLogout = produce((state) => {
  const newState = state;
  newState.currentUser = null;
  setItemInLocalStorage(LS_CACHE_KEYS.CURRENT_USER, null);
});

const authReducer = handleActions(
  {
    [AUTH_REDUCER.HANDLE_USER_CHANGE]: handleUserChange,
    [AUTH_REDUCER.HANDLE_LOGIN]: handleLogin,
    [AUTH_REDUCER.HANDLE_REGISTER]: handleRegister,
    [AUTH_REDUCER.HANDLE_UPDATE_PROFILE]: handleUpdateProfile,
    [AUTH_REDUCER.HANDLE_LOGOUT]: handleLogout,
  },
  authInitialState,
);

export default authReducer;
