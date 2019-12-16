import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Button} from "react-native-elements";

class DetailScreen extends Component {
    render(){
        const item = this.props.navigation.getParam('item');
        return (
            <View style={{flex:1, paddingTop:10, paddingLeft:10, paddingRight:10}}>
                <Text style={{fontSize:16, fontStyle:'italic', paddingBottom:30}}>{item.id}</Text>
                <Text style={{fontSize:14, paddingBottom:30}}>{item.name}</Text>
                <Button
                    title="Transfer Ownership"
                    onPress={() => alert('Transfer')}
                />
            </View>
        );
    }
}

export default DetailScreen;