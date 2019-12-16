import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

export default class SendTransactionScreen extends Component{
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
                    onPress={() => alert('Ownership sent')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    txt: {fontSize:18, paddingBottom:10}
});