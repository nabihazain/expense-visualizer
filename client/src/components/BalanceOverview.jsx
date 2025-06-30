import React from 'react';
import { useTransactions } from '../context/TransactionContext';

const BalanceOverview = () => {
  const { transactions } = useTransactions();

  const credit = transactions.filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const debit = transactions.filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  const net = credit - debit;

  return (
    <div className="balance">
      <p>Total Credit: ₹{credit}</p>
      <p>Total Debit: ₹{debit}</p>
      <p>Net Balance: ₹{net}</p>
    </div>
  );
};

export default BalanceOverview;
