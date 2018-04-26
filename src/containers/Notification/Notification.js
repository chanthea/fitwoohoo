import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform, ActivityIndicator}  from 'react-native';
import { HeaderTab } from '../../components/common';
import { Icon, Thumbnail, Left, Right, List, ListItem, Body } from 'native-base';
import {Loading } from '../../components/common';
import {OptimizedFlatList} from 'react-native-optimized-flatlist'
import axios from '../../config/axios/axiosWithToken';
import NotificationList from './NotificationList';

class Notification extends Component {
    static navigationOptions = {
        tabBarVisible : false
    }
    constructor(props){
        super(props);
        this.state = {
            offset : 0,
            limit : 15,
            loading : false,
            refreshing: false,
            data : [],
            firstLoad : true,
            noNotification : false,
            ableLoadMore : false,
        }
    }

    componentDidMount(){
        this._getNotificaitonList();
        
    }

    _getNotificaitonList = () => {
        this.setState({ loading: true });
        axios.get('/notifications',{
            params:{
                offset : this.state.offset,
                limit : this.state.limit
            }
        })
        .then(res=> {
         
            if(this.state.firstLoad === true){
                this.setState({
                    firstLoad: false
                });
            }
            if(res.data.length === 0){
                this.setState({
                    loading: false,
                    refreshing: false,
                    firstLoad: false,
                    ableLoadMore : false
                });
            }else{
                this.setState({
                    data: this.state.offset === 0 ? res.data : [...this.state.data, ...res.data],
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
        })
    }

    _handleLoadMore = () =>{
        if(this.state.ableLoadMore === true && this.state.loading === false){
            this.setState({
                offset : this.state.offset + this.state.limit,
            }, () => {
                this._getNotificaitonList();
            });
        }   
    }

    _handleRefresh = ()=>{
        this.setState({
            offset : 0,
            refreshing : true,
        }, ()=>{
            this._getNotificaitonList();
        });
    }

    _renderNoNotification = () => {
        <View style={{flex : 1, backgroundColor : 'white', justifyContent :'center', alignItems : 'center'}}>
        <Icon name="ios-sad-outline" style={{fontSize : 50, color : 'rgba(0,0,0,0.6)'}}/>
        <Text style={{textAlign : 'center', color : 'rgba(0,0,0,0.7)'}}>There is no post available</Text>
        </View>
      }

      _renderFooter = () => {
        if (!this.state.loading) return null;
        return (
          <View style={{paddingVertical: 10,}}>
            <ActivityIndicator  size="large" />
          </View>
        );
      };

      _renderItem = ({item}) => (
          <NotificationList
          item = {items}
          />
      );
     
    render(){
     //   console.log(this.state)
        return(
            <HeaderTab 
            goBackPressed = {()=>this.props.navigation.goBack()}
            menuPressed = {()=>this.props.navigation.navigate('DrawerOpen')}
            title='Notifications'
            >
                {this.state.firstLoad ?
                <Loading /> :
                this.state.noNotification ?
                this._renderNoNotification()
                 :
                    <List style={{flex :1}}>   
                        <OptimizedFlatList 
                            style={[styles.container]}
                            data={this.state.data}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => item.id}
                            ListFooterComponent={this._renderFooter}
                            refreshing={this.state.refreshing}
                            onRefresh={this._handleRefresh}
                            onEndReached={this._handleLoadMore}
                            onEndReachedThreshold={3}
                            />
                    </List>     
                   }
                
            </HeaderTab>
        );
    }
}

const styles = StyleSheet.create({
    bodyStyle : {borderColor : 'transparent'},
    unRead : { backgroundColor : 'rgba(0,0,0,0.1)'},
    listItemStyle : {
        width : '100%', 
        marginLeft :0,
        borderBottomWidth : 0.3,
        borderColor : '#eeeeee',
        paddingLeft : 10
    },
    iconSmall : {
        fontSize : 11, 
        color : 'rgba(0,0,0,0.6)', 
        paddingRight : 2, 
       
    },
    description : {
        fontSize : 14,
        color : 'rgba(0,0,0,0.7)'
    },
    name : {
        fontSize : 14,
        fontWeight : 'bold'
    },
    time : {
        fontSize : 10,
        color : 'rgba(0,0,0,0.6)'
    }
  });
export  { Notification };
