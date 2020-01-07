import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Button} from "react-native-elements";

class DetailScreen extends Component {
    render(){
        const item = this.props.navigation.getParam('item');
        return (
            <View style={{flex:1, paddingLeft:10, paddingRight:10, justifyContent:'center'}}>
                <View style={{flex:2}}>
                    <Text style={{fontSize:16, paddingTop:20,paddingBottom:30}}>{item.name}</Text>
                    <Text style={{fontSize:14, fontStyle:'italic', paddingBottom:30}}>SN: {item.id}</Text>
                </View>
                <View style={{flex:1}}>
                    <Button
                        title="Transfer Ownership"
                        onPress={() => this.props.navigation.navigate('Scanner',{item, next:'SendTransaction'})}
                    />
                </View>
            </View>
        );
    }
}

export default DetailScreen;