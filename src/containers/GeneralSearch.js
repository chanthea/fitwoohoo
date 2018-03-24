import React, { Component } from 'react';
import {Left, Container, Header,Right, Item, Input, Icon, Button, List, ListItem, Thumbnail, Body, Text} from 'native-base';
import { Wrapper } from '../components/common';
import { _paddingAndroid } from '../helpers';
import Global from '../globals/Globals';
import {StyleSheet, View} from 'react-native';

class GeneralSearch extends Component {
  static navigationOptions = {
    tabBarVisible : false,
    drawerLockMode: 'locked-closed',
    swipeEnabled : false
  }
  render() {
    
    return (
      <Wrapper>
        <Header searchBar rounded 
        style={{
          backgroundColor: Global.COLOR.MAIN, 
          marginTop : _paddingAndroid(), 
          flexDirection : 'row'}}
        > 
          <Button onPress={()=>this.props.navigation.goBack()} transparent style={[styles.buttonStyle,{marginLeft : -10}]} >
                <Icon style={styles.iconStyle} name="arrow-back"/>
          </Button>
          <Item style={{
            backgroundColor :'transparent', 
            flex :1,  
            borderBottomWidth : 0.5, 
            borderColor : 'rgba(255,255,255,0.4)'}}>
            <Icon name="ios-search" style={{color: 'white'}}/>
            <Input small autoFocus placeholder="Search" placeholderTextColor='rgba(255,255,255,0.7)' />
          </Item>
        </Header>
        <View style={{ flex: 1, backgroundColor : '#ffffff' }}>
        <List>
            <ListItem avatar>
              <Left>
                <Thumbnail small source={require('../images/profile.jpg')} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail small source={require('../images/profile.jpg')} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          </List>
        </View>
      </Wrapper>
    );
  }
}
const styles = StyleSheet.create({
  iconStyle : {
     marginLeft: 0,
     marginRight : 0, 
     color:'#ffffff', 
  },
  buttonStyle : {
    width: 50,
    height : 40
  },
  badgeStyle : {
    width:17,
    height:17,
    minWidth:17,
    marginRight : -9,
    marginTop : -7,
    borderRadius :17/2 
  }

});

export {GeneralSearch};
