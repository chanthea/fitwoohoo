import React, { Component } from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Platform} from 'react-native';
import { 
  Container, 
  Header, 
  Content, 
  Card, 
  CardItem, 
  Thumbnail, 
  Text, 
  Button, 
  Icon, 
  Right,
  Left, 
  Body,
  ListItem } from 'native-base';


const ButtonEmoji = [
  {icon : 'ios-thumbs-up-outline', title : 'Good'},
  {icon : 'ios-thumbs-down-outline', title : 'Bad'},
  {icon : 'ios-happy-outline', title : 'Happy'},
  {icon : 'ios-sad-outline', title : 'Sad'}
];

const EmojiCount = [
  {icon : 'ios-thumbs-up-outline', count : 10},
  {icon : 'ios-thumbs-down-outline', count : 2},
  {icon : 'ios-happy-outline', count : 3},
  {icon : 'ios-sad-outline', count : 5},
  {icon : 'ios-chatbubbles-outline', count : 5},
  {icon : 'ios-redo-outline', count : 5}
];
export default class Post extends Component {

  _emojiButton = (items) => {
    let buttons = items.map((item, i) =>{
        return (
        <Button key={i} style={styles.buttonStyle} small transparent >
          <Icon style={styles.icon} name={item.icon} />
          <Text style={styles.iconText} uppercase={false}>{item.title}</Text>
        </Button>
        );
    })
    return buttons;
  };

  _emojiButtonCount = (items) => {
    let buttons = items.map((item, i) =>{
        return (
          <View key={i} style={[styles.listView,i !== 0  && {marginLeft : 15}]}>
                <Icon style={styles.listItemIcon} name={item.icon} />
                <Text style={styles.listItemText}>{item.count}</Text>
              </View>
        );
    })
    return buttons;
  };

  render() {
    return (
          <Card  style={styles.cardStyle}>
            <CardItem>
              <Left>
                <Thumbnail small  source={require('../images/profile.jpg')} />
                <Body>
                  <Text style={styles.name}>Nguon Lykhim</Text>
                  <View style={{flexDirection : 'row'}}>
                  <View style={{flexDirection : 'row'}}>
                    <Icon name="ios-globe-outline"
                     style={[styles.iconSmall,{ marginTop : Platform.OS === 'android' ? 2 : 0 }]} 
                     /> 
                    <Text note style={styles.time}>Colleagues</Text>
                   </View>
                    <View style={{flexDirection : 'row'}}>
                        <Icon name="ios-clock-outline"
                         style={[styles.iconSmall,{ marginTop : Platform.OS === 'android' ? 2 : 0 }]} 
                         /> 
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
            <ListItem icon style={styles.listItemStyle}>
              {this._emojiButtonCount(EmojiCount)}
            </ListItem>
            <CardItem style={styles.cardButtonStyle}>
                {this._emojiButton(ButtonEmoji)}
                <Button style={styles.buttonStyle} small transparent>
                  <Icon style={styles.icon} name="ios-chatbubbles-outline" />
                  <Text style={[styles.iconText,styles.commentPadding]} uppercase={false}>Comment</Text>
                </Button>
                <Button style={styles.buttonStyle} small transparent>
                  <Icon style={styles.icon} name="ios-redo-outline" />
                  <Text style={styles.iconText} uppercase={false}>Share</Text>
                </Button>
            </CardItem>
          </Card>
    );
  }
}

const styles = StyleSheet.create({
    listView : {flexDirection : 'row'},
    listItemStyle : {
      justifyContent: 'flex-start', 
     borderTopWidth : 0.5, 
     borderColor : '#eeeeee',
     height : 20,
     width :'92%',
     marginLeft : '4%'
    },
    listItemIcon : {
      fontSize : 15, 
      color : 'rgba(0,0,0,0.3)'
    },
    listItemText : {
      fontSize : 9, 
      paddingLeft : 3, 
      color : 'rgba(0,0,0,0.3)'
    },
    cardStyle : {
      marginLeft:0,
      marginRight:0},
    icon : {
        color : 'rgba(0,0,0,0.5)',
        fontSize : 16,
        // paddingRight : 0,
        // marginRight : 0
    },
    iconText : {
        fontSize : 10,
        color : 'rgba(0,0,0,0.4)',
        marginTop : -3
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
    buttonStyle : {
        flexDirection : 'column',
        justifyContent : 'center',
        paddingTop : 13,
        paddingBottom : 10,
    },
    cardButtonStyle :{
        justifyContent: 'space-between', 
        borderTopWidth : 0.5, 
        borderColor : '#eeeeee',
        paddingBottom : 5,
        paddingTop : 5,
        marginLeft : -10,
        marginRight : -10
      
    },
    commentPadding : {paddingLeft : 3, paddingRight : 3},
    iconSmall : {
        fontSize : 11, 
        color : 'rgba(0,0,0,0.6)', 
        paddingRight : 2, 
       
    }
});