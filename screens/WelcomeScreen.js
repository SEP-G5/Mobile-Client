import React, {Component} from 'react';
import { View } from 'react-native';
import SimpleComponent from '../components/SimpleComponent';
import * as Font from 'expo-font';

export default class HomeScreen extends Component {
  
  render(){
    return (
      <View>
        <SimpleComponent />
      </View>
    );
  }

}