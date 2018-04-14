import React, { Component } from 'react';
import { ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

export default class CommentListItem extends React.PureComponent {
  render() {
    return (
        <ListItem avatar>
          <Left>
            <Thumbnail source={require('../../images/profile.jpg')}/>
          </Left>
          <Body>
            <Text>Kumar Pratik</Text>
            <Text note>Doing what you like will always keep you happy . .</Text>
          </Body>
          <Right>
            <Text note>3:43 pm</Text>
          </Right>
        </ListItem>
    );
  }
}
