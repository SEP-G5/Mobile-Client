import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {createTransaction, sendTransaction} from "../actions/TransactionAction";

class SendTransactionScreen extends Component{

    componentWillReceiveProps(nextProps, nextContext) {
        const {transaction} = nextProps;
        const {transaction: oldTransaction} = this.props;
        if (transaction.timestamp !== oldTransaction.timestamp){
            //If there is a new transaction to send... send it.
            this.props.sendTransaction(transaction);
        }
    }

    onPressConfirm = () => {
        const {publicKey, privateKey, navigation} = this.props;
        const publicKeyOut = navigation.getParam('data');
        const item = navigation.getParam('item');
        this.props.createTransaction(item.id, publicKey, publicKeyOut, privateKey);
    };

    render(){
        const {navigation} = this.props;
        const item = navigation.getParam('item');
        const data = navigation.getParam('data');
        return (
            <View style={{flex:1, paddingLeft:10, paddingRight:10}}>
                <Text style={styles.txt}>Transaction Details</Text>
                <Text style={styles.txt}>Type: Transfer Ownership</Text>
                <Text style={styles.txt}>SN: {item.id}</Text>
                <Text style={styles.txt}>Destination: {data}</Text>
                <Button
                    title={'Confirm Transaction'}
                    onPress={() => this.onPressConfirm()}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    publicKey: state.get('keyPair').get('publicKey'),
    privateKey: state.get('keyPair').get('privateKey'),
    transaction: state.get('transaction').get('transaction')
});

export default connect(mapStateToProps,{createTransaction, sendTransaction})(SendTransactionScreen)

const styles = StyleSheet.create({
    txt: {fontSize:18, paddingBottom:10}
});