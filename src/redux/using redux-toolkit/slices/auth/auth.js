// import { createSlice } from '@reduxjs/toolkit';
// import LS_CACHE_KEYS from '../../../../constants/localStorage.cacheKeys';
// import {
//   setItemInLocalStorage,
//   getItemFromLocalStorage,
// } from '../../../../helpers/localStorage';

// const authInitialState = {
//   currentUser: getItemFromLocalStorage(LS_CACHE_KEYS.CURRENT_USER),
//   registeredUsers: getItemFromLocalStorage(LS_CACHE_KEYS.REGISTERED_USERS),
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: authInitialState,
//   reducers: {
//     onChange(state, action) {
//       state.currentUser = action.payload;
//       setItemInLocalStorage(LS_CACHE_KEYS.CURRENT_USER, state.currentUser);
//     },
//     onLogin(state, action) {
//       const { username, password } = action.payload;
//       const registeredUsers =
//         getItemFromLocalStorage(LS_CACHE_KEYS.REGISTERED_USERS) || [];

//       const registeredUser = registeredUsers.find(
//         (user) => user.username === username && user.password === password
//       );
//       if (registeredUser) {
//         state.currentUser = username;
//         setItemInLocalStorage(LS_CACHE_KEYS.CURRENT_USER, state.currentUser);
//       }
//     },

//     onRegister(state, action) {
//       const user = action.payload;
//       const registeredUsers =
//         getItemFromLocalStorage(LS_CACHE_KEYS.REGISTERED_USERS) || [];
//       const isRegistered = registeredUsers.find((registeredUser) => {
//         return registeredUser.username === user.username;
//       });
//       if (isRegistered) {
//         return false;
//       }
//       registeredUsers.push(user);
//       setItemInLocalStorage(LS_CACHE_KEYS.REGISTERED_USERS, registeredUsers);
//       state[LS_CACHE_KEYS.REGISTERED_USERS] = registeredUsers;
//       return true;
//     },

//     onUpdateProfile(state, action) {
//       const updatedUser = action.payload;
//       const registeredUserIndex = state.registeredUsers.findIndex(
//         (registeredUser) => registeredUser.username === updatedUser.username
//       );
//       if (registeredUserIndex !== -1) {
//         state.registeredUsers[registeredUserIndex] = {
//           password: state.registeredUsers[registeredUserIndex].password,
//           ...updatedUser,
//         };
//         setItemInLocalStorage(
//           LS_CACHE_KEYS.REGISTERED_USERS,
//           state.registeredUsers
//         );
//       }
//     },

//     onLogout(state) {
//       state.currentUser = null;
//       setItemInLocalStorage(LS_CACHE_KEYS.CURRENT_USER, null);
//     },
//   },
// });

// export default authSlice;
