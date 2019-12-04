import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, StyleSheet, Text, ScrollView} from 'react-native';
import { deleteKeyPair, getKeyPair, setViewKey } from '../actions/KeyPairAction';
import {Button, Overlay} from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';

class KeyPairScreen extends Component {

  static navigationOptions = {
    title: 'Key Management',
  };

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
            <View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
                <QRCode
                  value={JSON.stringify(publicKey)}
                  size={200}
                />
            </View>
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
  optionsContainer: {flex:1, justifyContent:'center'}
})

export default connect(mapStateToProps,{getKeyPair, deleteKeyPair, setViewKey})(KeyPairScreen);