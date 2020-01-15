import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {createTransaction, sendTransaction, resetTransferOwnershipState} from "../actions/TransactionAction";

class SendTransactionScreen extends Component{
    static navigationOptions = {
        title: 'Transfer Ownership'
    };

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
        const publicKeyOut = JSON.parse(navigation.getParam('data'));
        const id = navigation.getParam('item');
        this.props.createTransaction(id, publicKey, publicKeyOut, privateKey);
    };

    handleOnPressContinue = () => {
        this.props.resetTransferOwnershipState();
        this.props.navigation.navigate('Home');
    };


    render(){
        const {navigation, success, loading} = this.props;
        const id = navigation.getParam('item');
        const data = navigation.getParam('data');

        if (loading) {
            return <View style={styles.container}>
                <Text style={{fontSize: 24, marginTop: 15, textAlign: 'center'}}>Loading...</Text>
            </View>
        }

        if (success) {
            return <View style={styles.container}>
                <Text style={{fontSize: 24, marginTop: 15, textAlign: 'center'}}>Transaction Successful</Text>
                <Button
                    title={'Continue'}
                    onPress={() => this.handleOnPressContinue()}
                    style={{marginTop: 30, paddingLeft: 20, paddingRight: 20}}
                />
            </View>
        }

        return (
            <View style={{flex:1, paddingLeft:15, paddingRight:15, marginTop:15}}>
                <View style={{flex:2, justifyContent:'center'}}>
                    <Text style={styles.header}>Transaction Details</Text>
                    <Text style={styles.txt}># {id}</Text>
                    <Text style={styles.txt}>Destination: {data}</Text>
                </View>
                <View style={{flex:1, justifyContent:'bottom'}}>
                    <Button
                        title={'Confirm Transaction'}
                        onPress={() => this.onPressConfirm()}
                        style={{marginTop: 50}}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    publicKey: state.get('keyPair').get('publicKey'),
    privateKey: state.get('keyPair').get('privateKey'),
    transaction: state.get('transaction').get('transaction'),
    success: state.get('transaction').get('success'),
    loading: state.get('transaction').get('loading')
});

export default connect(mapStateToProps,{createTransaction, sendTransaction, resetTransferOwnershipState})(SendTransactionScreen)

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', paddingBottom: 10, paddingTop: 10, paddingLeft: 5, paddingRight: 5},
    header: {fontSize:24, paddingBottom: 25},
    txt: {fontSize:20, paddingBottom:15, color:'#aaa'},
});