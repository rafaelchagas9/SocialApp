import React, { Component } from 'react';
import { View, StyleSheet, Text, Button} from 'react-native';
import UserPermissions from '../utilities/UserPermissions'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Ionicons} from '@expo/vector-icons'


class HomeScreen extends Component {  

  handleClick(){
    UserPermissions.getCameraPermission()
  }

  handlePost = () => {
   this.props.navigation.navigate('Message') 
  }

  render() {
    return(
      <View style={styles.container}>
      <View style={styles.header}>
          <View
            style={{height:50, width:75, alignItems: 'center', justifyContent: 'center'}}
          >
            <Text style={{color:'#fff', fontSize: 18}}>SnapBook</Text>
          </View>
          <TouchableOpacity 
            style={{height:50, width:50, alignItems: 'center', justifyContent: 'center'}}
            onPress={this.handlePost}
          >
            <Ionicons name='ios-chatboxes' size={24} color="#fff"/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#000',
  },
  header:{
    height:80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop:25,
    paddingHorizontal:10,
    borderBottomWidth:1,
    borderBottomColor: '#2b2b2b'
  }
})