import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, Button } from 'react-native';
import { getKeyPair, deleteKeyPair } from '../actions/KeyPairAction'
import { createTransaction, verifyTransaction, sendTransaction } from '../actions/TransactionAction'

class SimpleComponent extends Component {

    componentDidMount() {
        this.props.getKeyPair();
    }

    onPressDelete() {
        this.props.deleteKeyPair();
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
                    title="Delete key pair"
                    onPress={this.onPressDelete.bind(this)}
                />
                <Text> {"\n"} </Text>
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
                <Text> {"\n"} </Text>
                <Text>
                    <Text>
                        {JSON.stringify(this.props.valid)}
                    </Text>
                    <Text> {"\n"} {"\n"} </Text>
                    <Text>
                        {JSON.stringify(this.props.transaction)}
                    </Text>
                    <Text> {"\n"} {"\n"} </Text>
                    <Text>
                        {this.props.publicKey}
                    </Text>
                    <Text> {"\n"} {"\n"} </Text>
                    <Text>
                        {this.props.privateKey}
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
    };
}

export default connect(mapStateToProps, { getKeyPair, deleteKeyPair, createTransaction, verifyTransaction, sendTransaction })(SimpleComponent);