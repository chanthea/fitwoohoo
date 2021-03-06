import React, { Component } from 'react';
import {Left, Container, Header,Right, Item, Input, Icon, Button} from 'native-base';
import { _paddingAndroid } from '../helpers';
import Global from '../globals/Globals';
import {StyleSheet, Text, View} from 'react-native';
import { Wrapper } from '../components/common';

class SearchNameScreen extends Component {
  static navigationOptions = {
    header : null
  };
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
            <Input small  
            placeholder="Search by name..." 
            placeholderTextColor='rgba(255,255,255,0.7)' 
            style={{color : '#ffffff', paddingLeft : 10}} />
          </Item>
        </Header>
        <View style={{ flex: 1, backgroundColor : '#ffffff' }}>
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

export default SearchNameScreen;
