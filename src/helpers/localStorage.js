const setItemInLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value, null, 2));

const getItemFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

export { setItemInLocalStorage, getItemFromLocalStorage };
