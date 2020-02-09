import React, { Component } from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';

import Fire from '../Fire'

export default class ProfileScreen extends Component {

  state = {
    name: '',
    profilePhoto: null,
    pictureChanged: false
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });

    if (!result.cancelled) {
      this.setState({ profilePhoto: result.uri });
      Fire.shared.uploadProfilePhoto(result.uri)
    }
  };

  handleClick = () => {
    firebase.auth().signOut().then(() => {
      
    })
    .catch(function(error) {
      alert('Falha ao sair da sua conta')
    })
  }

    componentDidMount = () => {
      var user = firebase.auth().currentUser;

      if (user) {
        var name = user.displayName
        var urlPhoto = user.photoURL
        this.setState({name: name, profilePhoto: urlPhoto})
        console.log(urlPhoto)
      }else{
            alert('Você não está conectado, por favor, conecte-se')
            this.props.navigation.navigate('Login')
      }
    }

  render() {
    return( 
        <View style={styles.container}>
          <TouchableOpacity style={styles.avatar} onPress={this._pickImage}>
                    <Ionicons style={{marginStart:40}} name='ios-add' size={40} color='#FFF'/>
                    <View style={styles.imageView}>
                      <Image source={{uri: this.state.profilePhoto}} style={{width: 100, height: 100, borderRadius:50}}/>
                    </View>
                </TouchableOpacity>
          
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
    },
    avatar:{
        width:100,
        height:100,
        borderRadius:58,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#181818'
    },
    imageView: {
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center', 
        position:'absolute'
    }
})