import React, { Component } from 'react';
import { StyleSheet, Text, View, UIManager, LayoutAnimation, ActivityIndicator } from 'react-native';
import firebase from 'firebase'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

class LoginScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            errorMesage: null,
            isLoading: false
        }
    }

    handleLogin = () => {
        this.setState({errorMesage: null, isLoading: true})
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
            this.setState({errorMesage: null, isLoading: false})
        })
        .catch((error) =>{
            if (error.code == 'auth/invalid-email'){
                var message = 'Por favor, insira um email válido'
            }else if(error.code == 'auth/wrong-password'){
                var message = 'Email ou senha incorreta'
            }else{
                var message = error.message
            }
            this.setState({errorMesage: message, isLoading: false})
        })
    }

  render() {
    LayoutAnimation.easeInEaseOut()
    return(
        <View style={styles.container}>
            <Text style={styles.greeting}>Bem vindo de volta.</Text>
            <View style={styles.errorMesage}>
                {this.state.errorMesage && <Text style={styles.error}>{this.state.errorMesage}</Text>}
            </View>
            <View style={styles.errorMesage}>
                {this.state.isLoading == true && <ActivityIndicator/>}
            </View>
            <View style={styles.form}>
                <Text style={styles.inputTitle}>Email</Text>
                <TextInput keyboardType='email-address' onChangeText={email => this.setState({email})} style={styles.input}/>
            </View>
            <View style={styles.form}>
            <Text style={styles.inputTitle} auto>Senha</Text>
            <TextInput secureTextEntry={true} onChangeText={password => this.setState({password})} style={styles.input}/>
            </View>
            <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={{textAlign:'center', fontWeight:"bold", fontSize:20, color:'#FFF'}}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={styles.buttonSignUp}>
                <Text style={{textAlign:'center', color:'#e6e9f0'}}>Novo por aqui? <Text style={{color:'#26C6DA'}}>Registre-se aqui</Text></Text>
            </TouchableOpacity>
        </View>
    )
  }
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    greeting:{
        marginTop:48,
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
    }
  });