import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator,TabBarBottom } from 'react-navigation';
import Expo from "expo";
import {Icon} from 'native-base';
import {Search} from './src/components/common';

import LoginScreen from './src/screens/LoginScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import SearchNameScreen from './src/screens/SearchNameScreen';
import GooglePlaceScreen from './src/screens/GooglePlaceInput/GooglePlaceInput';

import Global from './src/globals/Globals';
import MainTab from './src/components/navigations/MainTab';
import MainDrawer from './src/components/navigations/MainDrawer';



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loadingFont: true };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loadingFont: false });
  }


  render() {
    if (this.state.loadingFont) {
      return <Expo.AppLoading />;
    }

    const RootStack = StackNavigator({
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
    return (

       //<MainTab/>
       <RootStack/>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
