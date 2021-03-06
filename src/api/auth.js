import Cookies from 'js-cookie';
const TokenKey = 'jwt';

// 存储 token
export const getToken = () => Cookies.get(TokenKey);

export const setToken = token => Cookies.set(TokenKey, token);

export const removeToken = () => Cookies.remove(TokenKey);

// 存储用户名
export const getUser = () => Cookies.get('username');

export const setUser = name => Cookies.set('username', name);

export const removeUser = () => Cookies.remove('username');
