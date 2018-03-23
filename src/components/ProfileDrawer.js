import React from 'react';
import {Header,Icon, Left, Right, Body, Text, Thumbnail} from 'native-base';
import {StyleSheet, Image, TouchableOpacity, View, Platform} from 'react-native';

const profileDrawer = ()=> (
    <View style={{ backgroundColor: 'transparent' }}>
    <Image
    
        style={styles.backgroundImage}
        source={require('../images/cover.jpeg')}
        />
            <TouchableOpacity>
            <Header style={styles.drawerHeader}>
                <Left>
                <Thumbnail square source={require('../images/profile.jpg')}/>
                </Left>
                <Body>
                    <Text style={styles.name}>Emmanuel Niyenzima</Text>
                    <Text style={styles.viewProfile}>View your profile </Text>
                </Body>
            </Header>
        </TouchableOpacity>
    </View>

);



const styles = StyleSheet.create({
    backgroundImage: {
        height: 150,
        width: "100%",
        alignSelf: "stretch",
        position: "absolute"
    },
    drawerHeader: {
      height: 150,
      backgroundColor:'transparent',
      paddingTop : 50,
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