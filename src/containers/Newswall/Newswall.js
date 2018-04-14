import React, {Component} from 'react';
import { SearchTab, Wrapper } from '../../components/common';
import { Content, Container, Header, View, Button, Icon, Text } from 'native-base';
import Global from '../../globals/Globals';
import Fab from '../../components/Fab';
import Post from '../../components/Post/Post';
import {FlatList, StatusBar, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import { Constants } from 'expo';
import axios from '../../config/axios/axiosWithToken';
import FAB from 'react-native-fab';
import _ from 'lodash';
import CommentList from '../../components/Comment/CommentList';
import {NavigationActions} from 'react-navigation';


class Newswall extends React.PureComponent {
    constructor(props) {
        super(props);
        this.CommentListRef;
        this.scrollPosition = 200;
        this.state = {
          firstLoad : true,
          active: false,
          loading: false,
          data: [],
          offset: 0,
          limit : 4,
          error: null,
          refreshing: false,
          noPost : false,
          visible : true,
          selected: null,
          isModalOpen : false
        };
    }
    
    _handleRefresh = ()=>{
        this.setState({
            offset : 0,
            refreshing : true,

        }, ()=>{
            this._makeRemoteRequest();
        });
    }

    _handleLoadMore = () =>{
        this.setState({
            offset : this.state.offset + this.state.limit,
        }, () => {
            this._makeRemoteRequest();
        });
    }
    _onPressPost = ()=> {
        this.setState({
            active : false
        });
        this.props.navigation.navigate('PostPage');
    };

    componentDidMount() {
        this._makeRemoteRequest();
    }

    _makeRemoteRequest = async() => {
        const { offset } = this.state;

        this.setState({ loading: true });
       // setTimeout(() =>{
        axios.get('/newswall',{
            params: {
                limit : 4,offset : offset
            }}).then(res => {
              // console.log(res.data);
              if(res.data.length === 0){
                if(this.state.firstLoad === true){
                    this.setState({ firstLoad: false, noPost : true });
                }
                this.setState({
                    loading: false,
                    refreshing: false,
                  });
              }else{
               //   this._openComment(res.data[0]);
                this.setState({
                    data: offset === 0 ? res.data : [...this.state.data, ...res.data],
                    error: res.error || null,
                    loading: false,
                    refreshing: false,
                  });
                if(this.state.firstLoad === true){
                    this.setState({
                        selected : res.data[0],
                        firstLoad: false
                    });
                }
              }  
             
            })
            .catch(error => {
              //  console.log(error.response);
              this.setState({ error, loading: false, refreshing : false });
              if(this.state.firstLoad === true){
                this.setState({ firstLoad: false });
              }
            });
       
      };

      

      _renderHeader = ()=>{
            return(
            <SearchTab  
            hasMargin={true}
            searchPressed ={()=>this.props.navigation.navigate('GeneralSearch')}
            menuPressed={()=>this.props.navigation.navigate('DrawerOpen')}/>
        );
      }
      _renderFooter = () => {
        if (!this.state.loading) return null;
        console.log(this.state.loading);
        return (
          <View
            style={{
              paddingVertical: 10,
              //borderTopWidth: 1,
             // borderColor: "#CED0CE"
            }}
          >
            <ActivityIndicator  size="large" />
          </View>
        );
      };

      _renderNoPost = () => {
        <View style={{flexGrow : 1, backgroundColor :'white' }}>
            <SearchTab  
            hasMargin={false}
            searchPressed ={()=>this.props.navigation.navigate('GeneralSearch')}
            menuPressed={()=>this.props.navigation.navigate('DrawerOpen')}/>
           <View style={{flex : 1, backgroundColor : 'white', justifyContent :'center', alignItems : 'center'}}>
            <Icon name="ios-sad-outline" style={{fontSize : 50, color : 'rgba(0,0,0,0.6)'}}/>
            <Text style={{textAlign : 'center', color : 'rgba(0,0,0,0.7)'}}>There is no post available</Text>
            </View>
        </View>
      }
    //   _hanldeScroll = (event) => {

    //     const scrollOffsetY = event.nativeEvent.contentOffset.y;
    //     const shouldShowTabBar = scrollOffsetY > this.scrollPosition ? false : true;
    //     this.setState({visible : shouldShowTabBar});
    //     this.props.navigation.setParams({ tabBarVisible: shouldShowTabBar });
    //     this.scrollPosition = scrollOffsetY;
       
    //   }
      _hanldeScrollEnd = (event) =>{
        const scrollOffsetY = event.nativeEvent.contentOffset.y;
     
        const shouldShowTabBar = scrollOffsetY > this.scrollPosition ? false : true;
        this.setState({
            visible : shouldShowTabBar
        });
        this.props.navigation.setParams({ tabBarVisible: shouldShowTabBar });
        this.scrollPosition = scrollOffsetY;
      }

      _onRemoveItem = (id) =>{

        const {data} = this.state;
        let newData = data.filter((val, i) => {
          return val.post_type+'_'+val.id !== id
        });
        this.setState({data: newData})
      }

      _onAddItem = () => {

      }

      _onEditItem = (item) =>{
        const {data} = this.state;
        let newData = data.map((val, i) => {
            if(val.post_type === 'share'){
                if(item.isShare){
                    if(val.post_type+'_'+val.id === item.share.id){
                        val = item.share.val
                    }else if('post_'+val.post.id === item.post.id){
                        val.post = item.post.val   
                    }
                }else{
                    if('post_'+val.post.id === item.post.id){
                        val.post = item.post.val
                    }
                }
                return val;
            }else{
                if(val.post_type+'_'+val.id === item.post.id){
                    val = item.post.val
                }
                return val;
            }
        });
        this.setState({...data,  data : newData})
      }
      _hanldeRefComment = (ref)=>{
          this.CommentListRef = ref;
      }
      
      _openComment = (item) => {
        this.props.navigation.setParams({ tabBarVisible: false });
        this.setState({selected : item});
        this.CommentListRef.open();
        
      }

      _closeModal = () => {
        this.CommentListRef.close();
       //this.props.navigation.setParams({ tabBarVisible: true });
        
       
      }

      _renderItem = ({item}) => (
                <Post 
            originalPost={item}
            customNavigate = {(routeName,Param={})=>this.props.navigation.navigate(routeName,Param)}
            removeItem={this._onRemoveItem}
            editItem = {this._onEditItem}
            commentOpen = {()=>this._openComment(item)}
            />
      );

      _renderNoPost = () => (
        <View style={{flexGrow : 1, backgroundColor :'white' }}>
                <SearchTab  
                hasMargin={false}
                searchPressed ={()=>this.props.navigation.navigate('GeneralSearch')}
                menuPressed={()=>this.props.navigation.navigate('DrawerOpen')}/>
               <View style={{flex : 1, backgroundColor : 'white', justifyContent :'center', alignItems : 'center'}}>
                <Icon name="ios-sad-outline" style={{fontSize : 50, color : 'rgba(0,0,0,0.6)'}}/>
                <Text style={{textAlign : 'center', color : 'rgba(0,0,0,0.7)'}}>There is no post available</Text>
                </View>
            </View>
      );

      _firstLoad = () => (
        <View style={{flexGrow: 1, backgroundColor : 'white', justifyContent :'center'}}>
        <ActivityIndicator size='large'/>
        <Text style={{textAlign : 'center'}}>Loading....</Text>
        </View>
      );

      render(){
        return(
        
            <Wrapper>
                {/* <View style={styles.statusBar} /> */}
                {this.state.firstLoad ?
                this._firstLoad() :
                this.state.noPost === true ?
                this._renderNoPost()
                 :
                    <View>
                         {this._renderHeader()} 
                        <OptimizedFlatList 
                            style={[styles.container]}
                            data={this.state.data}
                           // extraData={this.state}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => item.post_type+'_'+item.id}
                            ListFooterComponent={this._renderFooter}
                            maxToRenderPerBatch={1}
                            refreshing={this.state.refreshing}
                            onRefresh={this._handleRefresh}
                            onEndReached={this._handleLoadMore}
                            onEndReachedThreshold={1}
                          // onScroll={this._hanldeScroll}
                          // maxToRenderPerBatch={1}
                        //  scrollEventThrottle={50}
                            onScrollEndDrag={this._hanldeScrollEnd}
                            />
                
                    </View>
                   }
                  {!this.state.firstLoad &&
                     <FAB 
                     buttonColor={ Global.COLOR.MAIN}
                     iconTextColor="#FFFFFF" 
                     onClickAction={this._onPressPost}
                     visible={this.state.visible}
                      iconTextComponent={<Icon name="plus" type="FontAwesome"/>} />}
                  <CommentList 
                    item = {this.state.selected}
                    closeModal = {this._closeModal}
                    setRef = {this._hanldeRefComment}
                  /> 
            </Wrapper>
            
        );
    }
}

let { height } = Dimensions.get("window");
// console.log(height);
const styles = StyleSheet.create({
    statusBar: {
      backgroundColor: Global.COLOR.MAIN,
      height: Constants.statusBarHeight,
    },
    container : { 
        flexGrow: 1, 
        backgroundColor : '#ffffff',
        height : height - 75
     }

  });

export { Newswall };
