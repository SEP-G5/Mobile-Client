import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import WelcomeScreen from '../screens/WelcomeScreen';
import KeyPairScreen from '../screens/KeyPairScreen';
import TransactionScreen from '../screens/TransactionScreen';
import ScannerScreen from '../screens/ScannerScreen';

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
});

const WelcomeStack = createStackNavigator(
    {
      Home: WelcomeScreen,
      Scanner: ScannerScreen
    },
    config
);

WelcomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    ),
};

const KeyPairStack = createStackNavigator(
  {Key: KeyPairScreen},
  config
)

KeyPairStack.navigationOptions = {
  tabBarLabel: 'Key',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-key`
          : 'md-key'
      }
    />
  ),
};

const TransactionStack = createStackNavigator(
  {Transaction: TransactionScreen},
  config
)

TransactionStack.navigationOptions = {
  tabBarLabel: 'Transactions',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-list`
          : 'md-list'
      }
    />
  ),
};

export default createBottomTabNavigator({
  WelcomeStack,
  KeyPairStack,
  TransactionStack
});