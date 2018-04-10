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
  import * as Animatable from 'react-native-animatable';

export default class Post extends React.PureComponent {

  constructor(props){
    super(props)
    this.state = {
      images: []
    }
  }

  _bounce = (i) => {
   this.refs['animate'+i].bounceIn(1000).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
  };
 

  _emojiButton = (items, userLike) => {
    IconAnimated = Animatable.createAnimatableComponent(Icon);
    let buttons = items.map((item, i) =>{
        return (
        <Button onPress={()=>this._bounce(i)} key={i} style={styles.buttonStyle} small transparent >
          <IconAnimated ref={"animate"+i}
           style={[styles.icon, 
            userLike.length > 0 && (userLike[0].like === item.id && {color : item.color, fontSize : 18})
          ]} 
           name={userLike.length > 0 && userLike[0].like === item.id ? item.NIcon : item.icon} />
          <Text 
          style={[
            styles.iconText,
            item.title === 'comment' && styles.commentPadding,
           userLike.length > 0 && (userLike[0].like === item.id && {color : item.color})
          
          ]} 
           
           uppercase={false}>{item.title}</Text>
        </Button>
        );
        
    })
    return buttons;
  };

  
  _EmojiCountOject(good,bad,happy,sad,comment,share){
    return [
      {icon : 'ios-thumbs-up',  color : '#18dcff', count : good},
      {icon : 'ios-thumbs-down', color : '#ff4d4d', count :bad},
      {icon : 'ios-happy', color : '#ff9f43',count : happy},
      {icon : 'ios-sad',color : '#8395a7', count : sad},
      {icon : 'ios-chatbubbles', color : '#f368e0',count : comment},
      {icon : 'ios-redo', color : '#01a3a4',count : share}
    ];
  }

  _EmojiButtonObject(){
    return  [
      {icon : 'ios-thumbs-up-outline', NIcon:'ios-thumbs-up', color : '#18dcff',title : 'Good', id : 1},
      {icon : 'ios-thumbs-down-outline', NIcon:'ios-thumbs-down', color : '#ff4d4d', title : 'Bad', id : 0},
      {icon : 'ios-happy-outline', NIcon:'ios-happy', color : '#ff9f43', title : 'Happy', id : 2},
      {icon : 'ios-sad-outline', NIcon:'ios-sad', color : '#8395a7', title : 'Sad', id : 3},
      {icon : 'ios-chatbubbles-outline', NIcon:'ios-chatbubbles', color : '#f368e0', title : 'Comment', id : 20},
      {icon : 'ios-redo-outline', NIcon:'ios-redo', color : '#01a3a4',title : 'Share', id : 10}
    ];
  }

  _emojiButtonCount = (items) => {
    let allCount = 0;
    let buttons = items.map((item, i) =>{
      allCount+=item.count
      /*item.count !== 0 &&*/ 
      return <View key={i} style={[styles.listView,i !== 0  && {marginLeft : 15}]}>
                <View style={[styles.listItemIconContainer,{backgroundColor : item.color}]}>
                  <Icon style={[styles.listItemIcon]} name={item.icon} />
                </View>
                <Text style={[styles.listItemText,{color :  item.color, fontWeight : 'bold'}]}>{item.count}</Text>
              
              </View>
      
    })
   // allCount !== 0 && 
    return <ListItem icon style={styles.listItemStyle}>{buttons}</ListItem>;
  };

  render() {
    let EmojiCount = [];
    let photos = [];
    let videos = [];
    let audios = [];
    let shareUser = [];
    let user = [];
    let post = [];
    let images = [];
    let sounds = [];
    let count = {};
    const { originalPost } = this.props;

    ButtonEmoji = this._EmojiButtonObject();
    if(originalPost.post_type === 'share'){
       shareUser = originalPost.user;
        user = originalPost.post.user;
        post = originalPost.post;
        EmojiCount = this._EmojiCountOject(
          post.good_emojis_count,
          post.bad_emojis_count,
          post.funny_emojis_count,
          post.sad_emojis_count,
          post.comments_count,
          post.shares_count
        )
       
    }else if(originalPost.post_type === 'post'){
        user = originalPost.user;
        post = originalPost;
        EmojiCount = this._EmojiCountOject(
          originalPost.good_emojis_count,
          originalPost.bad_emojis_count,
          originalPost.funny_emojis_count,
          originalPost.sad_emojis_count,
          originalPost.comments_count,
          originalPost.shares_count
        )
    }
    
    if(post.type === 'image'){
     
      _.each(post.photos, function(val,i) { 
        val.uri = Global.IMAGE.IMAGE_POST_THUMB+val.path;
        val.hd_image =  Global.IMAGE.IMAGE_POST+val.path;
        val.index = i;
        images.push({
          source : { uri : Global.IMAGE.IMAGE_POST+val.path }
        }); 
      });
      photos = post.photos;
    }else if(post.type === 'video'){
      _.each(post.videos, function(val,i) { 
        val.uri = Global.IMAGE.VIDEO_POST+val.thumb;
        val.source = Global.VIDEO.VIDEO_POST+val.path;
      });
      videos = post.videos;
    }else if(post.type === 'audio'){
      _.each(post.audios, function(val,i) { 
        val.uri = Global.IMAGE.AUDIO_POST;
        val.index = i;
        sounds.push({
          uri : Global.AUDIO.AUDIO_POST+val.path
        })
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
                {originalPost.is_Owner &&
                  <Right>
                  <Button transparent light style={styles.option}>
                    <Icon name="md-more" type="Ionicons" style={styles.optionButtonIcon}/>
                  </Button>
                </Right>
                }
                
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
              {post.is_Owner && 
               <Right>
                <Button transparent light style={styles.option}>
                <Icon name="md-more" type="Ionicons" style={styles.optionButtonIcon}/>
              </Button>
            </Right>
              }
             
            </CardItem>
            {post.type === 'image' ? 
            (<CardItem cardBody>
            <PhotoGrid source={photos} 
            onPressImage={source => this.props.customNavigate('PhotoDetail',{source :source, images : images})}
            /> 
            </CardItem>) :  
            post.type === 'video' ?
            (<CardItem cardBody>
              <PhotoGrid isVideo={true} source={videos} 
               onPressImage={source => this.props.customNavigate('VideoDetail',{source : source})}
              /> 
            </CardItem> ) :
             post.type === 'audio' &&
             (<CardItem cardBody>
              <PhotoGrid  isVideo={true} source={audios} 
              onPressImage={source => this.props.customNavigate('AudioDetail',{source : source, sounds : sounds})}
              /> 
              </CardItem>) 
           
          }
            
            <CardItem>
              <Text style={styles.postText}>
              {post.description}
                </Text>
            </CardItem>
              {this._emojiButtonCount(EmojiCount)}
            <CardItem style={styles.cardButtonStyle}>
                {this._emojiButton(ButtonEmoji,post.user_like_dislike)}
            </CardItem>
          </Card>
    );
  }
}

const styles = StyleSheet.create({
    shareCard : {
      width:'94%', 
      marginLeft : '3%', 
      borderLeftWidth : 0.4, 
      borderTopWidth : 0.4, 
      borderRightWidth : 0.4, 
      borderColor : 'rgba(0,0,0,0.3)',
      borderRadius : 5},
    optionButton : {height : 30},
    optionButtonIcon : {color : 'rgba(0,0,0,0.8)', alignSelf :'flex-start', fontSize : 20, paddingTop : 3},
    listView : {flexDirection : 'row'},
    listItemStyle : {
      justifyContent: 'flex-start', 
   //  borderTopWidth : 0.5, 
   //  borderColor : '#eeeeee',
     height : 40,
     width :'92%',
     marginLeft : '4%',
    },
    listItemIconContainer : {
      width : 18, 
      height : 18, 
       borderRadius : 9,
       justifyContent : 'center',
       alignItems : 'center'
      },
    listItemIcon : {
      fontSize : 13, 
      color : '#ffffff'
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