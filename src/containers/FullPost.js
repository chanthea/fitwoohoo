import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
export default class FullPost extends Component {
  render() {
    return (
     
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={require('../images/profile.jpg')} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                {/* <Image source={require('../images/cover.jpeg')} style={{height: 200, width: '100%', flex: 1}}/> */}
                <Text>
                Begins with the Card List component, which is similar to our List Avatar.
Make use of Left, Body and Right components to align the content of your Card header;
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-github" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={require('../images/profile.jpg')} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                {/* <Image source={require('../images/cover.jpeg')} style={{height: 200, width: '100%', flex: 1}}/> */}
                <Text>
                Begins with the Card List component, which is similar to our List Avatar.
Make use of Left, Body and Right components to align the content of your Card header;
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-github" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={require('../images/profile.jpg')} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                {/* <Image source={require('../images/cover.jpeg')} style={{height: 200, width: '100%', flex: 1}}/> */}
                <Text>
                Begins with the Card List component, which is similar to our List Avatar.
Make use of Left, Body and Right components to align the content of your Card header;
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-github" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
        </Content>
    );
  }
}