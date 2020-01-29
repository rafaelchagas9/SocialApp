import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

import firebase from 'firebase'

export default class ProfileScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
          name: ''
        }
      }

      handleClick = () => {
        firebase.auth().signOut().then(() => {
          
          }).catch(function(error) {
            
          });
    }

      componentDidMount = () => {
        var user = firebase.auth().currentUser;
  
        if (user) {
          this.setState({name: user.displayName})
        } else {
          alert('Você não está conectado, por favor, conecte-se')
          this.props.navigation.navigate('Login')
        }
      }

  render() {
    return( 
        <View style={styles.container}>
            <Text style={{color:'#fff'}}>Bem vindo {this.state.name}</Text>
            <Button onPress={this.handleClick} title='Sair'/>
        </View>
        );
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    }
})