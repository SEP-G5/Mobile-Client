import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, FlatList, Text, SafeAreaView, StyleSheet} from 'react-native';
import TopBarIcon from '../components/TopBarIcon';
import { Platform } from 'react-native';
import {ListItem} from 'react-native-elements';

class TransactionScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Transactions',
      headerRight: <TopBarIcon name={Platform.OS === 'ios'?`ios-more`:'md-more'}/>
    }
  };

  renderItem = (item) => {
    return (
      <ListItem
        title={item.message}
        subtitle={`#${item.id}`}
        subtitleStyle={{color:'#aaa', fontStyle:'italic'}}
        bottomDivider
        chevron
      />
    );
  }

  render () {
    return (
      <View style={{flex:1}}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={({item}) => this.renderItem(item)}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const DATA = [
  {id:"1", message: "Selling Bike", date:'2019-11-24'},
  {id:"2", message: "Buying Bike", date:'2019-11-25'},
  {id:"3", message: "Bike Stolen", date:'2019-11-25'}

];

const mapStateToProps = (state) => ({
  
});

const styles = StyleSheet.create({
  container: {flex:1},
  item: {flex:1,paddingTop:20, paddingBottom:20,backgroundColor:'#eee',marginBottom:2},
  itemTxt: {paddingLeft:5, color:'#000', fontSize: 18}
})

export default connect(mapStateToProps, {})(TransactionScreen);