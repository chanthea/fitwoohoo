import React from 'react';
import { TabNavigator,TabBarBottom, StackNavigator, SwitchNavigator } from 'react-navigation';
import {Icon} from 'native-base';
import IconBadge from 'react-native-icon-badge';
import {
  Newswall, 
  Chat, 
  Notification, 
  Request, 
  Setting, 
  FitnessWellness } from '../../containers';
import LocationLoading from '../../containers/MyLocation/Index';
import TrainerLocation from '../../containers/MyLocation/TrainerLocation';
import MyLocation from '../../containers/MyLocation/MyLocation';
import {Search} from '../common';
import {View, StatusBar, Text}  from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Global from '../../globals/Globals';
import { GeneralSearch, Library, ActivityList, ScheduleList, ClassList } from '../../containers';
import PostPage from '../../containers/PostPage/PostPage';
import PhotoDetail from '../PhotoDetail';
import VideoDetail from '../VideoDetail';
import AudioDetail from '../AudioDetail';
import Comment from '../../components/Comment/Comment';
import  Profile from '../../containers/Profile/Profile';
import EditComment from '../../components/Comment/EditComment';
import PostFollowType from '../../components/Post/PostFollowType';
import PostSubFollowType from '../../components/Post/PostSubFollowType';
import GooglePlaceScreen from '../../screens/GooglePlaceInput/GooglePlaceInput';

const RootNavLoggedTab = TabNavigator({
    NewsWall : {screen  : StackNavigator({
      NewsWallHome : {
        screen : Newswall,
        navigationOptions: ({ navigation }) => {
            const newFormRoute = navigation.state;
              return {
                mode: 'modal',
                headerMode: 'none',
                header : null,
                tabBarVisible: newFormRoute.params && newFormRoute.params.tabBarVisible,
              }
          }
      },
      GeneralSearch : {
        screen :  GeneralSearch,
        navigationOptions: {
          mode: 'modal',
          headerMode: 'none',
          header : null,
        }
      } ,
      PostPage:  {screen : PostPage,
        navigationOptions: {
          mode: 'modal',
          headerMode: 'none',
          header : null,
        }},
      PhotoDetail : {screen : PhotoDetail},
      VideoDetail : {screen : VideoDetail},
      AudioDetail : {screen : AudioDetail},
      Comment : {screen : Comment},
      EditComment : {screen : EditComment},
      PostFollowType : {
        screen : PostFollowType,
        navigationOptions : {
          mode : 'modal',
          headerMode : 'none',
          header : null,
        }
      },
      PostSubFollowType : {
        screen : PostSubFollowType,
        navigationOptions : {
          mode : 'modal',
          headerMode : 'none',
          header : null,
        }
      },

    },{
        initialRouteName : 'NewsWallHome'
      }
    )
  },
    // Location : { screen : StackNavigator({
    //     LocationIndex : {
    //       screen : Location,
    //       navigationOptions : {
    //         header : null
    //       }
    //     },
    //     GooglePlace : {screen : GooglePlaceScreen},
    //     MyLocation : {screen : MyLocation}
    //   },{
    //     initialRouteName : 'LocationIndex'
    //   }),
    // },
    Location : {
      screen : SwitchNavigator({
          LocationLoading: LocationLoading,
          MyLocation: { screen : StackNavigator({
                LocationIndex : {
                  screen : MyLocation,
                  navigationOptions : {
                    header : null
                  }
                },
                GooglePlace : {screen : GooglePlaceScreen},
              },{
                initialRouteName : 'LocationIndex'
              }),
            },
          TrainerLocation: { screen : StackNavigator({
            LocationTrainerIndex : {
              screen : TrainerLocation,
              navigationOptions : {
                header : null
              }
            },
            GooglePlace : {screen : GooglePlaceScreen},
            },{
              initialRouteName : 'LocationTrainerIndex'
            }),
          }
        })
    },
    Notification : {screen : Notification},
    FitnessWellness : {screen : FitnessWellness},
    Profile : {
      screen : StackNavigator({
        ProfileIndex : {
          screen : Profile,
          navigationOptions: {
            header: null,
          }
        },
        PostPage:  {
          screen : PostPage,
          navigationOptions: {
            header: null,
          }},
        Library : {
          screen : Library ,
          navigationOptions: {
            header: null,
          }},
        PhotoDetail : {screen : PhotoDetail},
        VideoDetail : {screen : VideoDetail},
        AudioDetail : {screen : AudioDetail},
        ActivityList : {screen : ActivityList},
        ScheduleList : {screen : ScheduleList},
        ClassList : {screen : ClassList}
      },{
          mode: 'modal',
        })
    }
  },{
    initialRouteName : 'Notification',
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
         // iconName = `ios-navigate${focused ? '' : '-outline'}`;
          iconName = `ios-compass${focused ? '' : '-outline'}`;
        }else if (routeName === 'Profile') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
        }else if (routeName === 'Notification') {
          iconName = `ios-notifications${focused ? '' : '-outline'}`;

         return <IconBadge
          MainElement={<Ionicons name={iconName} size={25} color={tintColor} />}
          BadgeElement={<Text style={{ color: 'white', fontSize : 8, fontWeight : 'bold' }}>20</Text>}
          IconBadgeStyle={{
            width:17,
            height:17,
            minWidth:17,
            marginRight : -9,
            marginTop : -7,
            borderRadius :17/2 
          }}
          /*Hidden={screenProps.unreadMessagesCount === 0}*/
        />

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

export default RootNavLoggedTab;