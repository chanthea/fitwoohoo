import React, {Component} from 'react';
import { View, StyleSheet, Platform, TouchableOpacity}  from 'react-native';
import { Wrapper } from '../components/common';
import { _paddingAndroid } from '../helpers';
import Global from '../globals/Globals';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import { 
    Header, 
    Left, 
    Body, 
    Right, 
    Button, 
    Icon, 
    Title,
    List,
    ListItem,
    Text, 
    Thumbnail, 
    Content, 
    Footer, 
    FooterTab,
     } from 'native-base';
     
import { NavigationActions } from 'react-navigation';
class PostPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            textValue: null
        }
    }

    static navigationOptions = {
        tabBarVisible : false,
        drawerLockMode: 'locked-closed',
        swipeEnabled : false
    }
    _onChange(event) {
        this.setState({ textValue: event.nativeEvent.text || '' });
      }
    
      _resetTextInput() {
        this._textInput.clear();
        this._textInput.resetHeightToMin();
      }
    render(){

        return(
            
            <Wrapper>
            <Header style={{marginTop : _paddingAndroid(), backgroundColor : Global.COLOR.MAIN}}>
            <Left>
                <Button transparent onPress={()=>this.props.navigation.goBack()}>
                <Icon  style={{color : '#ffffff'}} name='arrow-back' />
                </Button>
            </Left>
            <Body style={{flex :2}}>
                <Title style={{color : '#ffffff', fontSize: 17}}>Update new status</Title>
            </Body>
            <Right>
                <Button small iconRight transparent style={{borderColor : '#ffffff'}} onPress={this.props.menuPressed}>
                    <Text style={{color : '#ffffff', fontSize : 15, paddingRight:0}} uppercase={false}>Post</Text>
                </Button>
            </Right>
            </Header>
            <View style={{flex : 1, flexDirection : 'column', backgroundColor : '#ffffff'}}>
                <List >
                    <ListItem avatar>
                    <Left>
                        <Thumbnail small source={require('../images/profile.jpg')} />
                    </Left>
                    <Body style={{borderColor : 'transparent'}}>
                        <Text style={styles.name}>Gguon Lykhim</Text>
                        <View style={{flexDirection : 'row'}}>
                            <Icon name="ios-globe-outline"
                            style={[styles.iconSmall,{ marginTop : Platform.OS === 'android' ? 2 : 0 }]} 
                            /> 
                            <Text note style={styles.privacy}>Colleagues</Text>
                        </View>
                    </Body>
                    </ListItem>
                </List>
                <View style={styles.textInputContainer}>
                <AutoGrowingTextInput
                    value={this.state.textValue}
                    onChange={(event) => this._onChange(event)}
                    style={styles.textInput}
                    placeholder='Tell them how you feel today....'
                    placeholderTextColor='#66737C'
                    maxHeight={200}
                    minHeight={20}
                    enableScrollToCaret
                    underlineColorAndroid= 'transparent'
                    ref={(r) => { this._textInput = r; }}
                />
                </View>
                <Footer >
                    <FooterTab style={{backgroundColor : Global.COLOR.MAIN}}>
                        <Button vertical>
                        <Icon style={{color:'white'}} name="ios-images" />
                        <Text style={{color:'white'}}>Photos</Text>
                        </Button>
                        <Button vertical>
                        <Icon style={{color:'white'}} name="ios-videocam" />
                        <Text style={{color:'white'}}>Videos</Text>
                        </Button>
                        <Button vertical>
                        <Icon style={{color:'white'}} name="ios-musical-notes" />
                        <Text style={{color:'white'}}>Audios</Text>
                        </Button>
                    </FooterTab>
                </Footer>   
            </View>
            
        </Wrapper>

        );
    }
}
const IsIOS = Platform.OS === 'ios';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#76c6ff'
    },
    textInputContainer: {
      flexDirection: 'row',
      paddingLeft: 8,
      paddingRight: 8,
      flex: 3
    },
    textInput: {
      paddingLeft: 10,
      fontSize: 17,
      flex: 1,
      backgroundColor: 'white',
      borderWidth: 0,
      borderRadius: IsIOS ? 4 : 0,
      textAlignVertical: "top"
    },
    button: {
      paddingLeft: 5,
      alignItems: 'center',
      justifyContent: 'center',
    }, 
    iconSmall : {
        fontSize : 11, 
        color : 'rgba(0,0,0,0.6)', 
        paddingRight : 2, 
       
    },
    privacy : {
        fontSize : 10
    },
    name : {
        fontSize : 14
    },
  });

export  { PostPage };
