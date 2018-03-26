import React, { Component } from 'react';
import { StackNavigator, DrawerNavigator, DrawerItems, SafeAreaView} from 'react-navigation';
import {Profile , Fitbit, GeneralSearch} from '../../containers';
import MainTab from './MainTab';
import {Container,Content, Text, Button, Icon} from 'native-base';
import {StyleSheet, Image, TouchableOpacity, ImageBackground, View} from 'react-native';
import Global from '../../globals/Globals';
import ProfileDrawer from '../ProfileDrawer';
import MenuDrawer from '../MenuDrawer';


const CustomDrawerContentComponent = (props) => (
    <Container>
        <ProfileDrawer/>
        <MenuDrawer />
      {/* <Content>
        <DrawerItems {...props} />
        </Content> */}
    </Container>
  
  );

const MainDrawer = DrawerNavigator({
    Profile : { screen : Profile},
    Fitbit : {screen : Fitbit},
    HomePage : {
        screen : MainTab,
        navigationOptions: {
            drawerLabel: 'Newswall',
            drawerIcon: ({ tintColor }) => (<Icon name="ios-arrow-back"/> ),
        }
    }
},{
    initialRouteName : "HomePage",
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
        activeTintColor: '#e91e63',
        itemsContainerStyle: {
          marginVertical: 0,
        },
        iconContainerStyle: {
          opacity: 1
        },
      }
});

const styles = StyleSheet.create({

  });

export default MainDrawer;