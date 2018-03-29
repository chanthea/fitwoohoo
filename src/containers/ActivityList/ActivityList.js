import React, {Component} from 'react';
import Activity from '../../components/Activity';
import {Text, View, StyleSheet, Platform, ScrollView}  from 'react-native';
import { HeaderTab } from '../../components/common';
import { Icon, Thumbnail, Left, Right, List, ListItem, Body, Content } from 'native-base';




class ActivityList extends Component {
  static navigationOptions = {
    header : null
  }
    render(){
        return(
            <HeaderTab 
            goBackPressed = {()=>this.props.navigation.goBack()}
            menuPressed = {()=>this.props.navigation.navigate('DrawerOpen')}
            title='Activities'
            noRight={false}
            >
              <ScrollView>
                <List>
                  <Activity />
                  <Activity />
                  <Activity />
                  <Activity />
                  <Activity />
                  
                </List>
              </ScrollView>
            </HeaderTab>
        );
    }
}

export  { ActivityList };
