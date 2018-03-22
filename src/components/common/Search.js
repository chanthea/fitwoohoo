import React, { Component } from 'react';
import {Container, Header,Right, Item, Input, Icon, Button} from 'native-base';
import { _paddingAndroid } from '../../helpers';
import Global from '../../globals/Globals';
import {StyleSheet} from 'react-native';

class Search extends Component {
  render() {
    return (
        <Header searchBar rounded 
        style={{
          backgroundColor: Global.COLOR.MAIN, 
          marginTop : _paddingAndroid(), 
          flexDirection : 'row'}}
        > 
          <Item style={{flexGrow :1}}>
            <Icon name="ios-search" />
            <Input small placeholder="Search..." />
          </Item>
          <Button onPress={this.props.notificationPressed} transparent style={[styles.buttonStyle,{marginLeft : 5}]} >
                <Icon style={styles.iconStyle}  name="ios-notifications"/>
          </Button>
          <Button onPress={this.props.menuPressed} transparent style={[styles.buttonStyle,{marginRight : -5}]} >
                <Icon style={styles.iconStyle} name="ios-options"/>
          </Button>
        </Header>
    );
  }
}
const styles = StyleSheet.create({
  iconStyle : {
    paddingTop: 10,
     marginLeft: 0,
     marginRight : 0, 
     paddingBottom : 10,
     color:'#ffffff'

  },
  buttonStyle : {
    width: 40,
    height : 40
  }
});

export { Search };
