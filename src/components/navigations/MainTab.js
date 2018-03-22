import React from 'react';
import { TabNavigator,TabBarBottom, StackNavigator } from 'react-navigation';
import {Icon} from 'native-base';
import {Newswall, Chat, Notification, Request, Setting, Location } from '../../containers';
import {Search} from '../common';
import {View, StatusBar, Text}  from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Global from '../../globals/Globals';

const RootNavLoggedTab = TabNavigator({
    NewsWall : {screen  : Newswall},
    Location : {screen : Location},
    Chat : {screen : Chat},
    Request : {screen : Request},
  //  Notification : {screen : Notification},
    Setting : {screen : Setting}
  },{
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let type = '';
        
        if (routeName === 'NewsWall') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Location') {
          iconName = `ios-map${focused ? '' : '-outline'}`;
        }else if (routeName === 'Chat') {
          iconName = `ios-chatbubbles${focused ? '' : '-outline'}`;
        }else if (routeName === 'Request') {
          iconName = `ios-people${focused ? '' : '-outline'}`;
        // }else if (routeName === 'Notification') {
        //   iconName = `ios-notifications${focused ? '' : '-outline'}`;
        }else if (routeName === 'Setting') {
          iconName = `ios-settings${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={25} type={type}  color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor:  Global.COLOR.MAIN,
      inactiveTintColor: 'grey',
      style: { backgroundColor: '#ffffff' },
      showLabel  :false
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  });

  const  RootNavLoggedStack = StackNavigator({
    Nice : {
        screen : RootNavLoggedTab,
        navigationOptions: {
          header :<Search />
        },
      }
  });

export default RootNavLoggedTab;