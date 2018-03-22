import React from 'react';
import {Header,Icon, Left, Right, Body, Text} from 'native-base';
import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';

const profileDrawer = ()=> (
    <View style={{ backgroundColor: 'green' }}>
        <Image
        style={styles.backgroundImage}
        source={require('../images/cover.jpeg')}
        />
            <TouchableOpacity>
            <Header style={styles.drawerHeader}>
                <Left>
                    <Image
                        style={[styles.drawerImage]}
                        source={require('../images/profile.jpg')} />
                </Left>
                <Body style={{paddingLeft : 40}}>
                    <Text style={styles.name}>Chanthea Tai</Text>
                    <Text style={styles.viewProfile}>View your profile</Text>
                </Body>
                <Right>
                    <Icon type="FontAwesome" style={{color : 'white'}} name='angle-right'/>
                </Right>
            </Header>
        </TouchableOpacity>
    </View>

);



const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
        position : 'absolute'
      },
    drawerHeader: {
      height: 150,
      backgroundColor:'transparent',
      paddingTop : 50
    },
    drawerImage: {
      height: 70,
      width: 70,
      borderRadius : 2
    },
    name : {
        shadowColor: 'black',
        shadowOffset :{width : 1, height : -1},
        color : '#ffffff',
        fontSize: 14
    },
    viewProfile : {
        color : 'rgba(255,255,255,0.6)', 
        fontSize : 10,
        shadowColor: 'black',
        shadowOffset :{width : 1, height : -1},
    }
  
  })

export default profileDrawer;