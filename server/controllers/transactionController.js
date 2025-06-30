const Transaction = require("../models/Transaction");

exports.getAllTransactions = async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
};

exports.getTransactionById = async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  res.json(transaction);
};

exports.createTransaction = async (req, res) => {
  const newTransaction = new Transaction(req.body);
  const saved = await newTransaction.save();
  res.status(201).json(saved);
};

exports.updateTransaction = async (req, res) => {
  const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteTransaction = async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Transaction deleted" });
};
