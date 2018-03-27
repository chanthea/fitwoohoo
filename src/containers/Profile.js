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
import FullPost from './FullPost';
import { _paddingAndroid } from '../helpers';
import Global from '../globals/Globals';
import { Header, Left, Body, Right, Button, Icon, Title, List, ListItem, Switch, Text as NBText} from 'native-base';
import Fab from '../components/Fab';
import Menu, {
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers,
  } from 'react-native-popup-menu';



// Menu.debug = true;
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          active: false,
          expanded    : false,
          animation   : new Animated.Value(0),
          icon : 'ios-more-outline'
        };
    }

    _toggle(){
        if(this.state.expanded){
            value = 0;
        }else{
            value = 100
        }
        Animated.spring(
            this.state.animation,
            {
                toValue: value,
                velocity: 3,
                tension: 2,
                friction: 8,
            }
        ).start();
        this.setState({
            expanded : !this.state.expanded,
            icon : this.state.expanded ? 'ios-more-outline' : 'ios-more'
        });
    }
    _onPressPost = ()=> {
        this.setState({
            active : false
        });
        this.props.navigation.navigate('PostPage');
    
    };
    _renderLabel = ()=>{
        return (
        <View style = {styles.tabBar}>
          <View style={styles.tabRow}>
            <TouchableOpacity style={styles.labelContainer}>
            <Text style={styles.tabLabelNumber}>
              150
            </Text>
            <Text style={styles.tabLabelText}>
              Followers
            </Text>
            </TouchableOpacity>
            
             <TouchableOpacity style={styles.labelContainer}>
            <Text style={styles.tabLabelNumber}>
              200 
            </Text>
            <Text style={styles.tabLabelText}>
            Following
            </Text>
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
    _renderMenu = () =>{
        const IconOption = ({iconName, text, value}) => (
            <MenuOption customStyles={optionStyles} onSelect={() => console.log(123)} value={value}>
                <Icon style= {styles.popUpMenuIcon} name={iconName} />
                <Text style= {styles.popUpMenuText}>
                {text}
                </Text>
            </MenuOption>
          )

        const {menuContainer, menuButton, menuIcon, menuText} = styles;
        return (
            <View style={menuContainer}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('PostPage')} style={menuButton}  >
                    <Icon style={menuIcon} name='ios-add-circle-outline' />
                    <Text style={menuText}>Post</Text>
                </TouchableOpacity>
                <TouchableOpacity style={menuButton}  >
                    <Icon style={menuIcon} name='ios-book-outline' />
                    <Text style={menuText}>Library</Text>
                </TouchableOpacity>
                <TouchableOpacity style={menuButton}  >
                    <Icon style={menuIcon} name='ios-bicycle-outline' />
                    <Text style={menuText}>Activities</Text>
                </TouchableOpacity>
                <TouchableOpacity style={menuButton}  >
                    <Icon style={menuIcon} name='ios-calendar-outline' />
                    <Text style={menuText}>Schedule</Text>
                </TouchableOpacity>
                <TouchableOpacity style={menuButton}  >

                    <Menu>
                    <MenuTrigger customStyles={triggerStyles}>
                        <Icon style={menuIcon} name='ios-apps-outline' />
                        <Text style={menuText}>More</Text>
                    </MenuTrigger>
                    <MenuOptions customStyles={optionsStyles}>
                        <IconOption
                       
                        value={3} iconName='ios-aperture-outline' text='Tool Generator' />
                        <IconOption value={3} iconName='ios-aperture-outline' text='Tool Generator' />
                    </MenuOptions>
                </Menu>
                
                  
                </TouchableOpacity>
            </View>
        );
    }
    _renderAbout = () =>{
        const {listItemBody,listItemStyle, listItemIcon, listItemText}  = styles;
        return(
                <View style={{flexDirection : 'column', justifyContent :'center'}}>   
                    <Button style={{marginBottom : 0}}  onPress={this._toggle.bind(this)} small block transparent light>
                        <Icon style={{color :'rgba(0,0,0,0.6)'}} name={this.state.icon}/>
                    </Button>  
                    <Animated.View 
                    style={{overflow : 'hidden',marginTop  : -13,height: this.state.animation}} >
                        <List>
                            <ListItem style={listItemStyle} icon >
                                <Left>
                                    <Icon style={listItemIcon} name="ios-quote-outline" />
                                </Left>
                                <Body style={listItemBody}>
                                    <NBText style={listItemText}>Today is really nice </NBText>
                                </Body>
                            </ListItem>
                            <ListItem style={listItemStyle} icon>
                                <Left>
                                    <Icon style={listItemIcon} name="ios-pin-outline" />
                                </Left>
                                <Body style={listItemBody}>
                                    <NBText style={listItemText}>Chbar Ampov II, Phnom Penh, Cambodia</NBText>
                                </Body>
                            </ListItem>
                            <ListItem style={listItemStyle} icon>
                                <Left>
                                    <Icon style={listItemIcon} name="ios-phone-portrait-outline" />
                                </Left>
                                <Body style={listItemBody}>
                                    <NBText style={listItemText}>+855 98 33 97 62</NBText>
                                </Body>
                            </ListItem>
                           
                        </List> 
                </Animated.View>
            </View >
        );
    }


    render(){
     
        return (
            <MenuProvider customStyles={menuProviderStyles}>
                <ScrollView style={{flex :1 }}>
                
                            {/* <Fab 
                        postPressed = {this._onPressPost}
                        active = {this.state.active}
                        longPressed = {() => this.setState({ active: !this.state.active })}
                        /> */}
                    <View style={styles.mainContainer}>
                        {this._renderContactHeader()}
                        {this._renderLabel()}
                        <View style={{flexGrow :1,  backgroundColor : 'transparent', marginTop : -13}}>
                            {this._renderMenu()}
                            {this._renderAbout()}
                            <View style={{marginTop : 15, flex: 1, backgroundColor : '#eeeeee'}}>
                                <FullPost />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </MenuProvider>
          );
    }
}



const styles = StyleSheet.create({
        popUpMenuButton : {
            flexDirection  :'row',
            alignItems : 'center',
            justifyContent : 'flex-start',

        },
        popUpMenuText : {
            color : 'rgba(0,0,0,0.6)',
            paddingLeft : 15
        },
        popUpMenuIcon :{
            color : 'rgba(0,0,0,0.6)',
            fontSize : 25
        },
        listItemStyle : {
            height : 35
        },
        listItemBody  : {
           borderBottomWidth : 0
        },
        listItemIcon :{
            fontSize : 20
        },
        listItemText : {
            fontSize : 14,
            color : 'rgba(0,0,0,0.6)'
        },
        mainContainer : {
            flex : 1, 
            flexDirection : 'column', 
           backgroundColor  : '#ffffff'
        },
        menuContainer : {
            flexDirection : 'row', 
            justifyContent : 'center',
            borderColor : 'rgba(0,0,0,0.1)',
            borderTopWidth : 0.4,
           // backgroundColor  :'red',
            paddingTop : 10,

        },
        menuButton : {
            flexDirection: 'column',
            alignItems : 'center',
            flex: 1,
            justifyContent : 'center'
        },
        menuIcon :{
            color : 'rgba(0,0,0,0.6)',
            fontSize : 18
            // fontWeight : 'bold'
        }, 
        menuText : {
            color : 'rgba(0,0,0,0.6)',
            fontSize : 12
            // fontWeight : 'bold'
        },
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
        tabBar: {
          backgroundColor: 'transparent',
          marginBottom: 20,
          marginLeft: 130,
          marginTop: -50,
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



const triggerStyles = {
    triggerWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
  
  const optionsStyles = {
    optionsContainer: {
      backgroundColor: '#ffffff',
      padding: 5,
    },
    optionsWrapper: {
    //   backgroundColor: 'purple',
    },
    optionWrapper: {
      backgroundColor: 'transparent',
      margin: 5,
    },
    optionTouchable: {
      underlayColor: 'gold',
      activeOpacity: 70,
    },
    optionText: {
      color: 'brown',
    },
  };
  
  const optionStyles = {
    optionTouchable: {
      underlayColor: 'transparent',
      activeOpacity: 40,
    },
    optionWrapper: {
      backgroundColor: 'transparent',
      margin: 5,
      flexDirection  :'row',
      alignItems : 'center',
      justifyContent : 'flex-start',
    },
    optionText: {
      color: 'black',
    },
  };

const menuProvider = StyleSheet.create({
//   container: {
//     flexDirection: 'column',
//     padding: 30,
//   },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    opacity: 0.5,
  },
  anchorStyle: {
    backgroundColor: 'blue',
  },
});

const menuProviderStyles = {
  //menuProviderWrapper: menuProvider.container,
  backdrop: menuProvider.backdrop,
};
export  { Profile };
