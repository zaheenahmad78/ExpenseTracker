import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useExpenses } from '../context/ExpenseContext';

const ExpenseListScreen = ({ navigation }) => {
  const { expenses, loading, deleteExpense, fetchExpenses } = useExpenses();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchExpenses();
    setRefreshing(false);
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteExpense(id);
          },
        },
      ]
    );
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

  const renderExpense = ({ item }) => (
    <TouchableOpacity
      style={styles.expenseCard}
      onPress={() => navigation.navigate('Add', { expense: item })}
      onLongPress={() => handleDelete(item._id)}
    >
      <View style={styles.expenseLeft}>
        <View style={[styles.categoryIcon, { backgroundColor: getCategoryColor(item.category) }]}>
          <Text style={styles.categoryIconText}>{item.category[0]}</Text>
        </View>
        <View>
          <Text style={styles.categoryName}>{item.category}</Text>
          <Text style={styles.expenseNote}>{item.note || 'No note'}</Text>
          <Text style={styles.expenseDate}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
      </View>
      <View style={styles.expenseRight}>
        <Text style={styles.expenseAmount}>₹{item.amount.toFixed(2)}</Text>
        <Icon name="chevron-forward" size={20} color="#ccc" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {expenses.length === 0 && !loading ? (
        <View style={styles.emptyContainer}>
          <Icon name="document-text-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>No expenses found</Text>
          <Text style={styles.emptySubtext}>Tap + to add your first expense</Text>
        </View>
      ) : (
        <FlatList
          data={expenses}
          renderItem={renderExpense}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 15,
  },
  expenseCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  expenseLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  categoryIconText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  expenseNote: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  expenseDate: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  expenseRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginRight: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 10,
  },
});

export default ExpenseListScreen;