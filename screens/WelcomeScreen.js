import React, {Component} from 'react';
import { View } from 'react-native';
import SimpleComponent from '../components/SimpleComponent';
import * as Font from 'expo-font';

export default class HomeScreen extends Component {
  componentDidMount() {
    Font.loadAsync({
      'roboto': require('./../assets/fonts/Roboto-Regular.ttf'),
    });
  }

  render(){
    return (
      <View>
        <SimpleComponent />
      </View>
    );
  }

}