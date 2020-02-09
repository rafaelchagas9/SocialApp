import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, Image} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import firebase from 'firebase'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';


class FriendsScreen extends Component {

  state = {
    query: "",
    dataSource: [],
    searchButtonWasClicked: true
  }

  searchFriend = (text) => {
    this.setState({query:text})
    const result = []
    const path = "users/"
    var ref = firebase.database().ref(path)
    var databaseReferenceQuery = ref.orderByChild('name').equalTo(text).on('child_added', (snapshot) => {
      result.push({
        key: snapshot.key,
        name: snapshot.child('name').toJSON(),
        profilePicture: snapshot.child('profilePicture').toJSON()
      })
    });
    this.setState({dataSource: result})
    console.log(result)
    
  }

  handleSearchClick = () => {
    this.setState({searchButtonWasClicked: false})
  }

  render() {
    return(
        <View style={styles.container}>
          {this.state.searchButtonWasClicked === true ? 
          <View style={styles.header}>
            <View 
              style={{height:50, width:75, alignItems: 'center', justifyContent: 'center'}}
            >
              <Text style={{color:'#fff', fontSize: 18}}>Seguir</Text>
            </View>
            <TouchableOpacity
              style={{height:50, width:50, alignItems: 'center', justifyContent: 'center'}}
              onPress={this.handleSearchClick}
            >
              <Ionicons name='ios-search' size={24} color="#fff"/>
            </TouchableOpacity>
          </View> 
          : 
          <View style={styles.headerSearch}>
            <View
              style={{height:40, width:298, justifyContent: 'center', backgroundColor:'#2b2b2b', borderRadius:25, paddingStart:15, marginTop:5}}
            >
              <TextInput
                placeholder="Digite o nome"
                style={{color:"#fff", width:'100%', textAlign:'left'}}
                onChangeText={this.searchFriend}
                value={this.state.query}
                autoFocus={true}
              />
            </View>
            <TouchableOpacity
              style={{height:50, width:75, alignItems: 'center', justifyContent: 'center'}}
              onPress={() =>
                this.setState({searchButtonWasClicked:true, query: '', dataSource: []})}
            >
              <Ionicons name='md-close' size={24} color="#fff"/>
            </TouchableOpacity>
          </View>
  }
          <FlatList 
            keyExtractor = {(item, index) => index.toString()}
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <View style={styles.friendRow}>
                <Image 
                  source={{ uri: item.profilePicture }}
                  style={{ width: 50, height: 50, borderRadius:50}}
                  />
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
        backgroundColor: '#000'
    }, 
    friendRow:{
      flexDirection: 'row'
    },
    header:{
      height:80,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop:25,
      paddingHorizontal:10,
      borderBottomWidth:1,
      borderBottomColor: '#2b2b2b'
    },
    headerSearch:{
      height:80,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingTop:25,
      paddingHorizontal:20,
      borderBottomWidth:1,
      borderBottomColor: '#2b2b2b'
    },
})