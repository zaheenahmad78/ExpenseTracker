import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { ExpenseProvider } from './src/context/ExpenseContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ExpenseProvider>
    </AuthProvider>
  );
}