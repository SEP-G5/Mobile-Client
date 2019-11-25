import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, StyleSheet, Text} from 'react-native';
import { deleteKeyPair, getKeyPair } from '../actions/KeyPairAction';
import {Button} from 'react-native-elements';

class KeyPairScreen extends Component {

  onPressDelete() {
    this.props.deleteKeyPair();
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Key Pair Management</Text>
        <View style={styles.optionsContainer}>
          <Button
            title="Delete Key"
            onPress={this.onPressDelete.bind(this)}
          />
        </View>
      </View>
    );
  }

}

const mapStateToProps = (state) => ({
  publicKey: state.get('keyPair').get('publicKey'),
  privateKey: state.get('keyPair').get('privateKey'),
});

const styles = StyleSheet.create({
  container: {flex:1, padding:10},
  title: {fontSize: 22, textAlign: 'center'},
  optionsContainer: {flex:1, justifyContent:'center'}
})

export default connect(mapStateToProps,{getKeyPair, deleteKeyPair})(KeyPairScreen);