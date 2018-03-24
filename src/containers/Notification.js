import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform}  from 'react-native';
import { HeaderTab } from '../components/common';
import { Icon, Thumbnail, Left, Right, List, ListItem, Body } from 'native-base';



class Notification extends Component {
    render(){
        return(
            <HeaderTab 
            goBackPressed = {()=>this.props.navigation.goBack()}
            menuPressed = {()=>this.props.navigation.navigate('DrawerOpen')}
            title='Notifications'
            >
                <List style={{flex :1}}>
                    <ListItem button onPress={()=>console.log(123)} avatar style={[styles.listItemStyle, styles.unRead]}>
                        <Left>
                            <Thumbnail small source={require('../images/profile.jpg')} />
                        </Left>
                        <Body style={styles.bodyStyle}>
                            <View style={{flexDirection : 'row'}}>
                                <Text style={styles.name}>Gguon Lykhim</Text>
                                <Text style={styles.description}> just opened a new class</Text>
                            </View>
                            <View style={{flexDirection : 'row'}}>
                                <Icon name="ios-clock-outline"
                                style={[styles.iconSmall,{ marginTop : Platform.OS === 'android' ? 2 : 0 }]} 
                                /> 
                                <Text note style={styles.time}>3 minutes ago</Text>
                            </View>
                        </Body>
                    </ListItem>
                    <ListItem avatar button onPress={()=>console.log(123)} style={[styles.listItemStyle]}>
                        <Left>
                            <Thumbnail small source={require('../images/profile.jpg')} />
                        </Left>
                        <Body style={styles.bodyStyle}>
                            <View style={{flexDirection : 'row'}}>
                                <Text style={styles.name}>Gguon Lykhim</Text>
                                <Text style={styles.description}> accepted your follow request</Text>
                            </View>
                            <View style={{flexDirection : 'row'}}>
                                <Icon name="ios-clock-outline"
                                style={[styles.iconSmall,{ marginTop : Platform.OS === 'android' ? 2 : 0 }]} 
                                /> 
                                <Text note style={styles.time}>3 minutes ago</Text>
                            </View>
                        </Body>
                    </ListItem>
                    <ListItem avatar onPress={()=>console.log(123)} style={[styles.listItemStyle]}>
                        <Left>
                            <Thumbnail small source={require('../images/profile.jpg')} />
                        </Left>
                        <Body style={styles.bodyStyle}>
                            <View style={{flexDirection : 'row'}}>
                                <Text style={styles.name}>Gguon Lykhim</Text>
                                <Text style={styles.description}> just created a new package</Text>
                            </View>
                            <View style={{flexDirection : 'row'}}>
                                <Icon name="ios-clock-outline"
                                style={[styles.iconSmall,{ marginTop : Platform.OS === 'android' ? 2 : 0 }]} 
                                /> 
                                <Text note style={styles.time}>3 minutes ago</Text>
                            </View>
                        </Body>
                    </ListItem>
                    <ListItem avatar onPress={()=>console.log(123)} style={[styles.listItemStyle]}>
                        <Left>
                            <Thumbnail small source={require('../images/profile.jpg')} />
                        </Left>
                        <Body style={styles.bodyStyle}>
                            <View style={{flexDirection : 'row'}}>
                                <Text style={styles.name}>Gguon Lykhim</Text>
                                <Text style={styles.description}> invited you to join his / her class</Text>
                            </View>
                            <View style={{flexDirection : 'row'}}>
                                <Icon name="ios-clock-outline"
                                style={[styles.iconSmall,{ marginTop : Platform.OS === 'android' ? 2 : 0 }]} 
                                /> 
                                <Text note style={styles.time}>3 minutes ago</Text>
                            </View>
                        </Body>
                    </ListItem>
                </List>
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
