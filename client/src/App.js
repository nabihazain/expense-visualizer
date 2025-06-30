import React from 'react';
import { TransactionProvider } from './context/TransactionContext';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import BalanceOverview from './components/BalanceOverview';
import './styles.css';

function App() {
  return (
    <TransactionProvider>
      <div className="container">
        <h1>Expense Tracker</h1>
        <BalanceOverview />
        <TransactionForm />
        <TransactionList />
      </div>
    </TransactionProvider>
  );
}

export default App;
