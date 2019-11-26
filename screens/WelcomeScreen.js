import React, {Component} from 'react';
import { View } from 'react-native';
import SimpleComponent from '../components/SimpleComponent';
import TopBarIcon from '../components/TopBarIcon';
import { Platform, TouchableOpacity } from 'react-native';

export default class HomeScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
        title: 'Home',
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Scanner')}>
          <TopBarIcon name={Platform.OS === 'ios'?`ios-camera`:'md-camera'}/>
        </TouchableOpacity>
      };
    };

  render(){
    return (
      <View>
        <SimpleComponent />
      </View>
    );
  }

}