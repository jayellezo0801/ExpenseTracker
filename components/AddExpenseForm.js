import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AddExpenseForm = ({ onAddExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  const handleAddExpense = () => {
    if (!description || !amount || !date) {
      return;
    }

    onAddExpense({
      id: Math.random(),
      description,
      amount: parseFloat(amount),
      date: new Date(date),
      category,
    });

    setDescription('');
    setAmount('');
    setDate('');
    setCategory('');
  };

  const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: 'aquamarine',
      borderRadius: 8,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    input: {
      marginBottom: 10,
      padding: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
    },
    button: {
      backgroundColor: '#3498db',
      padding: 10,
      borderRadius: 4,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Expense description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Expense amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Expense date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Expense category"
        value={category}
        onChangeText={setCategory}
      />
      <Button title="Add Expense" onPress={handleAddExpense} style={styles.button} />
    </View>
  );
};

export default AddExpenseForm;
