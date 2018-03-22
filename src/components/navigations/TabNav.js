import React, { Component } from 'react';
import { TabNavigator, TabView } from 'react-navigation'
import {Icon} from 'native-base';
import stackNav from './stacknav';

const RootNavLogged1 = TabNavigator({
    NewsWall : {screen  : Newswall},
    Location : {screen : Location},
    Chat : {screen : Chat},
    Request : {screen : Request},
    Notification : {screen : Notification},
    Setting : {screen : Setting}
  },{
      headerMode : 'none',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let type = '';
        
        if (routeName === 'NewsWall') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
          type = 'Ionicons';
        } else if (routeName === 'Location') {
          iconName = `map-marker${focused ? '' : '-outline'}`;
          type = 'MaterialCommunityIcons';
        }else if (routeName === 'Chat') {
          iconName = `comment${focused ? '' : '-outline'}`;
          type = 'MaterialCommunityIcons';
        }else if (routeName === 'Request') {
          iconName = `ios-people${focused ? '' : '-outline'}`;
          type = 'Ionicons';
        }else if (routeName === 'Notification') {
          iconName = `bell${focused ? '' : '-outline'}`;
          type = 'MaterialCommunityIcons';
        }else if (routeName === 'Setting') {
          iconName = `ios-cog${focused ? '' : '-outline'}`;
          type = 'Ionicons';
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={25} type={type} color={tintColor} />;
      },
      headerMode : 'none'
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
  },);

export default RootNavLogged1;