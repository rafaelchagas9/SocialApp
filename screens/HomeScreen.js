import React, { Component } from 'react';
import { View, StyleSheet, Text, Button} from 'react-native';
import UserPermissions from '../utilities/UserPermissions'


class HomeScreen extends Component {  

  handleClick(){
    UserPermissions.getCameraPermission()
  }

  render() {
    return(
        <View style={styles.container}>
        <Text style={{color:'#fff'}}>Salve</Text>
        <Button title='Clique' onPress={this.handleClick}></Button>
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