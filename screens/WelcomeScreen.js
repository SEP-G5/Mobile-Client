import React, {Component} from 'react';
import SimpleComponent from '../components/SimpleComponent';
import TopBarIcon from '../components/TopBarIcon';
import { Platform, TouchableOpacity, View, FlatList, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {ListItem, Button} from 'react-native-elements';

export default class HomeScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
        title: 'Home',
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('Scanner')}>
          <TopBarIcon name={Platform.OS === 'ios'?`ios-camera`:'md-camera'}/>
        </TouchableOpacity>
      };
    };

  renderItem = (item) => {
    return (
      <ListItem
        title={`#${item.id}`}
        titleStyle={{color:'#aaa', fontStyle:'italic'}}
        bottomDivider
        chevron
      />
    );
  }

  render(){
    return (
      <View style={{flex:1}}>
        <ScrollView>
          <SafeAreaView style={styles.container}>
            <Text style={styles.title}> My Bikes </Text>
            <FlatList
              data={MY_BIKES}
              renderItem={({item}) => this.renderItem(item)}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
        </ScrollView>
        <Button
            title="Send Ownership"
            onPress={ () => alert("Transfer Bike")}
            style={{marginBottom:15, paddingLeft:5,paddingRight:5}}

        />
        <Button
            title="Receive Ownership"
            onPress={ () => alert("Receive Bike")}
            style={{marginBottom:15, paddingLeft:5,paddingRight:5}}
        />
      </View>
    );
  }

}

const MY_BIKES = [
    {id: "JH4K3H5JDFJHDFJ34"},
    {id: "JHASDJKHFSAJH434L"},
    {id: "JKLSDHFADFHJ34343"}
  ];

const styles = StyleSheet.create({
  container: {flex:1},
  title: {fontSize:20, paddingTop:10},
  item: {flex:1,paddingTop:20, paddingBottom:20,backgroundColor:'#eee',marginBottom:2},
  itemTxt: {paddingLeft:5, color:'#000', fontSize: 18}
});