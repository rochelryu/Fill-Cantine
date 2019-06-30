import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import LoginScreen from '../Components/LoginScreen';
import HomeScreen from '../Components/HomeScreen';
import DetailsSceen from '../Components/DetailsSceen';
import SignUpScreen from '../Components/SignUpScreen';
import Authentif from '../Components/Authentif';
import EditScreen from '../Components/EditScreen';

const Stacked = createStackNavigator({
        Detail: {
            screen: DetailsSceen,
            navigationOptions: ()=>({
                header: null,
            })
        },
        Login: {
            screen: LoginScreen,
            navigationOptions: ()=>({
                header: null,
            })
        },
        SignUp: {
                screen: SignUpScreen,
                navigationOptions: ()=>({
                    header: null,
                })
            },
        Home: {
            screen: HomeScreen,
            navigationOptions: ()=>({
                header: null,
            })
        },
        Guard:{
            screen: Authentif,
            navigationOptions: ()=>({
                header: null,
            })
        },
        Edit:{
            screen: EditScreen,
            navigationOptions: ()=>({
                header: null,
            })
        }
    },
    {

        initialRouteName: 'Guard',
        headerMode: 'none',
        /* The header config from HomeScreen is now here
        defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        },*/
      })

export default createAppContainer(Stacked)
