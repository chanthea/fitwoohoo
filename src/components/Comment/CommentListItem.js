import React, { Component } from 'react';
import { ListItem, Left, Body, Right, Thumbnail, Text, Icon, ActionSheet, Toast } from 'native-base';
import { View, StyleSheet, Platform, Linking, Alert } from 'react-native';
import Global from '../../globals/Globals';

import ParsedText from 'react-native-parsed-text';
import { Constants, WebBrowser } from 'expo';
import TimeAgo from 'react-native-timeago';
import axios from '../../config/axios/axiosWithToken';

let BUTTONS = [
  { text: "Edit comment", icon: "ios-construct-outline", type : "edit",  iconColor: "#3498db" },
  { text: "Remove comment", icon: "ios-backspace-outline", type : "delete",iconColor: "#e74c3c" },
];
var CANCEL_INDEX = 4;
export default class CommentListItem extends React.PureComponent {
  constructor(){
    super();
  }

  _handleUrlPress = (url) => {
   
   
    if (!url.match(/^[a-zA-Z]+:\/\//)){
      url = 'https://' + url;
    }
   // console.log(url);

    Linking.canOpenURL(url).then(supported => {
      
      if (!supported) {
      //  console.log('Can\'t handle url: ' + url);
      } else {
        this._handleOpenWithLinking(url);
      }
    }).catch((err,url) => {
      this._handleOpenWithWebBrowser(url);
      console.warn('An error occurred', err);
    });
  }

  _handleOpenWithLinking = (url) => {
    Linking.openURL(url);
  }
  
  _handleOpenWithWebBrowser = (url) => {
    WebBrowser.openBrowserAsync(url);
  }

  _handlePhonePress = (phone) =>{
  //  console.log(phone)
  }

  _optionComment = (item) => {
    ActionSheet.show(
      {
        options: BUTTONS,
        title: "What\'s you wanna do ?"
      },
      buttonIndex => {
        if(buttonIndex !== undefined){
          if(BUTTONS[buttonIndex].type === 'delete'){
            Alert.alert(
              'Are you sure ? ',
              'You want to remove this comment ?',
              [
                {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                {text: 'Delete', onPress: () =>  this._deleteComment(item.id)},
              ],
              { cancelable: false }
            )
          }else if(BUTTONS[buttonIndex].type === 'edit'){
            this.props.customNavigate('EditComment',{editcomment : this._editComment, item : item});
          }
        }
        
      }
    )
  };

  _editComment = (comment_id,comment) => {
      //console.log(comment_id, comment);
      axios.put('/comment/'+comment_id, {comment : comment})
        .then(res => {
          this.props.editItem(comment_id, comment);
          Toast.show({
            text : 'Comment edited',
           });
        }).catch(error => {
          Toast.show({
            text : 'Server not responding',
            type : 'danger'
          });
        });
  }

  _deleteComment = (comment_id) => {
    axios.delete('/comment/'+comment_id)
      .then(res => {
        this.props.removeItem(comment_id);
          Toast.show({
            text : 'Comment deleted',
           });
      }).catch(error => {
        Toast.show({
          text : 'Server not responding',
          type : 'danger'
         });
      });
  }

  


  render() {
    const {item} = this.props;
    return (
        <ListItem
         onLongPress= {() => item.isOwner && this._optionComment(item)}
        
        avatar style={{flexDirection : 'column', marginTop : 10}}>
          <View style={styles.containerView}>
            <View style={{width : 50}}>
            <Thumbnail style={{borderRadius : 3}} square small source={{uri : Global.PHOTO.PROFILE+item.user.photo}}/>
            </View>
            
            <View style={{flexDirection : 'column', justifyContent : 'flex-start'}}>
              <Text style={{ fontSize: 16}}>{item.user.name + ' ' + item.user.lastname}</Text>
              <View style={{flexDirection : 'row'}}>
                  <Icon name="ios-clock-outline"
                  style={[styles.iconSmall,{ marginTop : Platform.OS === 'android' ? 2 : 0 }]} 
                  /> 
                  <Text style={styles.time}> <TimeAgo time={item.created_atISO} /></Text>
                </View>
            </View>
           
          </View>
          <View  style={styles.containerView}>
            <View style={{width : 50}}/>
            <ParsedText
          style={styles.commentContent}
          parse={
            [
              {pattern: /[-a-zA-Z0-9:%._\+~#=]{2,256}\.[a-zA-Z]{2,6}\b/, 
              style: styles.url, onPress: this._handleUrlPress},
              {type: 'phone',style: styles.phone, onPress: this._handlePhonePress},
          
            ]
          }
          childrenProps={{allowFontScaling: false}}
          >
          {item.comment}
          </ParsedText>
          </View>
        </ListItem>
    );
  }
}

const styles = StyleSheet.create({
  url : {
    fontWeight : 'bold',
    color : '#2980b9'
  },
  containerView : {
    width: '100%', 
    flexDirection : 'row',
    justifyContent : 'flex-start'
  },
  commentContent : {
    flex : 1,
    fontSize : 15, 
    color : 'rgba(0,0,0,0.6)', 
    paddingTop : 5,
    paddingBottom : 10,
    paddingRight :10,
    borderBottomWidth : 0.3,
    borderColor : 'rgba(0,0,0,0.2)',
    lineHeight : 21
  },
  iconSmall : {
    fontSize : 13, 
    color : 'rgba(0,0,0,0.6)', 
    paddingRight : 2, 
   
  },
  time : {
    color : 'rgba(0,0,0,0.6)', 
    fontSize : 13
},
})