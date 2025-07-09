import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import axios from '../api/axios';

// Font Awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const TransactionItem = ({ transaction }) => {
  const { dispatch } = useTransactions();
  const [showModal, setShowModal] = useState(false);
  const [editForm, setEditForm] = useState({
    type: transaction.type,
    amount: transaction.amount,
    category: transaction.category,
    description: transaction.description,
  });

  const handleDelete = async () => {
    try {
      await axios.delete(`https://expense-visualizer-r84u.onrender.com/${transaction._id}`);
      dispatch({ type: 'DELETE', payload: transaction._id });
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = {
        ...editForm,
        amount: parseFloat(editForm.amount),
      };
      const res = await axios.put(`https://expense-visualizer-r84u.onrender.com/${transaction._id}`, updated);
      dispatch({ type: 'EDIT', payload: res.data });
      setShowModal(false);
    } catch (error) {
      console.error('Edit failed:', error);
    }
  };

  return (
    <>
      <div className={`transaction ${transaction.type}`}>
        <span>{transaction.category}</span>
        <span>₹{transaction.amount}</span>
        <span>{transaction.description}</span>
        <div>
          <button onClick={() => setShowModal(true)} title="Edit">
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={handleDelete} title="Delete" style={{ marginLeft: '10px' }}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Edit Transaction</h3>
            <form onSubmit={handleEditSubmit}>
              <select
                value={editForm.type}
                onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
              >
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
              <input
                type="number"
                value={editForm.amount}
                onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                placeholder="Amount"
                required
              />
              <input
                type="text"
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                placeholder="Category"
                required
              />
              <input
                type="text"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                placeholder="Description"
              />
              <div className="modal-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionItem;
