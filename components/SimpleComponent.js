import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, Button } from 'react-native';
import { getKeyPair, deleteKeyPair } from '../actions/KeyPairAction'
import { createTransaction } from '../actions/TransactionAction'

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

    render() {
        return (
            <ScrollView>
                <Button
                    title="Delete key pair"
                    onPress={this.onPressDelete.bind(this)}
                />
                <Text> {"\n"} {"\n"} </Text>
                <Button
                    title="Create register transaction"
                    onPress={this.onPressCreateRegisterTransaction.bind(this)}
                />
                <Text> {"\n"} {"\n"} </Text>
                <Text>
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
    };
}

export default connect(mapStateToProps, { getKeyPair, deleteKeyPair, createTransaction })(SimpleComponent);