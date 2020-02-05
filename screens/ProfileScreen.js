import React, { Component } from 'react';
import { View, StyleSheet, Text} from 'react-native';

import firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';

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
            var name = user.displayName
            this.setState({name: name})
        } else {
            alert('Você não está conectado, por favor, conecte-se')
            this.props.navigation.navigate('Login')
        }
      }

  render() {
    return( 
        <View style={styles.container}>
            <Text style={{color:'#fff'}}>Bem vindo {this.state.name}</Text>
            <TouchableOpacity style={styles.button} onPress={this.handleClick}>
                <Text style={{textAlign:'center', fontWeight:"400", fontSize:20, color:'#FFF'}}>Sair</Text>
            </TouchableOpacity>
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
    },
    button:{
        backgroundColor:'#26C6DA',
        alignItems: 'center',
        justifyContent: 'center',
        height:45,
        width: 120
    }
})