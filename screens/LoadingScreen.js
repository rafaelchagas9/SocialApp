import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import firebase from 'firebase'
import Fire from '../Fire'

class LoadingScreen extends Component {

    componentDidMount(){
        this.checkIfLoggedIn()
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(user =>
        {
            this.props.navigation.navigate(user ? "App" : "Auth")
        })
    }

  render() {
    return(
        <View style={styles.container}>
           <ActivityIndicator size='large'/>
        </View>
    )
  }
}

export default LoadingScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#000',
        alignContent: 'center',
        justifyContent: 'center',
    }
})