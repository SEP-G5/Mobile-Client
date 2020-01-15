import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getKeyPair} from "../actions/KeyPairAction";
import {getOwnedBikes, refreshOwnedBikes} from "../actions/BikeAction";
import TopBarIcon from '../components/TopBarIcon';
import { Platform, TouchableOpacity, View, FlatList, Text, SafeAreaView, StyleSheet, ScrollView, RefreshControl} from 'react-native';
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

  componentWillReceiveProps(nextProps, nextContext) {
      const {publicKey: newPublicKey} = nextProps;
      const {publicKey: oldPublicKey} = this.props;

      if (newPublicKey !== oldPublicKey){
          this.props.refreshOwnedBikes(newPublicKey);
          this.props.getOwnedBikes();
      }
  }

  onPressItem = (item) => {
      this.props.navigation.navigate('Detail', {id:item});
  };

  renderItem = (item) => {
    return (
        <TouchableOpacity>
            <ListItem
                title={`#${_.truncate(item,{length: 30})}`}
                titleStyle={{color:'#aaa', fontStyle:'italic'}}
                bottomDivider
                chevron
                onPress={() => this.onPressItem(item)}
            />
        </TouchableOpacity>
    );
  };

  _onRefresh = () => {
      const {publicKey} = this.props;
      this.props.refreshOwnedBikes(publicKey);
  };

  render(){
    const {bikes, loadingBikes} = this.props;

    if (loadingBikes) {
        return <View style={styles.container}>
            <Text style={{fontSize:24, textAlign:'center'}}>Loading Your Bikes...</Text>
        </View>
    }

    if (!bikes || bikes.length === 0) {
        return <View style={styles.container}>
            <Text style={{fontSize:24, marginTop:15, textAlign:'center'}}>You don't own any bikes...</Text>
            <Button
                title="Register a bike!"
                onPress={ () => this.props.navigation.navigate('RegisterBike')}
                style={{marginTop:30, paddingLeft:20,paddingRight:20}}
            />
        </View>
    }

    return (
      <View style={{flex:1}}>
        <ScrollView
            refreshControl={<RefreshControl refreshing={loadingBikes} onRefresh={() => this._onRefresh()} />}
        >
          <SafeAreaView style={styles.container}>
            <FlatList
              data={bikes}
              renderItem={({item}) => this.renderItem(item)}
              keyExtractor={item => item}
            />
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }

}

const mapStateToProps = (state) => ({
    publicKey: state.get('keyPair').get('publicKey'),
    bikes: state.get('bike').get('bikes'),
    loadingBikes: state.get('bike').get('loading')
});

export default connect(mapStateToProps, {getKeyPair, refreshOwnedBikes, getOwnedBikes})(HomeScreen);

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', paddingBottom: 10, paddingTop: 10, paddingLeft: 5, paddingRight: 5},
    item: {flex:1,paddingTop:20, paddingBottom:20,backgroundColor:'#eee',marginBottom:2},
    itemTxt: {paddingLeft:5, color:'#000', fontSize: 18}
});