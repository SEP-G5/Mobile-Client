import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, Button } from 'react-native';
import { getKeyPair, deleteKeyPair } from '../actions/KeyPairAction'
import { createTransaction, verifyTransaction, sendTransaction } from '../actions/TransactionAction'
import QRCode from 'react-native-qrcode-svg';

class SimpleComponent extends Component {

    componentDidMount() {
        this.props.getKeyPair();
    }

    onPressCreateRegisterTransaction() {
        this.props.createTransaction("abc123", "", this.props.publicKey, this.props.privateKey);
    }

    onPressVerifyTransaction() {
        this.props.verifyTransaction(this.props.transaction);
    }

    onPressSendTransaction() {
        this.props.sendTransaction(this.props.transaction);
    }

    render() {
        return (
            <ScrollView>
                <Button
                    title="Create register transaction"
                    onPress={this.onPressCreateRegisterTransaction.bind(this)}
                />
                <Text> {"\n"} </Text>
                <Button
                    title="Verify transaction"
                    onPress={this.onPressVerifyTransaction.bind(this)}
                />
                <Text> {"\n"} </Text>
                <Button
                    title="Send transaction"
                    onPress={this.onPressSendTransaction.bind(this)}
                />
                <QRCode
                    value={JSON.stringify(this.props.transaction)}
                    size={200}
                />
                <Text> {"\n"} </Text>
                <Text>
                    <Text>
                        {JSON.stringify(this.props.valid)}
                    </Text>
                    <Text> {"\n"} {"\n"} </Text>
                    <Text>
                        {JSON.stringify(this.props.transaction)}
                    </Text>
                </Text>
            </ScrollView>
        );
    }

}

function mapStateToProps(state) {
    return {
        ...state,
        publicKey: state.get('keyPair').get('publicKey'),
        privateKey: state.get('keyPair').get('privateKey'),
        transaction: state.get('transaction').get('transaction'),
        valid: state.get('transaction').get('valid'),
        qrcode: "",
    };
}

export default connect(mapStateToProps, { getKeyPair, deleteKeyPair, createTransaction, verifyTransaction, sendTransaction })(SimpleComponent);
