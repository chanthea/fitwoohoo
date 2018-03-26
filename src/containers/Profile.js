import React, {Component} from 'react';
import {
    Text,
     View, 
     StyleSheet, 
     Image, 
     ImageBackground, 
     Dimensions,
      ScrollView ,
      Animated,
      TouchableOpacity
      
}  from 'react-native';

import { _paddingAndroid } from '../helpers';
import Global from '../globals/Globals';
import { Header, Left, Body, Right, Button, Icon, Title} from 'native-base';
import Fab from '../components/Fab';
import { NavigationActions } from 'react-navigation';



class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          active: false
        };
    }

    _onPressPost = (navigateAction)=> {
        this.setState({
            active : false
        });
        this.props.navigation.navigate('PostPage',{name :this.props.navigation.state.key});
        //this.props.navigation.dispatch(navigateAction);
    };

    _renderLabel = ()=>{
        return (
        <View style = {styles.tabBar}>
          <View style={styles.tabRow}>
            <TouchableOpacity style={styles.labelContainer}>
            <Animated.Text style={styles.tabLabelNumber}>
              150
            </Animated.Text>
            <Animated.Text style={styles.tabLabelText}>
              Followers
            </Animated.Text>
            </TouchableOpacity>
            
             <TouchableOpacity style={styles.labelContainer}>
            <Animated.Text style={styles.tabLabelNumber}>
              200 
            </Animated.Text>
            <Animated.Text style={styles.tabLabelText}>
            Following
            </Animated.Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.optionContainer}>
                <Icon name="align-right" style={{textAlign : 'center', color: 'rgba(0,0,0,0.5)'}} type='Foundation' />
            </TouchableOpacity> 
          </View>
        </View>
        )
      }

    _renderContactHeader = () => {
        return (
          <View style={styles.headerContainer}>
            <View style={styles.coverContainer}>
              <ImageBackground
               source={require('../images/cover.jpeg')}
                style={styles.coverImage}
              >
                <View style={styles.coverTitleContainer}>
                  <Text style={styles.coverTitle} />
                </View>
                <View style={styles.coverMetaContainer}>
                  <Text style={styles.coverName}>Chanthea Tai</Text>
                  <Text style={styles.coverBio}>Trainers</Text>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.profileImageContainer}>
              <Image
               source={require('../images/profile.jpg')}
                style={styles.profileImage}
              />
            </View>
          </View>
        )
      }


    render(){
        
        
        const navigateAction = NavigationActions.navigate({
            routeName: 'PostPage',
            action: NavigationActions.navigate({ routeName: 'ProfileIndex' }),
       
           });
   
           const resetAction = NavigationActions.reset({
               index: 1,
               actions: [
                 NavigationActions.navigate({ routeName: 'Profile' }),
                 NavigationActions.navigate({ routeName: 'Settings' }),
               ],
             });
   
          
           const previousRoute = this.props.navigation;
           const backAction = NavigationActions.back({
               key: previousRoute,
             });
     
        
        return (
        <View style={{flex : 1, flexDirection : 'column', backgroundColor  : '#ffffff'}}>

            {this._renderContactHeader()}
            {this._renderLabel()}
            <View style={{flexGrow :1,  backgroundColor : 'transparent'}}>
              <Fab 
              postPressed = {()=>this._onPressPost(navigateAction)}
              active = {this.state.active}
              longPressed = {() => this.setState({ active: !this.state.active })}
              />       
            </View>
        </View>
          );
    }
}

const styles = StyleSheet.create({

        coverBio: {
          color: '#FFF',
          fontSize: 15,
          fontWeight: '600',
        },
        coverContainer: {
          marginBottom: 55,
          position: 'relative',
        },
        coverImage: {
          height: Dimensions.get('window').width * (2 / 4),
          width: Dimensions.get('window').width,
        },
        coverMetaContainer: {
          backgroundColor: 'transparent',
          paddingBottom: 10,
          paddingLeft: 120,
        },
        coverName: {
          color: '#FFF',
          fontSize: 28,
          fontWeight: 'bold',
          paddingBottom: 2,
        },
        coverTitle: {
          color: '#FFF',
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
        },
        coverTitleContainer: {
          backgroundColor: 'transparent',
          flex: 1,
          justifyContent: 'space-between',
          paddingTop: 45,
        },
        headerContainer: {
          alignItems: 'center',
          backgroundColor: '#FFF',
        },
        indicatorTab: {
          backgroundColor: 'transparent',
        },
        mansonryContainer: {
          alignItems: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginLeft: 0,
          marginRight: 0,
        },
        profileImage: {
          borderColor: '#FFF',
          borderRadius: 55,
          borderWidth: 3,
          height: 95,
          width: 95,
        },
        profileImageContainer: {
          bottom: 0,
          left: 10,
          position: 'absolute',
        },
        sceneContainer: {
          marginTop: 10,
        },
        scroll: {
          backgroundColor: '#FFF',
        },
        tabBar: {
          backgroundColor: 'transparent',
          marginBottom: 20,
          marginLeft: 130,
          marginTop: -53,
          position: 'relative',
          zIndex: 10,

        },
        tabContainer: {
          flex: 1,
          marginBottom: 12,
          marginTop: -55,
          position: 'relative',
          zIndex: 10,
        },
        tabRow: {
          flexWrap: 'wrap',
          flexDirection: 'row',
        },
        tabLabelNumber: {
            color: 'rgba(0,0,0,0.5)',
          fontSize: 20,
          textAlign: 'center',
          marginBottom: 2,
        },
        tabLabelText: {
          color: 'rgba(0,0,0,0.5)',
          fontSize: 13,
          textAlign: 'center',
        },
        labelContainer : {
            flexDirection : 'column', 
            flex: 2, 
            justifyContent : 'center'
        },
        optionContainer : {
            flexDirection : 'column', 
            flex: 1, 
            justifyContent : 'center'
        }
});
export  { Profile };
