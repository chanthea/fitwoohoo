import React, {Component} from 'react';
import { SearchTab, Wrapper } from '../../components/common';
import { Content, Container, Header, View, Button, Icon, Text } from 'native-base';
import Global from '../../globals/Globals';
import Fab from '../../components/Fab';
import Post from '../../components/Post/Post';
import {FlatList, StatusBar, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import { Constants } from 'expo';
import axios from '../../config/axios/axiosWithToken';
import FAB from 'react-native-fab';
import _ from 'lodash';


class Newswall extends React.PureComponent {
    static navigationOptions ={
        //tabBarVisible :false
    }
    constructor(props) {
        super(props);
        this.scrollPosition = 0;
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
          selected: null
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
                this.setState({
                    data: offset === 0 ? res.data : [...this.state.data, ...res.data],
                    error: res.error || null,
                    loading: false,
                    refreshing: false,
                  });
                if(this.state.firstLoad === true){
                    this.setState({ firstLoad: false});
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
        return (
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 1,
              borderColor: "#CED0CE"
            }}
          >
            <ActivityIndicator animating size="large" />
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
      _hanldeScroll = (event) => {
        let position = event.nativeEvent.contentOffset.y;
        if(this.scrollPosition > position){
            this.setState({visible : true});
        } else{
            this.setState({visible : false});
        }
       
      }
      _hanldeScrollEnd = (event) =>{
        this.scrollPosition = event.nativeEvent.contentOffset.y;
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
        this.setState({data: newData})
      }

    
      render(){
        //  console.log(this.state.data);
        const renderNoPost = (
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
        const firstLoad =  (
             <View style={{flexGrow: 1, backgroundColor : 'white', justifyContent :'center'}}>
            <ActivityIndicator size='large'/>
            <Text style={{textAlign : 'center'}}>Loading....</Text>
            </View>
        );

        // this.state.data.map((val,i) => {
        //     val.indexId = i;
        // })
        // console.log(this.state.data);

        return(
            
            <Wrapper>
                {/* <View style={styles.statusBar} /> */}
                {this.state.firstLoad ?
                firstLoad :
                this.state.noPost === true ?
                renderNoPost
                 :
                    <View>
                        {this._renderHeader()}
                        <FlatList 
                            style={styles.container}
                            data={this.state.data}
                            //extraData={this.state}
                            renderItem={({ item }) => (
                                <Post 
                                // onPressItem={this._onPressItem}
                                originalPost={item}
                                customNavigate = {(routeName,Param={})=>this.props.navigation.navigate(routeName,Param)}
                                removeItem={this._onRemoveItem}
                                editItem = {this._onEditItem}
                                />
                            )}
                            keyExtractor={(item, index) => item.post_type+'_'+item.id}
                            ListFooterComponent={this.renderFooter}
                            refreshing={this.state.refreshing}
                            onRefresh={this._handleRefresh}
                        //    onEndReached={this._handleLoadMore}
                        //    onEndReachedThreshold={5}
                            onScroll={this._hanldeScroll}
                            scrollEventThrottle={16}
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
                     iconTextComponent={<Icon name="plus" type="FontAwesome"/>} /> }
                  
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
        height: height - 128
     }

  });

export { Newswall };
