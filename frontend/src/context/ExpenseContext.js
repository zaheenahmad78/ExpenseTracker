import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const ExpenseContext = createContext({});

export const useExpenses = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchExpenses();
      fetchSummary();
    }
  }, [user]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/expenses');
      setExpenses(response.data);
    } catch (err) {
      setError('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await api.get('/expenses/summary');
      setSummary(response.data.summary || {});
      setTotal(response.data.total || 0);
    } catch (err) {
      console.error(err);
    }
  };

  const addExpense = async (expenseData) => {
    try {
      setLoading(true);
      const response = await api.post('/expenses', expenseData);
      setExpenses([response.data, ...expenses]);
      await fetchSummary();
      return true;
    } catch (err) {
      setError('Failed to add expense');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateExpense = async (id, expenseData) => {
    try {
      setLoading(true);
      const response = await api.put(`/expenses/${id}`, expenseData);
      setExpenses(expenses.map(exp => exp._id === id ? response.data : exp));
      await fetchSummary();
      return true;
    } catch (err) {
      setError('Failed to update expense');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/expenses/${id}`);
      setExpenses(expenses.filter(exp => exp._id !== id));
      await fetchSummary();
      return true;
    } catch (err) {
      setError('Failed to delete expense');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ExpenseContext.Provider value={{
      expenses,
      summary,
      total,
      loading,
      error,
      addExpense,
      updateExpense,
      deleteExpense,
      fetchExpenses,
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};