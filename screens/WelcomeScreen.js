import React, {Component} from 'react';
import { View } from 'react-native';
import SimpleComponent from '../components/SimpleComponent';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  render(){
    return (
      <View>
        <SimpleComponent />
      </View>
    );
  }

}