import React from 'react';
import { 
  StackNavigator, 
  DrawerNavigator, 
  TabNavigator,
  TabBarBottom,
  SwitchNavigator  } from 'react-navigation';
import LoginScreen from '../../screens/LoginScreen';
import WelcomeScreen from '../../screens/WelcomeScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import ResetPasswordScreen from '../../screens/ResetPasswordScreen';
import SearchNameScreen from '../../screens/SearchNameScreen';
import GooglePlaceScreen from '../../screens/GooglePlaceInput/GooglePlaceInput';
import MainDrawer from '../../components/navigations/MainDrawer';

const AuthStack = StackNavigator({
      Welcome : {screen : WelcomeScreen},
      Login : {screen : LoginScreen },
      Register : {
        screen : StackNavigator({
          Register : {screen : RegisterScreen },
          GooglePlace : {screen : GooglePlaceScreen}
        }),
      },
      ResetPassword : {screen : ResetPasswordScreen },
      SearchName : {screen : SearchNameScreen},
      Main : {
        screen : MainDrawer,
        navigationOptions: {
          header :null
        },
      }
      
    },{
      initialRouteName: 'Welcome',
    },{
      navigationOptions : ({navigation})=>({
        headerStyle : {
          elevation: 0,
          shadowOpacity: 0,
          shadowColor: 'transparent',
          borderBottomWidth: 0,
        }
      })
    });
export default AuthStack;


