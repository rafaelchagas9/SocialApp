import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import firebase from 'firebase'

class LoadingScreen extends Component {

    componentDidMount(){
        this.checkIfLoggedIn()
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged((user) =>
        {
            if (user){
                //If user is logged in, navigate to Dashboard
                this.props.navigation.navigate('Home')
            }else{
                //If user isn't logged in, navigate to Login
                this.props.navigation.navigate('Login')
            }
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