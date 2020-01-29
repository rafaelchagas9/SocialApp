import React, { Component } from 'react';

import { View, StyleSheet, Text } from 'react-native';

// import { Container } from './styles';

export default class PostScreen extends Component {
  render() {
    return( 
        <View style={styles.container}>
            <Text>PostScreen</Text>
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