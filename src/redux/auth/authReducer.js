import LS_CACHE_KEYS from '../../constants/localStorage.cacheKeys';
import AUTH_REDUCER from '../constants/authReducer.actionTypes';
import {
  setItemInLocalStorage,
  getItemFromLocalStorage,
} from '../../helpers/localStorage';
import { handleActions } from 'redux-actions';
import produce from 'immer';

const authInitialState = {
  currentUser: getItemFromLocalStorage(LS_CACHE_KEYS.CURRENT_USER),
  registeredUsers: getItemFromLocalStorage(LS_CACHE_KEYS.REGISTERED_USERS),
};

const handleUserChange = produce((state, action) => {
  state.currentUser = action.payload;
  setItemInLocalStorage(LS_CACHE_KEYS.CURRENT_USER, state.currentUser);
});
const handleLogin = produce((state, action) => {
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
});

const handleRegister = produce((state, action) => {
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
});

const handleUpdateProfile = produce((state, action) => {
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
});

const handleLogout = produce((state) => {
  state.currentUser = null;
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
  authInitialState
);

export default authReducer;
