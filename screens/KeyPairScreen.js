import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, StyleSheet, Text, ScrollView} from 'react-native';
import { deleteKeyPair, getKeyPair, setViewKey } from '../actions/KeyPairAction';
import {Button, Overlay} from 'react-native-elements';

class KeyPairScreen extends Component {

  componentDidMount(){
    this.props.getKeyPair();
  }

  onPressDelete() {
    this.props.deleteKeyPair();
  }

  onPressView(){
    const {viewKey} = this.props;
    this.props.setViewKey(!viewKey);
  }

  onPressCreate(){
    this.props.getKeyPair();
  }

  render(){
    const {viewKey, publicKey, privateKey} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Key Pair Management</Text>
        <View style={styles.optionsContainer}>
          <Button
            disabled={(publicKey === "" || privateKey === "")}
            title="Show Key"
            onPress={this.onPressView.bind(this)}
          />
          <Text>{"\n"}</Text>
          {(publicKey === "" || privateKey === "")?
            <Button
              title="Create Key"
              onPress={this.onPressCreate.bind(this)}
            />: <Text/>
          }
          {(publicKey === "" || privateKey === "")?
            <Text>{"\n"}</Text>: <Text/>
          }
          <Button
            disabled={(publicKey === "" || privateKey === "")}
            title="Delete Key"
            onPress={this.onPressDelete.bind(this)}
          />
        </View>
        <Overlay isVisible={viewKey}>
          <View style={{flex:1}}>
            <ScrollView>
              <Text>
                {publicKey}
              </Text>
              <Text> {"\n"} {"\n"} </Text>
              <Text>
                {privateKey}
              </Text>
            </ScrollView>
            <Button
              title="Close"
              onPress={this.onPressView.bind(this)}
            />
          </View>
        </Overlay>
      </View>
    );
  }

}

const mapStateToProps = (state) => ({
  publicKey: state.get('keyPair').get('publicKey'),
  privateKey: state.get('keyPair').get('privateKey'),
  viewKey: state.get('keyPair').get('viewKey')
});

const styles = StyleSheet.create({
  container: {flex:1, padding:10},
  title: {fontSize: 22, textAlign: 'center'},
  optionsContainer: {flex:1, justifyContent:'center'}
})

export default connect(mapStateToProps,{getKeyPair, deleteKeyPair, setViewKey})(KeyPairScreen);