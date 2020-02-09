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
import FriendsScreen from './screens/FriendsScreen'


const AppContainer = createStackNavigator(
  {
  default: createBottomTabNavigator({
    Home: {
      screen: HomeScreen,
      title: 'Início',
      navigationOptions:{
        tabBarIcon: ({tintColor}) => <Ionicons name='ios-home' size={24} color={tintColor}/>
      }
    },
    Friends: {
      screen: FriendsScreen,
      navigationOptions:{
        title: 'Amigos',
        tabBarIcon: ({tintColor}) => <Ionicons name='ios-people' size={24} color={tintColor}/>
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
    defaultNavigationOptions:{
      tabBarOnPress: ({navigation, defaultHandler}) => {
        if(navigation.state.key === "Post"){
          navigation.navigate("postModal")
        }else{
          defaultHandler()
        }
      }
    },
    tabBarOptions:{
      style:{
        backgroundColor: '#141414'
      },
      activeTintColor:'#fff',
      inactiveTintColor: '#6e7075',
      showLabel: false
    }
  }
  ),
    postModal: 
    {
      screen: PostScreen
    }
  },
  {
    mode: "modal",
    headerMode: "none"
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

const MessageStack = createStackNavigator({
  Message: {
    screen: MessageScreen,
    navigationOptions:{
    headerShown: false 
    }
  }
})


export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppContainer,
      Auth: AuthStack,
      Message: MessageStack
    },
    {
      initialRouteName: "Loading",
      }
  )
)
