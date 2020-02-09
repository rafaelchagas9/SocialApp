import React, { Component } from 'react';
import { StyleSheet, Text, View, UIManager, LayoutAnimation, Image } from 'react-native';
import firebase from 'firebase'
import { Ionicons } from '@expo/vector-icons';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

import Fire from '../Fire';
    
if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

class RegisterScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            name: '',
            password: '',
            errorMesage: null,
            image: null
        }
    }

    capitalize(string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1
        });
    
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
      };

    createUser = () => {
        if(this.state.name != '' && this.state.password != '' && this.state.email != null){
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .catch((error) =>{
                if (error.code == 'auth/invalid-email'){
                    var message = 'Por favor, insira um email válido'
                }else{
                    var message = error.code
                }
                this.setState({errorMesage: message})
            })
            .then(() =>{
                var user = firebase.auth().currentUser;
                Fire.shared.uploadProfilePhoto(this.state.image)
                .then(() => {
                    user.updateProfile({
                        displayName: this.state.name,
                      }).then(() => {
                        Fire.shared.registerUserOnDatabase(this.state.name)
                      }).catch(function(error) {
                        alert('Falha ao criar sua conta '+error)
                        user.delete()
                        firebase.auth().signOut()
                      });
                })

                
            })
        }else{
            this.setState({errorMesage: 'Por favor, preencha todos os campos'})
        }
        
    }

  render() {
    LayoutAnimation.easeInEaseOut()
    return(
        <View style={styles.container}>
            <View style={{alignItems:'center', justifyContent: 'center',}}>
                <Text style={styles.greeting}>{`Olá!\nCadastre-se para começar.`}</Text>
                <TouchableOpacity style={styles.avatar} onPress={this._pickImage}>
                    <Ionicons style={{marginStart:40}} name='ios-add' size={40} color='#FFF'/>
                    <View style={styles.imageView}>
                        <Image source={{ uri: this.state.image }} style={{ width: 100, height: 100, borderRadius:50}}/>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.errorMesage}>
                {this.state.errorMesage && <Text style={styles.error}>{this.state.errorMesage}</Text>}
            </View>
            <View style={styles.form}>
                <Text style={styles.inputTitle}>Nome</Text>
                <TextInput onChangeText={name => this.setState({name: this.capitalize(name)})} style={styles.input}/>
            </View>
            <View style={styles.form}>
                <Text style={styles.inputTitle}>Email</Text>
                <TextInput keyboardType='email-address' onChangeText={email => this.setState({email})} style={styles.input}/>
            </View>
            <View style={styles.form}>
                <Text style={styles.inputTitle}>Senha</Text>
                <TextInput secureTextEntry={true} onChangeText={password => this.setState({password})} style={styles.input}/>
            </View>
            <TouchableOpacity style={styles.button} onPress={this.createUser}>
                <Text style={{textAlign:'center', fontWeight:"bold", fontSize:20, color:'#FFF'}}>Registrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.buttonSignUp}>
                <Text style={{textAlign:'center', color:'#e6e9f0'}}>Já tem uma conta? <Text style={{color:'#26C6DA'}}>Entre aqui</Text></Text>
            </TouchableOpacity>
        </View>
    )
  }
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    greeting:{
        marginTop:12,
        marginBottom:32,
        fontSize: 26,
        color: '#e6e9f0',
        fontWeight: '400',
        textAlign: 'center'
    },
    error:{
        textAlign: 'center',
        fontSize:18,
        fontWeight: '700',
        color: '#e6e9f0'
    },
    errorMesage:{
        alignContent: 'center',
        justifyContent: 'center',
        marginTop:10,
        marginBottom:15
    },
    button:{
        height:45,
        borderRadius:4,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#26C6DA',
        marginHorizontal:32
    },
    buttonSignUp:{
        marginTop:10,
        alignContent: 'center',
        justifyContent: 'center'
    },
    form:{
        marginBottom:48,
        marginHorizontal:25 
    },
    inputTitle:{
        color: '#e6e9f0',
        textTransform: 'uppercase'
    },
    input: {
        height:40,
        color: '#e6e9f0',
        borderBottomColor: '#e6e9f0',
        borderBottomWidth: StyleSheet.hairlineWidth
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
  });