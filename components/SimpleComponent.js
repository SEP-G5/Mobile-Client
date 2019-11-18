import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { getKeyPair } from '../actions/KeyPairAction'

class SimpleComponent extends Component {

    componentDidMount() {
        this.props.getKeyPair();
    }

    render() {
        return (
            <Text>
                <Text>
                    {this.props.publicKey}
                </Text>
                <br />
                <br />
                <Text>
                    {this.props.privateKey}
                </Text>
            </Text>
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

export default connect(mapStateToProps, { getKeyPair })(SimpleComponent);