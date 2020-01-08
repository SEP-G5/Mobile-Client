import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/ConfigureStore';
import AppNavigator from './navigation/AppNavigator';
import * as TaskManager from 'expo-task-manager';
import { SEND_PENDING_TRANSACTIONS_TASK, sendPendingTransactions } from './actions/TransactionAction';

TaskManager.defineTask(SEND_PENDING_TRANSACTIONS_TASK, sendPendingTransactions);

export default function App() {
  return (
    <Provider store={configureStore()}>
      <AppNavigator />
    </Provider>
  );
}
