import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Text, SafeAreaView, StyleSheet } from 'react-native';
import TopBarIcon from '../components/TopBarIcon';
import { Platform } from 'react-native';
import { ListItem, Input } from 'react-native-elements';
import { getTransactions } from '../actions/TransactionAction';

class TransactionScreen extends Component {

  search(text) {
    this.props.getTransactions(0, 0, text, undefined);
    this.props.getTransactions(0, 0, undefined, text);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Transactions',
      headerRight: <TopBarIcon name={Platform.OS === 'ios' ? `ios-more` : 'md-more'} />
    }
  };

  renderItem = (item) => {
    return (
      <ListItem
        title={item.id}
        subtitle={
          <View>
            <Text>{item.publicKeyInput ? "(Transfer)" + item.publicKeyInput + "->" : '(Registration)'} {item.publicKeyOutput}</Text>
            <Text>{new Date(item.timestamp * 1000).toLocaleString()}</Text>
          </View>
        }
        subtitleStyle={{ color: '#aaa', fontStyle: 'italic' }}
        bottomDivider
        chevron
      />
    );
  };

  render() {
    const { transactions } = this.props;
    const transactionsList = transactions.length === undefined ? [] : transactions;
    // console.log(transactionsList);
    return (

      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <Input
            onChange={(e) => { this.search(e.nativeEvent.text) }}
            placeholder='Search...'
            rightIcon={{ type: 'font-awesome', name: 'search' }}
          />
          <Text>{'\n'}</Text>
          <FlatList
            data={transactionsList}
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  transactions: state.get('transaction').get('transactions'),
  loading: state.get('transaction').get('loading'),
  success: state.get('transaction').get('success'),
  error: state.get('transaction').get('error')
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  item: { flex: 1, paddingTop: 20, paddingBottom: 20, backgroundColor: '#eee', marginBottom: 2 },
  itemTxt: { paddingLeft: 5, color: '#000', fontSize: 18 }
})

export default connect(mapStateToProps, { getTransactions })(TransactionScreen);