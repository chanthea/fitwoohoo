import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
export default class SearchName extends Component {
  render() {
    return (
      <Container>
        {/* <Header searchBar  rounded style={{backgroundColor: '#ffffff', borderRadius : 5}}>
          <Item >
            <Icon name="search" />
            <Input placeholder="Search by name... " />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header> */}
        <Button iconLeft iconRight light block
        style={{flexDirection : 'row', justifyContent : 'space-between', height: 50}}
        onPress = {this.props.searchNameScreenPressed}
        >
            <Icon name='ios-search' style={{paddingLeft: 18}}/>
            <Text style={{marginLeft : '-30%', color : 'rgba(0,0,0,0.7)', fontSize:17, fontWeight : 'normal'}} 
            uppercase={false}>Search by name... </Text>
            <Icon name='ios-people' style={{paddingRight : 5}}/>
          </Button>
      </Container>
    );
  }
}