import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';

class TransactionScreen extends Component {
  render () {
    return (
      <View/>
    );
  }
}

const mapStateToProps = (state) => ({
  
});

export default connect(mapStateToProps, {})(TransactionScreen);