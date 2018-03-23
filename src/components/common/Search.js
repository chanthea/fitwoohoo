import React, { Component } from 'react';
import {Left, Container, Header,Right, Item, Input, Icon, Button, Badge} from 'native-base';
import IconBadge from 'react-native-icon-badge';
import { _paddingAndroid } from '../../helpers';
import Global from '../../globals/Globals';
import {StyleSheet, Text} from 'react-native';

class Search extends Component {
  render() {
    return (
        <Header searchBar rounded 
        style={{
          backgroundColor: Global.COLOR.MAIN, 
          marginTop : _paddingAndroid(), 
          flexDirection : 'row'}}
        > 
          <Button onPress={this.props.menuPressed} transparent style={[styles.buttonStyle,{marginLeft : -10}]} >
                <Icon style={styles.iconStyle} name="md-options"/>
          </Button>
          <Item style={{backgroundColor : 'rgba(0,0,0,0.4)', flex :1}}>
            <Icon name="ios-search" style={{color: 'white'}}/>
            <Input small  placeholder="Search" placeholderTextColor='rgba(255,255,255,0.7)' />
          </Item>
          {/* <Button onPress={this.props.notificationPressed} transparent style={[styles.buttonStyle,{marginLeft : 5}]} >
                <Icon style={styles.iconStyle}  name="ios-notifications"/>
          </Button> */}
          <Button onPress={this.props.menuPressed} transparent style={[styles.buttonStyle,{marginRight : -10}]} >
              {/* <Badge ><Text>51</Text></Badge>
                <Icon style={styles.iconStyle} name="ios-chatbubbles"/> */}
                <IconBadge
          MainElement={<Icon style={styles.iconStyle} name="ios-chatbubbles"/>}
          BadgeElement={<Text style={{ color: 'white', fontSize : 8, fontWeight : 'bold' }}>20</Text>}
          IconBadgeStyle={styles.badgeStyle}/>
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

export { Search };
