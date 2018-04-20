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
    Platform,
    ActivityIndicator
    
  } from 'react-native';
import { StatusBar } from '../common';
import Global from '../../globals/Globals';
import { _paddingAndroid } from '../../helpers';
import CommentListItem from './CommentListItem';
import CommentInput from './CommentInput';
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import { connect } from 'react-redux';
import axios from '../../config/axios/axiosWithToken';

let screen = Dimensions.get('window');

class Comment extends Component {

  static navigationOptions = {
    mode : 'modal',
    header : null,
    tabBarVisible : false,
    drawerLockMode: 'locked-closed',
    swipeEnabled : false
}

    constructor(props) {
      super(props);
        this.post = {};
        this.state = {
          data : [],
          isDisabled: false,
          textValue: '',
          marginBottom : 0,
          height : 40,
          loading : false,
          firstLoad : true,
          refreshing: false,
          item : {},
          limit : 7,
          offset : 0,
          noComment : false,
          ableLoadMore : false,
          
        };
      }
  componentDidMount(){
    const { params } = this.props.navigation.state;
    if(params.post.post_type === 'share'){
      this.post = params.post.post;
    }else{
      this.post = params.post;
    }
    if(this.post.comments.length === 0){
      this.setState({noComment : true, firstLoad : false});
    }else{
      this._getComments(this.post.id);
    }
  }

  _handleRefresh = ()=>{
    this.setState({
        offset : 0,
        refreshing : true,
    }, ()=>{
        this._getComments(this.post.id);
    });
  }

  _handleLoadMore = () =>{
    if(this.state.ableLoadMore === true && this.state.loading === false){
      this.setState({
         offset : this.state.offset + this.state.limit,
      }, () => {
        this._getComments(this.post.id);
      });
    }
   
}

  _getComments =  (post_id) => {
    const { offset } = this.state;
    this.setState({loading : true})
    axios.get('/comment/post/'+post_id, {
      params : {
        limit : this.state.limit,
        offset : this.state.offset
      }
    }).then(res=>{  
      if(res.data.length === 0){
        this.setState({
          loading: false,
          refreshing: false,
          firstLoad: false,
          ableLoadMore : false
        });
      }else{
        this.setState({
          data: offset === 0 ? res.data : [...this.state.data, ...res.data],
          loading: false,
          refreshing: false,
          firstLoad: false,
          ableLoadMore : res.data.length ===  this.state.limit ? true : false
        });
      }
    }).catch(error => {
      this.setState({ 
        loading: false,
         refreshing : false,  
         firstLoad : false,
         ableLoadMore : false
         });
    });
  }
  _renderList = ({item})=>(
    <CommentListItem 
    item={item}
    removeItem={this._onRemoveItem}
    customNavigate = {(routeName,Param={})=>this.props.navigation.navigate(routeName,Param)}
    />
    
  );

  _firstLoad = () => (
    <View style={{flexGrow: 1, backgroundColor : 'white', justifyContent :'center'}}>
    <ActivityIndicator size='large'/>
    </View>
  );

  _noComment = () => (
    <View style={{flex : 1, backgroundColor : 'white', justifyContent :'center', alignItems : 'center'}}>
      <Icon name="ios-sad-outline" style={{fontSize : 50, color : 'rgba(0,0,0,0.6)'}}/>
      <Text style={{textAlign : 'center', color : 'rgba(0,0,0,0.7)'}}>There is no comment available</Text>
    </View>
  );

  _renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View style={{paddingVertical: 10,}}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  _onRemoveItem = (id) =>{

    const {data} = this.state;
    let newData = data.filter((val, i) => {
      return val.id !== id
    });
    this.setState({data: newData})
  }

  

  
  
  render() {
    const {user} = this.props.user;
    const { params } = this.props.navigation.state;
    console.log(this.state.offset, this.state.ableLoadMore);
    return (
    
      <View style={{flex :1}}>
            <StatusBar />
                  <Header
                  style={{
                    backgroundColor : '#ffffff'
                    }}>
                    <Left>
                        <Button  transparent>
                        <Image style={styles.profile} source={{uri :Global.PHOTO.PROFILE+user.photo}}/>
                        </Button>
                    </Left> 
                    
                    <Body style={{justifyContent : 'center', alignContent : 'center'}}>
                        <Text style={styles.name}>{user.name + ' ' + user.lastname}</Text>
                    </Body>
                    <Right>
                        <Button onPress={() => this.props.navigation.goBack()} transparent>
                        <Icon name='md-close' style={styles.icon} />
                        </Button>
                    </Right>
                    </Header>
                    {this.state.firstLoad === true ?
                    this._firstLoad() :
                      (<KeyboardAvoidingView style={{flex: 1}}  behavior='padding'>
                        {  this.state.noComment === true ?
                            this._noComment() : 
                            <OptimizedFlatList 
                               style={{backgroundColor : 'white'}}
                                data={this.state.data}
                              // extraData={this.state}
                                renderItem={this._renderList}
                                keyExtractor={(item, index) => item.id}
                                ListFooterComponent={this._renderFooter}
                              // ListFooterComponent={}
                              // maxToRenderPerBatch={1}
                                refreshing={this.state.refreshing}
                                onRefresh={this._handleRefresh}
                                onEndReached={this._handleLoadMore}
                               onEndReachedThreshold={0}
                                // onScrollEndDrag={this._hanldeScrollEnd}
                                />
                              }
                          <CommentInput/>
                      </KeyboardAvoidingView>)        
                  }
      </View>
    
    );
  }
}

const mapStateToProps = state => {
  return state.user;
}
export default connect(mapStateToProps)(Comment);


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
