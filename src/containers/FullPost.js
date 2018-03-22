import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Right,Left, Body } from 'native-base';
import {StyleSheet, View} from 'react-native';
export default class FullPost extends Component {
  render() {
    return (
     
        <Content>
          <Card style={styles.cardStyle}>
            <CardItem>
              <Left>
                <Thumbnail small  source={require('../images/profile.jpg')} />
                <Body>
                  <Text style={styles.name}>Nguon Lykhim</Text>
                  <View style={{flexDirection : 'row'}}>
                  <View style={{flexDirection : 'row'}}>
                    <Icon name="ios-globe-outline" style={styles.iconSmall} /> 
                    <Text note style={styles.time}>Colleagues</Text>
                   </View>
                    <View style={{flexDirection : 'row'}}>
                        <Icon name="ios-clock-outline" style={styles.iconSmall}  /> 
                        <Text note style={styles.time}>9 minutes ago</Text>
                    </View>
                  </View>
                  
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={require('../images/cover.jpeg')} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Text style={styles.postText}>
              A React component for displaying different types of images, including network images, static resources, temporary local images, and images from local disk, such as the camera roll.
                </Text>
            </CardItem>
            <CardItem style={{justifyContent: 'space-between'}}>
                <Button small transparent >
                  <Icon style={styles.icon} name="ios-happy-outline" />
                  <Text style={styles.iconText} uppercase={false}>Emoji</Text>
                </Button>
                <Button small transparent>
                  <Icon style={styles.icon} name="ios-chatbubbles-outline" />
                  <Text style={styles.iconText} uppercase={false}>Comment</Text>
                </Button>
                <Button small transparent>
                  <Icon style={styles.icon} name="ios-redo-outline" />
                  <Text style={styles.iconText} uppercase={false}>Share</Text>
                </Button>
             
            </CardItem>
          </Card>
          <Card style={styles.cardStyle}>
            <CardItem>
              <Left>
                <Thumbnail small  source={require('../images/profile.jpg')} />
                <Body>
                  <Text style={styles.name}>Nguon Lykhim</Text>
                  <View style={{flexDirection : 'row'}}>
                  <View style={{flexDirection : 'row'}}>
                    <Icon name="ios-globe-outline" style={styles.iconSmall} /> 
                    <Text note style={styles.time}>Public</Text>
                   </View>
                    <View style={{flexDirection : 'row'}}>
                        <Icon name="ios-clock-outline" style={styles.iconSmall}  /> 
                        <Text note style={styles.time}>9 minutes ago</Text>
                    </View>
                  </View>
                  
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Text style={styles.postText}>
              Create react View wrapper over the Text you want to adjust the underline. And then add borderBottomWidth to View and adjust the distance of underline from Text paddingBottom.
                </Text>
            </CardItem>
            <CardItem style={{justifyContent: 'space-between'}}>
                <Button small transparent >
                  <Icon style={styles.icon} name="ios-happy-outline" />
                  <Text style={styles.iconText} uppercase={false}>Emoji</Text>
                </Button>
                <Button small transparent>
                  <Icon style={styles.icon} name="ios-chatbubbles-outline" />
                  <Text style={styles.iconText} uppercase={false}>Comment</Text>
                </Button>
                <Button small transparent>
                  <Icon style={styles.icon} name="ios-redo-outline" />
                  <Text style={styles.iconText} uppercase={false}>Share</Text>
                </Button>
             
            </CardItem>
          </Card>
          <Card style={styles.cardStyle}>
            <CardItem>
              <Left>
                <Thumbnail small  source={require('../images/profile.jpg')} />
                <Body>
                  <Text style={styles.name}>Nguon Lykhim</Text>
                  <View style={{flexDirection : 'row'}}>
                  <View style={{flexDirection : 'row'}}>
                    <Icon name="ios-globe-outline" style={styles.iconSmall} /> 
                    <Text note style={styles.time}>Public</Text>
                   </View>
                    <View style={{flexDirection : 'row'}}>
                        <Icon name="ios-clock-outline" style={styles.iconSmall}  /> 
                        <Text note style={styles.time}>9 minutes ago</Text>
                    </View>
                  </View>
                  
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={require('../images/profile.jpg')} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Text style={styles.postText}>
              Create react View wrapper over the Text you want to adjust the underline. And then add borderBottomWidth to View and adjust the distance of underline from Text paddingBottom.
                </Text>
            </CardItem>
            <CardItem style={{justifyContent: 'space-between'}}>
                <Button small transparent >
                  <Icon style={styles.icon} name="ios-happy-outline" />
                  <Text style={styles.iconText} uppercase={false}>Emoji</Text>
                </Button>
                <Button small transparent>
                  <Icon style={styles.icon} name="ios-chatbubbles-outline" />
                  <Text style={styles.iconText} uppercase={false}>Comment</Text>
                </Button>
                <Button small transparent>
                  <Icon style={styles.icon} name="ios-redo-outline" />
                  <Text style={styles.iconText} uppercase={false}>Share</Text>
                </Button>
             
            </CardItem>
          </Card>

        

        </Content>
    );
  }
}

const styles = StyleSheet.create({
    cardStyle : {marginLeft:0,marginRight:0},
    icon : {
        color : 'rgba(0,0,0,0.5)',
        fontSize : 20,
        paddingRight : 0,
        marginRight : 0
    },
    iconText : {
        fontSize : 13,
        color : 'rgba(0,0,0,0.5)',
        paddingLeft : 5
    },
    postText : {
        fontSize : 13,
        lineHeight: 20,
    },
    name : {
        fontSize : 14
    },
    time : {
        fontSize : 10
    },
    iconSmall : {
        fontSize : 11, 
        color : 'rgba(0,0,0,0.6)', 
        paddingRight : 2, 
        marginTop : 2
    }
});