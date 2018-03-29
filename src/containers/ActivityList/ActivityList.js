import React, {Component} from 'react';
import Activity from '../../components/Activity';
import {Text, View, StyleSheet, Platform}  from 'react-native';
import { HeaderTab } from '../../components/common';
import { Icon, Thumbnail, Left, Right, List, ListItem, Body, Content } from 'native-base';




class ActivityList extends Component {
  static navigationOptions = {
    header : null,
    swipeEnabled : false
  }
    render(){
        return(
            <HeaderTab 
            goBackPressed = {()=>this.props.navigation.goBack()}
            menuPressed = {()=>this.props.navigation.navigate('DrawerOpen')}
            title='My Activities'
            noRight={false}
            >
            <Content scrollEnabled={true}>
              <Activity/>
              <Activity/>
              <Activity/>
              <Activity/>
              <Activity/>
              <Activity/>
            </Content>
            
            </HeaderTab>
        );
    }
}

export  { ActivityList };
