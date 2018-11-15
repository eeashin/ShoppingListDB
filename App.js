import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { item: '', data: [] };
  }

  addButton = () => {
    this.setState({ data: [...this.state.data, { key: this.state.item }] })
  };

  clearButton = () => {
    this.setState({ data: [] })
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={{ width: 200, borderColor: 'gray', borderWidth: 4 }}
          onChangeText={(item) => this.setState({ item })}
          value={this.state.item}/>

        <View style={styles.rowButton}>
          <Button onPress={this.addButton} title="ADD" color='#0066ff'/>
          <Button onPress={this.clearButton} title="CLEAR" color='#0066ff'/>
        </View>

        <Text style={{ marginTop: 10 }}>Shopping list:</Text>

        <FlatList data={this.state.data}
          renderItem={({ item }) => <Text>{item.key}</Text>}/>
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
  }
});