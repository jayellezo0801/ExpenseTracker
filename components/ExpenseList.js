// ExpenseList.js
import React from 'react';
import { ScrollView, Text, View, Button, StyleSheet } from 'react-native';


const ExpenseList = ({ expenses, onDeleteExpense }) => {
  const styles = StyleSheet.create({
    expenseItem: {
      height: 150,
      marginBottom: 10,
      padding: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    deleteButton: {
      backgroundColor: 'red', // Set the background color to red
    },
  });

  const renderExpenseItems = () => {
    const reversedExpenses = expenses.slice().reverse();

    return reversedExpenses.map((item) => (
      <View key={item.id} style={styles.expenseItem}>
        <Text>{item.description}</Text>
        <Text>₱{item.amount}</Text>
        {item.date && typeof item.date === 'object' && (
          <Text>Date: {item.date.toISOString().split('T')[0]}</Text>
        )}
        <Text>Category: {item.category}</Text>
        <Button
          title="Delete"
          onPress={() => onDeleteExpense(item.id)}
          color="red" // Set the text color to white for better visibility
          style={styles.deleteButton} // Apply the red background color
        />
      </View>
    ));
  };

  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>Expense List</Text>
        {expenses.length > 0 ? (
          renderExpenseItems()
        ) : (
          <Text>No expenses yet</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ExpenseList;
