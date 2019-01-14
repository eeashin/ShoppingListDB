import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Alert } from 'react-native';
import { SQLite } from 'expo';
import { Header,FormLabel, FormInput, Button, List, ListItem, Card } from 'react-native-elements';

const db = SQLite.openDatabase('shopListDB.db');

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      itemName: '',
      amount: '',
      data: []
    };
  }

  //create Shopping table in shopListDB
  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shopList(id integer primary key not null, itemName text, amount text);');
    });
    this.updateList();
  }


  //update soipping list to shopListDB
  updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shopList', [], (_, { rows }) =>
        this.setState({ data: rows._array })
      );
    });
    
  }

  //save shopping list to DB
  addButton = () => {
    db.transaction(tx => {
      tx.executeSql('insert into shopList(itemName, amount) values (?, ?)', [this.state.itemName, this.state.amount]);
    }, null, this.updateList)
    Alert.alert('Shop List Updated');
  }

  // delete item from shopList 
  deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql(`delete from shopList where id = ?;`, [id])
    }, null, this.updateList)
    Alert.alert('Item deleted')
  }

  listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );

  }

  render() {
    return (
      <View>
      <Header   
            centerComponent={{ text: 'SHOPPING LIST', style: { color: '#fff' } }}   
          />
        <Card titie='SHOPPING LIST' style={{ backgroundColor: '#9999ff' }} >
          <FormLabel>Item Name</FormLabel>
          <FormInput
            placeholder='Enter Item'
            style={{
              marginTop: 5,
              marginBottom: 5,
              fontSize: 18,
              width: 200,
              borderColor: 'gray',
              borderWidth: 1
            }}
            onChangeText={(itemName) => this.setState({ itemName })}
            value={this.state.itemName} />
          <FormLabel>Amount</FormLabel>
          <FormInput
            placeholder='Enter Amount'
            style={{
              marginTop: 30,
              fontSize: 18,
              width: 200,
              borderColor: 'gray',
              borderWidth: 1
            }}
            onChangeText={(amount) => this.setState({ amount })}
            value={this.state.amount} />
          <Button style={styles.buttonstyle} raised onPress={this.addButton} title="Save" />
       
        <Text style={{ marginTop: 20, fontSize: 20,  alignItems: 'center' }}>Shopping List</Text>
      

        <List>
          <FlatList
            style={{ marginLeft: "5%" }}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
              <ListItem
                title={item.itemName}
                onPress={() => this.deleteItem(item.id)}
                rightTitle={'bought'}
                subtitle={
                  <View style={styles.subtitleView}>
                    <Text style={styles.ratingText}>{item.amount}</Text>
                  </View>
                }
              />

            } data={this.state.data}
          />
        </List>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100
  },
  rowButton: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonstyle: {
    paddingTop: 10
  },
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  subtitleView: {
    paddingTop: 5
  },
  ratingText: {
    paddingLeft: 10,
  }
});