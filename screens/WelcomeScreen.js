import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getKeyPair} from "../actions/KeyPairAction";
import TopBarIcon from '../components/TopBarIcon';
import { Platform, TouchableOpacity, View, FlatList, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {ListItem, Button} from 'react-native-elements';
import _ from 'lodash';

class HomeScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
        title: 'My Bikes',
        headerRight: <TouchableOpacity onPress={() => navigation.navigate('RegisterBike')}>
          <TopBarIcon name={Platform.OS === 'ios'?`ios-add`:'md-add'}/>
        </TouchableOpacity>
      };
    };

  componentDidMount() {
      this.props.getKeyPair();
  }

  onPressItem = (item) => {
      this.props.navigation.navigate('Detail', {item});
  };

  renderItem = (item) => {
    return (
        <TouchableOpacity>
            <ListItem
                title={_.truncate(item.name,{length: 30})}
                subtitle={`# ${item.id}`}
                subtitleStyle={{color:'#aaa', fontStyle:'italic'}}
                bottomDivider
                chevron
                onPress={() => this.onPressItem(item)}
            />
        </TouchableOpacity>
    );
  };

  render(){
    const {loading} = this.props;

    if (loading) {
        return <View style={{flex:1, justifyContent:'center'}}>
            <Text style={{fontSize:24, textAlign:'center'}}>Loading...</Text>
        </View>
    }

    return (
      <View style={{flex:1}}>
        <ScrollView>
          <SafeAreaView style={styles.container}>
            <FlatList
              data={MY_BIKES}
              renderItem={({item}) => this.renderItem(item)}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
        </ScrollView>
        <Button
            title="Receive Ownership"
            onPress={ () => alert("Receive Bike")}
            style={{marginBottom:15, paddingLeft:5,paddingRight:5}}
        />
      </View>
    );
  }

}

const mapStateToProps = (state) => ({
   loading: state.get('keyPair').get('loading')
});

export default connect(mapStateToProps, {getKeyPair})(HomeScreen);

const MY_BIKES = [
    {id: "JH4K3H5JDFJHDFJ34", name: "CITYCYKEL LÅGT INSTEG ELOPS 520 RÖD"},
    {id: "JHASDJKHFSAJH434L", name: "MTB ROCKRIDER 100 24'' 9-12 ÅR"},
    {id: "JKLSDHFADFHJ34343", name: "MTB ST 50 26'' SVART"}
  ];

const styles = StyleSheet.create({
  container: {flex:1},
  item: {flex:1,paddingTop:20, paddingBottom:20,backgroundColor:'#eee',marginBottom:2},
  itemTxt: {paddingLeft:5, color:'#000', fontSize: 18}
});