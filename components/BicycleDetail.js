import React,{Component} from 'react';
import {Overlay, Button} from 'react-native-elements';
import {Text, View} from 'react-native';

class BicycleDetail extends Component {

    render () {
        const {current, viewDetail, closeF} = this.props;
        if (!current){
            return <View />;
        }
        return (
            <Overlay isVisible={viewDetail}>
                <View style={{flex:1}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize:16, fontStyle:'italic', paddingBottom:30}}>{current.id}</Text>
                        <Text style={{fontSize:14, paddingBottom:30}}>{current.name}</Text>
                        <Button
                            title="Transfer Ownership"
                            onPress={() => alert('Transfer')}
                        />
                    </View>
                    <Button
                        title="Close"
                        onPress={() => closeF(!viewDetail)}
                    />
                </View>
            </Overlay>
        );
    }
}

export default BicycleDetail;