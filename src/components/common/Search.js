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
          <Item style={{backgroundColor : 'rgba(0,0,0,0.4)', flex :1}}>
            <Icon name="ios-search" style={{color: 'white'}}/>
            <Input small  placeholder="Search" placeholderTextColor='rgba(255,255,255,0.7)' />
          </Item>
          {/* <Button onPress={this.props.notificationPressed} transparent style={[styles.buttonStyle,{marginLeft : 5}]} >
                <Icon style={styles.iconStyle}  name="ios-notifications"/>
          </Button> */}
          <Button onPress={this.props.menuPressed} transparent style={[styles.buttonStyle,{marginRight : -10}]} >
                <Icon style={styles.iconStyle} name="md-options"/>
          </Button>
        </Header>
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
  }
});

export { Search };
