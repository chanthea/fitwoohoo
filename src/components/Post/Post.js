import React, { Component } from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Platform} from 'react-native';
import TimeAgo from 'react-native-timeago';
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
  import Global from '../../globals/Globals';
  import PhotoGrid from 'react-native-thumbnail-grid';
  import emojiButtom from './emojiButton';
  import _ from 'lodash';



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
export default class Post extends React.PureComponent {

  constructor(props){
    super(props)
    this.state = {
      images: []
    }
  }

  componentWillMount () {
    const images = [
      'https://drscdn.500px.org/photo/216465193/m%3D2048_k%3D1_a%3D1/dda61fd7cea5013f8ebe7661b7abea3a',
      'https://drscdn.500px.org/photo/215467843/m%3D2048_k%3D1_a%3D1/344703e86f31e1fffb2d63effa2cee33',
      'https://drscdn.500px.org/photo/216340727/m%3D2048_k%3D1_a%3D1/20d583e15467fb39d06d48131767edc2',
      // 'https://drscdn.500px.org/photo/215498077/m%3D2048_k%3D1_a%3D1/f79e906eb96938807f6f9d758fc652fd',
      // 'https://drscdn.500px.org/photo/216559713/m%3D2048_k%3D1_a%3D1/393ef5251fa94964fe62cad52a416b7e',
      // 'https://drscdn.500px.org/photo/214943889/m%3D2048_k%3D1_a%3D1/90bd2e3619dfcaae53fed683561aae1b',
      // 'https://drscdn.500px.org/photo/216158509/m%3D2048_k%3D1_a%3D1/cf70d51aab6ca4c4a3c1ecc225c69990',
      // 'https://drscdn.500px.org/photo/216111469/m%3D2048_k%3D1_a%3D1/d2d83296c838258095dbf2bffda70602',
      // 'https://drscdn.500px.org/photo/216051623/m%3D2048_k%3D1_a%3D1/5a3732bb413f240ad71b8279b038a3ff',
      // 'https://drscdn.500px.org/photo/216047335/m%3D2048_k%3D1_a%3D1/4237ac4606474f0ec7ccc05ca311772e',
      // 'https://drscdn.500px.org/photo/216000289/m%3D2048_k%3D1_a%3D1/5ac2a21092f9281feef3ab8484d2b19c'
    ]
    this.setState({ images: images })
  }

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



  _showImage = (uri) =>{
    console.log(uri);
  }


  render() {
    let photos = [];
    let videos = [];
    let audios = [];
    let shareUser = [];
    let user = [];
    let post = [];
    const { originalPost } = this.props;
    if(originalPost.post_type === 'share'){
       shareUser = originalPost.user;
        user = originalPost.post.user;
        post = originalPost.post;
    }else if(originalPost.post_type === 'post'){
        user = originalPost.user;
        post = originalPost;
    }
   
    if(post.type === 'image'){
      _.each(post.photos, function(val,i) { 
        val.uri = Global.IMAGE.IMAGE_POST_THUMB+val.path;
        val.hd_image =  Global.IMAGE.IMAGE_POST+val.path;
      });
      photos = post.photos;
    }else if(post.type === 'video'){
      _.each(post.videos, function(val,i) { 
        val.uri = Global.IMAGE.VIDEO_POST+val.thumb;
      });
      videos = post.videos;
    }else if(post.type === 'audio'){
      _.each(post.audios, function(val,i) { 
        val.uri = Global.IMAGE.AUDIO_POST;
      });
      audios = post.audios;
    }
  
  



    return (

          <Card  style={styles.cardStyle}>
            {originalPost.post_type === 'share' && 
            <View>
              <CardItem>
                <Left style={{flex :3}}>
                  <Thumbnail small  source={{uri :Global.PHOTO.PROFILE+shareUser.photo}} />
                  <Body>
                    <Text style={styles.name}>{shareUser.name + ' '+shareUser.lastname } shared this</Text>
                    <View style={{flexDirection : 'row'}}>
                    <View style={{flexDirection : 'row'}}>
                      <Icon name="ios-globe-outline"
                      style={[styles.iconSmall,{ marginTop : Platform.OS === 'android' ? 2 : 0 }]} 
                      /> 
                      <Text note style={styles.time}>{originalPost.follow_type.type}</Text>
                    </View>
                        <View style={{flexDirection : 'row'}}>
                          <Icon name="ios-clock-outline"
                          style={[styles.iconSmall,{ marginTop : Platform.OS === 'android' ? 2 : 0 }]} 
                          /> 
                          <Text note style={styles.time}><TimeAgo time={originalPost.created_atISO} /></Text>
                      </View>
                    </View>
                  </Body>
                </Left>
                <Right>
                    <Button transparent light style={styles.option}>
                    <Icon name="md-more" type="Ionicons" style={styles.optionButtonIcon}/>
                  </Button>
                </Right>
            </CardItem>
            <CardItem>
            <Text style={styles.postText}>
              {originalPost.desc}
              </Text>
            </CardItem>
          </View>
            
          }
            <CardItem style={[originalPost.post_type === 'share' && styles.shareCard]}>
              <Left>
                <Thumbnail small  source={{uri :Global.PHOTO.PROFILE+user.photo}} />
                <Body>
                  <Text style={styles.name}>{user.name + ' '+user.lastname }</Text>
                  <View style={{flexDirection : 'row'}}>
                  <View style={{flexDirection : 'row'}}>
                    <Icon name="ios-globe-outline"
                     style={[styles.iconSmall,{ marginTop : Platform.OS === 'android' ? 2 : 0 }]} 
                     /> 
                    <Text note style={styles.time}>{post.follow_type.type}</Text>
                   </View>
                      <View style={{flexDirection : 'row'}}>
                        <Icon name="ios-clock-outline"
                         style={[styles.iconSmall,{ marginTop : Platform.OS === 'android' ? 2 : 0 }]} 
                         /> 
                        <Text note style={styles.time}><TimeAgo time={post.created_atISO} /></Text>
                    </View>
                  </View>
                </Body>
              </Left>
              <Right>
                <Button transparent light style={styles.option}>
                <Icon name="md-more" type="Ionicons" style={styles.optionButtonIcon}/>
              </Button>
            </Right>
            </CardItem>
            {post.type === 'image' ? 
            (<CardItem cardBody>
            <PhotoGrid source={photos} 
            onPressImage={source => this._showImage(source)}
            /> 
            </CardItem>) :  
            post.type === 'video' ?
            (<CardItem cardBody>
              <PhotoGrid isVideo={true} source={videos} 
               onPressImage={source => this._showImage(source)}
              /> 
            </CardItem> ) :
             post.type === 'audio' &&
             (<CardItem cardBody>
              <PhotoGrid  isVideo={true} source={audios} 
              onPressImage={source => this._showImage(source)}
              /> 
              </CardItem>) 
           
          }
            
            <CardItem>
              <Text style={styles.postText}>
              {post.description}
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
    shareCard : {
      width:'94%', 
      marginLeft : '3%', 
      borderWidth : 0.4, 
      borderBottomWidth : 0, 
      borderColor : 'rgba(0,0,0,0.3)',
      borderRadius : 5},
    optionButton : {height : 30},
    optionButtonIcon : {color : 'rgba(0,0,0,0.8)', alignSelf :'flex-start', fontSize : 20, paddingTop : 3},
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