import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Text, SafeAreaView, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import TopBarIcon from '../components/TopBarIcon';
import { Platform } from 'react-native';
import { ListItem, Input } from 'react-native-elements';
import { getTransactions } from '../actions/TransactionAction';

class TransactionScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Transactions',
      headerRight: <TopBarIcon name={Platform.OS === 'ios' ? `ios-more` : 'md-more'} />
    }
  };

  componentDidMount() {
    const {publicKey} = this.props;
    const limit = 10, skip = 0;
    this.props.getTransactions(limit, skip, publicKey);
  }

  search(text) {
    if (text){
      this.props.getTransactions(0, 0, text, undefined);
      this.props.getTransactions(0, 0, undefined, text);
    } else {
      const {publicKey} = this.props;
      this.props.getTransactions(0, 0, publicKey);
    }

  }

  renderItem = (item) => {
    let transactionType = item.publicKeyInput ? "(Transfer) to " + item.publicKeyOutput + "->" : '(Registration)';
    return (
      <ListItem
        title={`#${item.id} - ${transactionType} `}
        subtitle={new Date(item.timestamp * 1000).toLocaleString()}
        subtitleStyle={{ color: '#aaa', fontStyle: 'italic' }}
        bottomDivider
      />
    );
  };

  _onRefresh = () => {
    const {publicKey} = this.props;
    this.props.getTransactions(0, 0, publicKey);
  };

  render() {
    const { transactions, loading, refreshing } = this.props;
    const transactionsList = transactions.length === undefined ? [] : transactions;
    //console.log(transactionsList);

    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <Input
            onChange={(e) => { this.search(e.nativeEvent.text) }}
            placeholder='Search...'
            rightIcon={{ type: 'font-awesome', name: 'search' }}
          />
          <Text>{'\n'}</Text>
          {transactions.length > 0 && <ScrollView
              refreshControl={<RefreshControl refreshing={loading} onRefresh={() => this._onRefresh()} />}
          >
            <FlatList
                data={transactionsList}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={item => JSON.stringify(item.timestamp)}
            />
          </ScrollView>}
          {transactions.length === 0 && <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={() => this._onRefresh()} />}>
            <Text style={{fontSize:16, textAlign:'center'}}>{`No transactions were found...`}</Text>
            </ScrollView>}
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  transactions: state.get('transaction').get('transactions'),
  loading: state.get('transaction').get('loading'),
  success: state.get('transaction').get('success'),
  error: state.get('transaction').get('error'),
  publicKey: state.get('keyPair').get('publicKey')
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  item: { flex: 1, paddingTop: 20, paddingBottom: 20, backgroundColor: '#eee', marginBottom: 2 },
  itemTxt: { paddingLeft: 5, color: '#000', fontSize: 18 }
});

export default connect(mapStateToProps, { getTransactions })(TransactionScreen);