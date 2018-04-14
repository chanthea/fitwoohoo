import React, { Component } from 'react';
import Modal from 'react-native-modalbox';
import { Text as NBText, Header, Left, Body, Right, Button, Icon, Title, Item, Input, List } from 'native-base';
import {
    Text,
    StyleSheet,
    ScrollView,
    View,
    Dimensions,
    TextInput,
    Image,
    KeyboardAvoidingView,
    Platform
    
  } from 'react-native';
import { StatusBar } from '../common';
import Global from '../../globals/Globals';
import { _paddingAndroid } from '../../helpers';
import CommentListItem from './CommentListItem';
import CommentInput from './CommentInput';
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import { connect } from 'react-redux';

let screen = Dimensions.get('window');

class CommentList extends React.PureComponent {
    constructor() {
        super();
        this.state = {
          isDisabled: false,
          swipeToClose: true,
          textValue: '',
          marginBottom : 0,
          height : 40
        };
       
      }
  
  componentWillReceiveProps(nextProps){
 //   console.log(nextProps);
  } 

  onClose() {
    console.log('Modal just closed');
  }

  onOpen() {
   
    console.log('Modal just openned');
    //this.setState({isOpen: true});
  }

  onClosingState(state) {
    console.log('the open/close of the swipeToClose just changed');
  }

  renderList() {
    let list = [];
    for (let i=0;i<50;i++) {
      list.push(<Text style={styles.text} key={i}>Elem {i}</Text>);
    }
    return list;
  }
  _renderList = ({item})=>(
    <CommentListItem/>
    
  );
  render() {
    const {user} = this.props.user;
    let post = {};
    const  item  = this.props.item;
    post =  item !== null &&  item.post_type ==='share' ? item.post : item; 
   
    console.log(this.state.height)
    return (
      item !== null &&
     
        <Modal
          style={[styles.modal, styles.modal1]}
          ref={ref => this.props.setRef(ref)}
          swipeToClose={this.state.swipeToClose}
          onClosed={this.onClose}
          onOpened={this.onOpen}
          onClosingState={this.onClosingState}
          backButtonClose={true}
          swipeThreshold={0}
          swipeArea={150}
          position={"bottom"}
     >
             {/* <StatusBar />  */}
             <KeyboardAvoidingView  behavior='padding'>
                <View style={{flex :1}}>
                <Header
                    style={{
                      backgroundColor : '#ffffff'
                      }}>
                       <Left>
                            <Button onPress={this.props.closeModal} transparent>
                            <Image style={styles.profile} source={{uri :Global.PHOTO.PROFILE+user.photo}}/>
                            </Button>
                        </Left> 
                       
                        <Body style={{justifyContent : 'center', alignContent : 'center'}}>
                            <Text style={styles.name}>{user.name + ' ' + user.lastname}</Text>
                        </Body>
                        <Right>
                            <Button onPress={this.props.closeModal} transparent>
                            <Icon name='md-close' style={styles.icon} />
                            </Button>
                        </Right>
                        </Header>
                  
                  <List style={styles.container}>
                  <OptimizedFlatList 
                        data={[{a: 2},{a: 2},{a: 2},{a: 2},{a: 2},{a: 2},{a: 2},{a: 2},{a: 2},{a: 2},]}
                      // extraData={this.state}
                        renderItem={this._renderList}
                        keyExtractor={(item, index) => index}
                        // ListHeaderComponent={}
                      // ListFooterComponent={}
                      // maxToRenderPerBatch={1}
                        // refreshing={this.state.refreshing}
                        // onRefresh={this._handleRefresh}
                        // onEndReached={this._handleLoadMore}
                        // onEndReachedThreshold={1}
                        // onScrollEndDrag={this._hanldeScrollEnd}
                        />
                    
                  </List>
                </View>
                <View style={{width : screen.width}}>
                  <CommentInput/>
                </View>
                </KeyboardAvoidingView>
        </Modal>
    );
  }
}

const mapStateToProps = state => {
  return state.user;
}
export default connect(mapStateToProps)(CommentList);


let { height, width } = Dimensions.get("window");
const IsIOS = Platform.OS === 'ios';
const styles = StyleSheet.create({
  
  icon : {
    color : 'rgba(0,0,0,0.7)',
    paddingRight : 10
  },
  name  : {
    color : 'rgba(0,0,0,0.7)',
    textAlign : 'center',
    fontSize : 16
  },
  role : {
    color : 'rgba(0,0,0,0.7)',
    textAlign : 'center',
    fontSize: 14
  },
  profile : {
    height : 30,
    width : 30,
    borderRadius: 3
  },
    container : { 
      width: width,
      height : height - 130
  },
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor : 'white',
      height : height -24,
      zIndex : 50
    },
    btnModal: {
      position: "absolute",
      top: 0,
      right: 0,
      width: 50,
      height: 50,
      backgroundColor: "transparent"
    },
    btn: {
        margin: 10,
        backgroundColor: "#3B5998",
        color: "white",
        padding: 10
    },
    text: {
      color: "black",
      fontSize: 22
    }
  
  });
