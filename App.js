import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons';

import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'

import HomeScreen from './screens/HomeScreen'
import MessageScreen from './screens/MessageScreen'
import PostScreen from './screens/PostScreen'
import NotificationScreen from './screens/NotificationScreen'
import ProfileScreen from './screens/ProfileScreen'


import firebase from 'firebase'
import { firebaseConfig } from './config';
firebase.initializeApp(firebaseConfig)

const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    title: 'Início',
    navigationOptions:{
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-home' size={24} color={tintColor}/>
    }
  },
  Message: {
    screen: MessageScreen,
    navigationOptions:{
      title: 'Mensagens',
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-chatboxes' size={24} color={tintColor}/>
    }
  },
  Post: {
    screen: PostScreen,
    navigationOptions:{
      title: 'Postar',
      tabBarIcon: ({tintColor}) => 
      <Ionicons 
        name='ios-add-circle'
        size={48}
        color="#26C6DA"
          style={{
          shadowColor: '#26C6DA',
          shadowOffset: {width:0, height:0},
          shadowRadius:10,
          shadowOpacity: 0.3
        }}/>
    }
  },
  Notification: {
    screen: NotificationScreen,
    navigationOptions:{
      title: 'Notificações',
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-notifications' size={24} color={tintColor}/>
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions:{
      title: 'Perfil',
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-person' size={24} color={tintColor}/>
    }
  }
},
{
  tabBarOptions:{
    style:{
      backgroundColor: '#141414'
    },
    activeTintColor:'#fff',
    inactiveTintColor: '#6e7075',
    showLabel: false
  }
}
)

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions:{
    headerShown: false 
    }
  },
  Register: {
    screen:RegisterScreen,
    navigationOptions:{
      title: 'Registrar',
      headerStyle:{
        backgroundColor: '#141414'
      },
      headerTintColor: '#e6e9f0'
    }
  }
})


export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppNavigator,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading",
      }
  )
)
