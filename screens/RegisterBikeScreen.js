import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {setSn, setName, createTransaction, sendTransaction, verifyTransaction} from '../actions/TransactionAction';

class RegisterBikeScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Register Bike'
        };
    };

    componentWillReceiveProps(nextProps, nextContext) {
        const {transaction} = nextProps;
        const {transaction: oldTransaction} = this.props;
        if (transaction.timestamp !== oldTransaction.timestamp){
            //If there is a new transaction to send... send it.
            this.props.sendTransaction(transaction);
        }
    }

    handleOnPress = () => {
        const {publicKey, privateKey, sn} = this.props;
        this.props.createTransaction(sn, null, publicKey, privateKey);
    };

    render() {
        const {sn, name, loading, success} = this.props;

        if (loading) {
            return <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        }

        if (success) {
            return <View>
                <Text>Bike Registration Successful...</Text>
            </View>
        }

        return (
            <View style={styles.container}>
                <Input
                    value={sn}
                    onChangeText={text => this.props.setSn(text)}
                    placeholder="Bike's Serial Number"
                />
                <Text>{'\n'}</Text>
                <Input
                    value={name}
                    onChangeText={text => this.props.setName(text)}
                    placeholder="Bike's Short Description or Name"
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
   name: state.get('transaction').get('registerForm').get('name'),
   publicKey: state.get('keyPair').get('publicKey'),
   privateKey: state.get('keyPair').get('privateKey'),
   loading: state.get('transaction').get('loading'),
   success: state.get('transaction').get('success'),
   transaction: state.get('transaction').get('transaction')
});

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', paddingBottom: 10, paddingTop: 10, paddingLeft: 5, paddingRight: 5}
});

export default connect(mapStateToProps, {setSn, setName, createTransaction, sendTransaction, verifyTransaction})(RegisterBikeScreen);