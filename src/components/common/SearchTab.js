import React, { Component } from 'react';
import {Left, Container, Header,Right, Item, Input, Icon, Button, Body, Title} from 'native-base';
import IconBadge from 'react-native-icon-badge';
import { _paddingAndroid } from '../../helpers';
import Global from '../../globals/Globals';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

class SearchTab extends Component {
  render() {
    return (
        <Header searchBar rounded 
        style={{
          backgroundColor: Global.COLOR.MAIN, 
          marginTop : this.props.hasMargin ? _paddingAndroid() : 0, 
          flexDirection : 'row'}}
        > 
          <Button onPress={this.props.menuPressed} transparent style={[styles.buttonStyle,{marginLeft : -10}]} >
                <Icon style={styles.iconStyle} name="md-options"/>
          </Button>
          <Body>
            <Title>Newswall</Title>
          </Body>
        
          {/* <Button small light transparent block
        style={{
          flexDirection : 'row', 
          flex :1,
          justifyContent : 'flex-start',
          height : 40,
          paddingBottom : 0,
          borderBottomWidth : 0.5, 
          marginTop : 5,
          borderColor : 'rgba(255,255,255,0.4)'
          
        }}
        onPress={this.props.searchPressed}
        >
            <Icon name='ios-search' style={{marginLeft : 10,color: 'white', fontSize : 20 }}/>
            <Text style={{color : 'rgba(255,255,255,0.7)', fontSize:16, fontWeight : 'normal'}} 
            uppercase={false}>Search</Text>
          </Button>         */}
          <Button  onPress={this.props.searchPressed} transparent style={[styles.buttonStyle,{marginRight : -10}]} >
                <Icon style={styles.iconStyle} name="ios-search"/>
          </Button>
          <Button onPress={this.props.menuPressed} transparent style={[styles.buttonStyle,{marginRight : -10}]} >
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

export { SearchTab };
