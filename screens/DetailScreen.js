import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View, ScrollView, TouchableOpacity, FlatList, SafeAreaView} from 'react-native';
import {Button, ListItem} from "react-native-elements";
import {getTransactions} from "../actions/TransactionAction";
import _ from "lodash";

class DetailScreen extends Component {

    componentDidMount() {
        const id =  this.props.navigation.getParam('id');
        const limit = 10, skip = 0;
        this.props.getTransactions(limit, skip, null, id);
    }

    renderItem = (item) => {
        //Process the transaction information to determine if Register / Transfer
        let date = new Date();
        date.setTime(item.timestamp * 1000);
        const dateFormatted = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
        let text = `Register Transaction - ${dateFormatted}`;
        if (item.publicKeyInput !== null){
            text = `Transfer Transaction - ${dateFormatted}`;
        }
        return (
            <TouchableOpacity>
                <ListItem
                    title={text}
                    titleStyle={{fontStyle:'italic'}}
                    bottomDivider
                />
            </TouchableOpacity>
        );
    };

    render(){
        const id = this.props.navigation.getParam('id');
        const {transactions} = this.props;

        return (
            <View style={{flex:1, paddingLeft:10, paddingRight:10, paddingBottom:15, justifyContent:'center'}}>
                <View style={{flex:1}}>
                    <Text style={{marginTop:15, fontSize:22, color:'#aaa', fontStyle:'italic'}}># {id}</Text>
                    <Text>{'\n'}</Text>
                    <Text style={{marginBottom:10, fontSize:16}}>Transaction History</Text>
                    <ScrollView>
                        <SafeAreaView>
                            <FlatList
                                data={transactions}
                                renderItem={({item}) => this.renderItem(item)}
                                keyExtractor={item => JSON.stringify(item.timestamp)}
                            />
                        </SafeAreaView>
                    </ScrollView>
                </View>
                <Button
                    title="Transfer Ownership"
                    onPress={() => this.props.navigation.navigate('Scanner',{item: id, next:'SendTransaction'})}
                    style={{marginTop:5}}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    transactions: state.get('transaction').get('transactions'),
    publicKey: state.get('keyPair').get('publicKey')
});

export default connect(mapStateToProps, {getTransactions})(DetailScreen);