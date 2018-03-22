import React, { Component } from 'react';
import {View} from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Text, Left, Body  } from 'native-base';
import { _paddingAndroid } from '../helpers';
import SearchBar from '../components/common/Search';
import {NavigationActions} from 'react-navigation';
import GooglePlacesInput from './GooglePlaceInput/GooglePlaceInput';
export default class SearchNameScreen extends Component {
  
  static navigationOptions = {
    header : null
  };
 
  render() {
    return (
      <Container>
        <Header  searchBar style={{
          backgroundColor: '#ffffff', 
          marginTop : _paddingAndroid(),
          }}>
          <Item>
              <Button onPress={()=>this.props.navigation.dispatch(NavigationActions.back())} transparent style={{marginTop : -2}}>
              <Icon style={{color : 'rgba(0,0,0,0.8)'}} name="arrow-back"/>
            </Button>
            <Input placeholder="Search by name..." />
            <Icon name="ios-people" />
          </Item>
        </Header>
      </Container>
      
    );
  }
}
