import React, { createContext, useReducer, useEffect } from 'react';
import api from '../api';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null
};

const AuthContext = createContext(initialState);

const reducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN_START': return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS': 
      localStorage.setItem('token', action.payload.token);
      return { ...state, loading:false, token: action.payload.token, user: action.payload.user };
    case 'LOGIN_FAIL': return { ...state, loading:false, error: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return { ...initialState, token: null };
    case 'SET_USER':
      return { ...state, user: action.payload };
    default: return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchMe = async () => {
      if (!state.token) return;
      try {
        const res = await api.get('/auth/me');
        dispatch({ type: 'SET_USER', payload: res.data });
      } catch (err) {
        dispatch({ type: 'LOGOUT' });
      }
    };
    fetchMe();
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
