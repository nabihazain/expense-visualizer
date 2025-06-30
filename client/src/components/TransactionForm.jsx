import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import axios from '../api/axios';

const TransactionForm = () => {
  const { dispatch } = useTransactions();

  const [form, setForm] = useState({
    type: 'credit',
    amount: '',
    category: '',
    description: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newTransaction = {
        ...form,
        amount: parseFloat(form.amount),
      };

      const res = await axios.post('/transactions', newTransaction);
      dispatch({ type: 'ADD', payload: res.data });

      // Reset form
      setForm({
        type: 'credit',
        amount: '',
        category: '',
        description: '',
      });
    } catch (err) {
      console.error('Error adding transaction:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="credit">Credit</option>
        <option value="debit">Debit</option>
      </select>

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category (e.g. Food, Travel)"
        value={form.category}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
