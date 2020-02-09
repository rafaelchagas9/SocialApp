import React, { Component } from 'react';

import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Ionicons} from '@expo/vector-icons'

// import { Container } from './styles';

export default class MessageScreen extends Component {
  render() {
    return( 
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={{height:50, width:50, alignItems: 'center', justifyContent: 'center'}}
                    onPress={()=> this.props.navigation.navigate('Home')}
                >
                    <Ionicons name='md-arrow-back' size={24} color="#fff"/>
                </TouchableOpacity>
            </View>
        </View>
        )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#000',
      },
      header:{
        height:80,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop:25,
        paddingHorizontal:10,
        borderBottomWidth:1,
        borderBottomColor: '#2b2b2b'
      }
})