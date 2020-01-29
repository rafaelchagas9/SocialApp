import React, { Component } from 'react';
import { View, StyleSheet, Text} from 'react-native';
import firebase from 'firebase'


class HomeScreen extends Component {  

  render() {
    return(
        <View style={styles.container}>
        <Text style={{color:'#fff'}}>Salve</Text>
        </View>
    );
  }
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    }
})