import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {
    setSn,
    createTransaction,
    sendTransaction,
    verifyTransaction,
    resetRegisterBikeState
} from '../actions/TransactionAction';

class RegisterBikeScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Register Bike'
        };
    };

    componentWillReceiveProps(nextProps, nextContext) {
        const {transaction} = nextProps;
        const {transaction: oldTransaction} = this.props;
        if (transaction.timestamp !== oldTransaction.timestamp) {
            //If there is a new transaction to send... send it.
            this.props.sendTransaction(transaction);
        }
    }

    handleOnPress = () => {
        const {publicKey, privateKey, sn} = this.props;
        this.props.createTransaction(sn, null, publicKey, privateKey);
    };

    handleOnPressContinue = () => {
        this.props.resetRegisterBikeState();
        this.props.navigation.navigate('Home');
    };

    render() {
        const {sn, loading, success, error} = this.props;
        let errorMessage = '';

        if (loading) {
            return <View style={styles.container}>
                <Text style={{fontSize: 24, marginTop: 15, textAlign: 'center'}}>Loading...</Text>
            </View>
        }

        if (success) {
            return <View style={styles.container}>
                <Text style={{fontSize: 24, marginTop: 15, textAlign: 'center'}}>Bike Registration Successful</Text>
                <Button
                    title={'Continue'}
                    onPress={() => this.handleOnPressContinue()}
                    style={{marginTop: 30, paddingLeft: 20, paddingRight: 20}}
                />
            </View>
        }

        if (error !== undefined){
            errorMessage = error.error.data.msg;
        }

        return (
            <View style={styles.container}>
                <Text style={{textAlign:'center', color:'red'}}>
                    {errorMessage}
                </Text>
                <Text>{'\n'}</Text>
                <Input
                    value={sn}
                    onChangeText={text => this.props.setSn(text)}
                    placeholder="Bike's Serial Number"
                />
                <Text>{'\n'}</Text>
                <Button
                    title={'Register'}
                    onPress={() => this.handleOnPress()}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    sn: state.get('transaction').get('registerForm').get('sn'),
    publicKey: state.get('keyPair').get('publicKey'),
    privateKey: state.get('keyPair').get('privateKey'),
    loading: state.get('transaction').get('loading'),
    success: state.get('transaction').get('success'),
    transaction: state.get('transaction').get('transaction'),
    error: state.get('transaction').get('error')
});

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', paddingBottom: 10, paddingTop: 10, paddingLeft: 5, paddingRight: 5}
});

export default connect(mapStateToProps, {
    setSn,
    createTransaction,
    sendTransaction,
    verifyTransaction,
    resetRegisterBikeState
})(RegisterBikeScreen);