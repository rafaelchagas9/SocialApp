import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';


class FriendsScreen extends Component {

  state = {
    query: "Rafael",
    dataSource: []
  }

  searchFriend = () => {
    const result = []
    const path = "users/"
    var ref = firebase.database().ref(path)
    var databaseReferenceQuery = ref.orderByChild('name').equalTo('Forget').on('child_added', (snapshot) => {
      result.push({
        key: snapshot.key,
        name: snapshot.child('name').toJSON()
      })
    });
    this.setState({dataSource: result})
    console.log(result)
    
  }

  render() {
    return(
        <View style={styles.container}>
          <TouchableOpacity onPress={this.searchFriend}>
          <Text style={{color:'#fff', fontWeight: 'bold', fontSize: 35}}>Amigos</Text>
          </TouchableOpacity>
          <FlatList 
            keyExtractor = {(item, index) => index.toString()}
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <View>
                <Text style={{color:'#fff'}}>{item.name}</Text>
              </View>
            )}
          />
        </View>
    )
  }
}

export default FriendsScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    }
})