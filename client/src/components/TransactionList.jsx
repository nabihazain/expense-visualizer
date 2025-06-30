import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import TransactionItem from './TransactionItem';
import Filter from './Filter';

const TransactionList = () => {
  const { transactions } = useTransactions();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filtered = selectedCategory === 'all'
    ? transactions
    : transactions.filter(t => t.category.toLowerCase() === selectedCategory);

  return (
    <div>
      <Filter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div>
        {filtered.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          filtered.map(t => <TransactionItem key={t._id} transaction={t} />)
        )}
      </div>
    </div>
  );
};

export default TransactionList;
