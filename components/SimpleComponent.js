import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { getKeyPair, deleteKeyPair } from '../actions/KeyPairAction'

class SimpleComponent extends Component {

    componentDidMount() {
        this.props.getKeyPair();
    }

    onPressDelete() {
        this.props.deleteKeyPair();
    }

    render() {
        return (
            <View>
                <Button
                    title="Delete key pair"
                    onPress={this.onPressDelete.bind(this)}
                />
                <Text>
                    <Text>
                        {this.props.publicKey}
                    </Text>
                    <Text>
                        {this.props.privateKey}
                    </Text>
                </Text>
            </View>
        );
    }

}

function mapStateToProps(state) {
    return {
        ...state,
        publicKey: state.get('keyPair').get('publicKey'),
        privateKey: state.get('keyPair').get('privateKey'),
    };
}

export default connect(mapStateToProps, { getKeyPair, deleteKeyPair })(SimpleComponent);