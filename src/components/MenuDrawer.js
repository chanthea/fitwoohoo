import React, { Component } from 'react';
import { Content, List, ListItem, Text, Left, Right, Body, Switch, Icon, Separator} from 'native-base';
import {StyleSheet,TouchableOpacity, View, AsyncStorage} from 'react-native';
import axios from '../config/axios/axiosWithToken';
import { withNavigation } from 'react-navigation';


const  items = [
    {background : '#2ecc71', icon : 'user-plus', title : 'Follow Requests', type : 'FontAwesome'},
    {background : '#3498db', icon : 'bullhorn', title : 'Challenge Requests', type : 'FontAwesome'},
    {background : '#e67e22', icon : 'md-notifications', title : 'Notifications', type :'Ionicons'},
    {background : '#e84393', icon : 'ios-chatbubbles', title : 'Message', type : 'Ionicons'},
];

const settings = [
    {background : '#0a3d62', icon : 'ios-settings', title : 'Profile Setting', type : 'Ionicons'},
    {background : '#60a3bc', icon : 'credit-card', title : 'Card Setting', type : 'FontAwesome'},
];

const connects = [
    {background : '#38ada9', icon : 'ios-settings', title : 'Fitbit Connect', type : 'Ionicons'},
    
];

const more = [
    {background : '#7f8fa6', icon : 'exclamation-circle', title : 'About Us', type : 'FontAwesome'},
    {background : '#7f8fa6', icon : 'comment', title : 'Help', type : 'FontAwesome'},
    {background : '#7f8fa6', icon : 'lock', title : 'Policy Privacy', type : 'FontAwesome'},
    {background : '#7f8fa6', icon : 'book', title : 'Terms and Conditions', type : 'FontAwesome'},
    {background : '#7f8fa6', icon : 'ios-power', title : 'Sign out', type : 'Ionicons'},
];
 

class MenuDrawer extends Component {

    componentDidMount(){
        axios.get('/auth/getuser')
        .then(res => {
            console.log(res.data);
        }).catch(err => {
           // console.log(err.response.data);
        });
    }

   _onLogout = () => {
       console.log(123);
    //this.props.navigation.navigate('AuthLoading');
     axios.get('/auth/logout').then(res => {
        console.log(res.data);
         AsyncStorage.removeItem('userToken');
        this.props.navigation.navigate('AuthLoading')
     }).catch(err => {
         console.log(err);
     })
  
   }
   _getMenuList(objects){
   let menu =  objects.map((item,index)=>{
        return  <TouchableOpacity key={index}>
            <ListItem onPress={()=>this._onLogout()} button icon style={{marginTop:3, marginBottom : 3}}>
                <View style={[styles.iconCircle,{backgroundColor : item.background}]}>
                    <Icon type={item.type} style={styles.listIcon} name={item.icon} />
                </View>   
                <Body style={styles.listItemBody}>
                    <Text style={styles.bodyText}>{item.title}</Text>
                </Body>
            </ListItem>
        </TouchableOpacity>;
     })
     return menu;
   }

  render() {

    return (
        <Content style={{marginBottom : 20}}>
            <List>
                <ListItem style={styles.itemDivider} itemDivider >
                <Text style={styles.itemDividerText}>Additional</Text>
                </ListItem>
                {this._getMenuList(items)}    
            </List>
            <List>
                <ListItem style={styles.itemDivider} itemDivider >
                <Text style={styles.itemDividerText}>Connect</Text>
                </ListItem>
                {this._getMenuList(connects)}    
            </List>
            <List>
                <ListItem style={styles.itemDivider} itemDivider >
                <Text style={styles.itemDividerText}>Setting</Text>
                </ListItem>
                {this._getMenuList(settings)}    
            </List>
            <List>
                <ListItem style={styles.itemDivider} itemDivider >
                <Text style={styles.itemDividerText}>More</Text>
                </ListItem>
                {this._getMenuList(more)}  
            </List>
        </Content>
    );
  }
}

const styles = StyleSheet.create({
    itemDividerText : {
        color : 'rgba(0,0,0,0.5)',
        fontSize : 10
    },
    itemDivider : {
        backgroundColor : '#ffffff'
    },
    iconCircle : {
        alignItems:'center',
        justifyContent:'center',
        width:40,
        height:40,
        borderRadius:40/2,
    },
    listItemBody :{paddingLeft : 15,  borderBottomWidth : 0},
    bodyText :{color : 'rgba(0,0,0,0.6)', fontSize : 15},
    listIcon : {color : '#ffffff', fontSize : 18}
});
export default withNavigation(MenuDrawer);