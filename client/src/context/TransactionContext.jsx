import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from '../api/axios';

const TransactionContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'ADD':
      return [...state, action.payload];
    case 'DELETE':
      return state.filter(t => t._id !== action.payload);
    case 'EDIT':
      return state.map(t => (t._id === action.payload._id ? action.payload : t));
    default:
      return state;
  }
}

export const TransactionProvider = ({ children }) => {
  const [transactions, dispatch] = useReducer(reducer, []);

  // Fetch from backend on mount
  useEffect(() => {
    axios.get('https://expense-visualizer-r84u.onrender.com')
      .then(res => dispatch({ type: 'SET', payload: res.data }))
      .catch(err => console.error(err));
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);
