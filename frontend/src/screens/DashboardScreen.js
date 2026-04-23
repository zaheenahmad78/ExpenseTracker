import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useExpenses } from '../context/ExpenseContext';
import { useAuth } from '../context/AuthContext';

const DashboardScreen = () => {
  const { summary, total, expenses, loading, fetchExpenses, fetchSummary } = useExpenses();
  const { user, logout } = useAuth();

  const categories = Object.entries(summary);
  const recentExpenses = expenses.slice(0, 5);

  const onRefresh = async () => {
    await fetchExpenses();
    await fetchSummary();
  };

  const getCategoryColor = (category) => {
    const colors = {
      Food: '#FF6B6B',
      Transport: '#4ECDC4',
      Shopping: '#45B7D1',
      Entertainment: '#96CEB4',
      Bills: '#FFEAA7',
      Healthcare: '#DDA0DD',
      Education: '#98D8C8',
      Other: '#B0A0A0',
    };
    return colors[category] || '#007AFF';
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {user?.name}</Text>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total Expenses</Text>
        <Text style={styles.totalAmount}>₹{total.toFixed(2)}</Text>
      </View>

      <Text style={styles.sectionTitle}>Category Summary</Text>
      {categories.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No expenses added yet</Text>
        </View>
      ) : (
        categories.map(([category, amount]) => (
          <View key={category} style={styles.categoryItem}>
            <Text style={styles.categoryName}>{category}</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${(amount / total) * 100}%`,
                    backgroundColor: getCategoryColor(category),
                  },
                ]}
              />
            </View>
            <Text style={styles.categoryAmount}>₹{amount.toFixed(2)}</Text>
          </View>
        ))
      )}

      <Text style={styles.sectionTitle}>Recent Expenses</Text>
      {recentExpenses.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No recent expenses</Text>
        </View>
      ) : (
        recentExpenses.map((expense) => (
          <View key={expense._id} style={styles.expenseItem}>
            <View>
              <Text style={styles.expenseCategory}>{expense.category}</Text>
              <Text style={styles.expenseNote}>{expense.note || 'No note'}</Text>
              <Text style={styles.expenseDate}>
                {new Date(expense.date).toLocaleDateString()}
              </Text>
            </View>
            <Text style={styles.expenseAmount}>₹{expense.amount.toFixed(2)}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
  },
  totalCard: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  totalLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  totalAmount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  categoryItem: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  categoryAmount: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'right',
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
  },
  expenseCategory: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  expenseNote: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  expenseDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  emptyContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 40,
    borderRadius: 10,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  },
});

export default DashboardScreen;