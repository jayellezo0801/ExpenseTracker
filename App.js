import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Updated import statement
import ExpenseList from './components/ExpenseList';
import AddExpenseForm from './components/AddExpenseForm';

const Stack = createStackNavigator();

const App = () => {
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const handleDeleteExpense = (expenseId) => {
    setExpenses(expenses.filter((expense) => expense.id !== expenseId));
  };

  const saveExpensesToStorage = async (expenses) => {
    try {
      await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
    } catch (error) {
      console.error('Error saving expenses to AsyncStorage:', error);
    }
  };

  const loadExpensesFromStorage = async () => {
    try {
      const storedExpenses = await AsyncStorage.getItem('expenses');
      if (storedExpenses !== null) {
        setExpenses(JSON.parse(storedExpenses));
      }
    } catch (error) {
      console.error('Error loading expenses from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadExpensesFromStorage();
  }, []); // Load expenses from storage when the component mounts

  useEffect(() => {
    saveExpensesToStorage(expenses);
  }, [expenses]); // Save expenses to storage whenever the expenses are updated

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f4f4f4',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="CJ's Petsa de Peligro Tracker">
          {() => (
            <View style={styles.container}>
              <Text style={styles.title}>Expense Form</Text>
              <AddExpenseForm onAddExpense={handleAddExpense} />
              <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
            </View>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
