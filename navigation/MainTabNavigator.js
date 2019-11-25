import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import WelcomeScreen from '../screens/WelcomeScreen';
import KeyPairScreen from '../screens/KeyPairScreen';

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
});

const WelcomeStack = createStackNavigator(
    {Home: WelcomeScreen},
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


export default createBottomTabNavigator({
  WelcomeStack,
  KeyPairStack
});