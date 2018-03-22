import React, { Component } from 'react';
import { DrawerNavigator, DrawerItems, SafeAreaView} from 'react-navigation';
import {Profile , Fitbit} from '../../containers';
import MainTab from './MainTab';
import {Container,Content, Header,Icon, Body} from 'native-base';
import {StyleSheet, Image} from 'react-native';
import Global from '../../globals/Globals';

const CustomDrawerContentComponent = (props) => (
    <Container>
      <Header style={styles.drawerHeader}>
        <Body>
          <Image
            style={styles.drawerImage}
            source={require('../../images/icon.png')} />
        </Body>
      </Header>
      <Content>
        <DrawerItems {...props} />
      </Content>
    </Container>
  
  );

const MainDrawer = DrawerNavigator({
    // Profile : { screen : Profile},
    // Fitbit : {screen : Fitbit},
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
},{
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

    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    drawerHeader: {
      height: 200,
      backgroundColor: Global.COLOR.MAIN
    },
    drawerImage: {
      height: 150,
      width: 150,
      borderRadius: 75
    }
  
  })

export default MainDrawer;