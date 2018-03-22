import React from 'react';
import { TabNavigator,TabBarBottom, StackNavigator } from 'react-navigation';
import {Icon} from 'native-base';
import {
  Newswall, 
  Chat, 
  Notification, 
  Request, 
  Setting, 
  Location, 
  Profile,
  FitnessWellness } from '../../containers';
import {Search} from '../common';
import {View, StatusBar, Text}  from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Global from '../../globals/Globals';

const RootNavLoggedTab = TabNavigator({
    NewsWall : {screen  : Newswall},
    Location : {screen : Location},
    // Request : {screen : Request},
    FitnessWellness : {screen : FitnessWellness},
  //  Notification : {screen : Notification},
    //Setting : {screen : Setting},
    Profile : {screen : Profile}
  },{
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let type;
        let colors;
        
        if (routeName === 'NewsWall') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Location') {
        //  iconName = focused ? 'location-on' : 'location';
        //   type = focused ? 'MaterialIcons' : 'EvilIcons';
        //   colors = focused ? {color : tintColor} : {color : 'rgba(0,0,0,0.4)'};
        //   return <Icon name={iconName} type={type} size={25}   style={colors}/>;
        iconName = `ios-pin${focused ? '' : '-outline'}`;
        }else if (routeName === 'Request') {
            iconName = `ios-add-circle${focused ? '' : '-outline'}`;
        }else if (routeName === 'FitnessWellness') {
          iconName = `ios-navigate${focused ? '' : '-outline'}`;
        }else if (routeName === 'Profile') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={25}   color={tintColor} />;
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

//   const  RootNavLoggedStack = StackNavigator({
//     Nice : {
//         screen : RootNavLoggedTab,
//         navigationOptions: {
//           header :<Search />
//         },
//       }
//   });

export default RootNavLoggedTab;