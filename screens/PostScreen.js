import React, { Component } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Fire from '../Fire';

const firebase = require("firebase")
require("firebase/firestore")

export default class PostScreen extends Component {

    state = {
        text: "",
        image: null,
        profilePicture: null
    };

    componentDidMount(){
        this.getPhotoPermission()
        this.getProfilePicture()
    }
    
    handlePost = () => {
        let image = this.state.image
        let text = this.state.text
        Fire.shared.addPost(text, image)
        .then(ref => {
            this.setState({text: '', image: null })
            this.props.navigation.goBack()
        })
        .catch(error => {
            alert('Falha ao publicar')
        })
    }

    getPhotoPermission = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      }

      getProfilePicture = () => {
        var userPicture = firebase.auth().currentUser.photoURL
        this.setState({profilePicture: userPicture})
      }

      _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        });
    
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
      };

  render() {
    return( 
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={{height:50, width:50, alignItems: 'center', justifyContent: 'center'}}
                    onPress={()=> this.props.navigation.goBack()}    
                >
                    <Ionicons name='md-arrow-back' size={24} color="#fff"/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{height:50, width:75, alignItems: 'center', justifyContent: 'center'}}
                    onPress={this.handlePost}
                >
                    <Text style={{color:'#fff', fontSize: 18}}>Publicar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <Image source={{uri: this.state.profilePicture}} style={styles.avatar}/>
                <TextInput
                placeholder='O que passa em sua cabeça?'
                autoFocus={true}
                multiline={true}
                numberOfLines={4}
                style={{flex:1, color:'#fff'}}
                onChangeText={text => this.setState({text})}
                value={this.state.text}
                />
            </View>
            <TouchableOpacity style={styles.photo} onPress={this._pickImage}>
                <Ionicons name='md-camera' size={32} color="#fff"/>
            </TouchableOpacity>
            {this.state.image &&
                <View style={{marginHorizontal:16, marginVertical:16, height:300}}>
                    <Image source={{ uri: this.state.image }} style={{ width: "100%", height: "100%" }} />
                </View>
            }
        </SafeAreaView>
        );
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#000'
    },
    header:{
        height:80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop:25,
        paddingHorizontal:10,
        borderBottomWidth:1,
        borderBottomColor: '#2b2b2b'
    },
    avatar:{
        width:48,
        height:48,
        borderRadius:24,
        marginRight:16
    },
    inputContainer:{
        margin:32,
        flexDirection: "row"
    },
    photo:{
        alignItems: 'flex-end',
        marginHorizontal:32
    }
})