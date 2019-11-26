import React, {Component} from 'react';
import { View } from 'react-native';
import SimpleComponent from '../components/SimpleComponent';
import TopBarIcon from '../components/TopBarIcon';
import { Platform, TouchableOpacity } from 'react-native';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    headerRight: <TouchableOpacity>
      <TopBarIcon name={Platform.OS === 'ios'?`ios-camera`:'md-camera'}/>
    </TouchableOpacity>
  };

  render(){
    return (
      <View>
        <SimpleComponent />
      </View>
    );
  }

}