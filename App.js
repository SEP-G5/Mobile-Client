import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/ConfigureStore';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <Provider store={configureStore()}>
      <AppNavigator />
    </Provider>
  );
}
