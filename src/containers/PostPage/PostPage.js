import React, {Component} from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, ScrollView, Image}  from 'react-native';
import { Wrapper } from '../../components/common';
import { _paddingAndroid } from '../../helpers';
import Global from '../../globals/Globals';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import { connect } from 'react-redux';
import MultiSelect from 'react-native-multiple-select';
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
    Picker,
    Form,
     } from 'native-base';
import axios from '../../config/axios/axiosWithToken';
import { NavigationActions } from 'react-navigation';
import { ImagePicker } from 'expo';
import { FileSystem } from 'expo';
import ImageBrowser from '../../components/CameraRoll/ImageBrowser';


class PostPage extends Component {
    static navigationOptions = {
        tabBarVisible : false,
        drawerLockMode: 'locked-closed',
        swipeEnabled : false
    }
    constructor(props){
        super(props);
        this.subFollowType = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27];
        this.state = {
            textValue: null,
            followType : {
                id : 1,
                type : 'Public'
            },
            subFollowType : this.subFollowType,
            image: null,
            imageBrowserOpen: false,
            photos: [],
            maxPhoto : 10,
            postType : 'image',
            uri : null
        }
    }
    _onChange(event) {
        this.setState({ textValue: event.nativeEvent.text || '' });
    }
    
    _resetTextInput() {
        this._textInput.clear();
        this._textInput.resetHeightToMin();
    }

    _setFollowTypeState = (id,type) => {
        this.setState({followType :{ ...this.state.followType, id: id, type : type}});
    }

    _setSubFollowTypeState = (id) => {
        if(id.length === 0){
            id = this.subFollowType;
        }
        this.setState({
            subFollowType : id
        })
    }

    _getFollowType = () => {
        this.props.navigation.navigate('PostFollowType', {
            setFollowType : this._setFollowTypeState,
            followType : this.state.followType
        });
    }


    _getSubFollowType = () => {
        this.props.navigation.navigate('PostSubFollowType',{
            setSubFollowType : this._setSubFollowTypeState,
            subFollowType : this.state.subFollowType
        })
    }
    
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          aspect: [4, 3],
        });
        this.setState({uri: result.uri});
        console.log(result);
      };
      renderImage(item, i) {
        return(
          <Image
            style={styles.ImageStyle}
            source={{uri: item.file}}
            key={i}
          />
        )
      }
    imageBrowserCallback = (callback) => {
        callback.then((photos) => {
         // console.log(photos)
          this.setState({
            imageBrowserOpen: false,
            photos
          })
        }).catch((e) => console.log(e))
      }

    _updateNewPost = () => {

        const {textValue , photos, followType, postType, subFollowType, uri} = this.state;
        let bodyFormData  = new FormData();
        bodyFormData.append('type', postType);
        bodyFormData.append('description', textValue);
        bodyFormData.append('ftype', followType.id);
        bodyFormData.append('sub_ftype', subFollowType);
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
        bodyFormData.append('images', {
            uri,
            name: `photo.${fileType}`,
            type: 'image/jpeg',
        });
        //  console.log(bodyFormData);
        // let api = 'https://www.fitwoohoo.com/api/m/post?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHBzOi8vd3d3LmZpdHdvb2hvby5jb20vYXBpL20vYXV0aC9nZXR0b2tlbiIsImlhdCI6MTUyMzM2MTc5MCwiZXhwIjoxNTI1OTUzNzkwLCJuYmYiOjE1MjMzNjE3OTAsImp0aSI6IkVvalRkcEtWbFpWS0lVd2MifQ.-nxB0mMrQx0TrRTpjG8EYJkxmDIExdx9Y3UdoScKFOk';
        // fetch(api, {  
        //     method: 'POST',
        //     body: bodyFormData,
        //     headers: {
        //        Accept: 'application/json',
        //       'Content-Type': 'multipart/form-data'
        //     },
        //   }).then((responseJson) => {
        //     console.log(responseJson);
    
        //   }).catch(error => {
        //     console.log(error);
        //   })
        axios.post('/post',bodyFormData ).then(res=> {
            console.log(res)
        }).catch(err => {
            console.log(err);
        })
        // axios.post('/post',{
        //     type : postType,
        //     description : textValue,
        //     ftype : followType.id,
        //     sub_ftype : subFollowType, 
        
        // },).then(res => {
        //     console.log(res.data)
        // }).catch(error => {
        //     console.log(error.response.data);
        // })
    }
    render(){
        const {user} = this.props.user;
        const { selectedItems, followType, subFollowType } = this.state;
        if (this.state.imageBrowserOpen) {
            return(<ImageBrowser max={this.state.maxPhoto} callback={this.imageBrowserCallback}/>);
          }
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
                <Button transparent onPress={this._updateNewPost}>
                <Icon name='send-o' style={{color : 'white'}} type='FontAwesome'/>
                </Button>
            </Right>
            </Header>
            <View style={{flex : 1, flexDirection : 'column', backgroundColor : '#ffffff'}}>
                <List >
                    <ListItem avatar>
                    <Left>
                        <Thumbnail small source={{uri : Global.PHOTO.PROFILE+user.photo}} />
                    </Left>
                    <Body style={{borderColor : 'transparent'}}>
                        <Text style={styles.name}>{user.name+' '+user.lastname}</Text>
                        <View style={{flexDirection : 'row'}}>
                            <Button onPress={this._getFollowType} transparent style={{height : 25, justifyContent : 'flex-start'}}>
                                <Icon name="ios-globe-outline"
                                style={styles.iconSmall} 
                                /> 
                                <Text note style={styles.privacy} uppercase={false}>{followType.type}</Text>
                            </Button>
                            {this.state.followType.type == 'Family' &&
                            <Button onPress={this._getSubFollowType} transparent style={{height : 25}}>
                                <Icon name="ios-pricetags-outline"
                                style={styles.iconSmall} 
                                /> 
                                <Text note style={styles.privacy} uppercase={false}>
                                {
                                    subFollowType.length === 0  ?
                                  "All family's follow types selected" : 
                                  subFollowType.length+" family's follow types selected"
                                }
                              
                                </Text>
                            </Button>
                            }
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
                <View style={styles.scrollViewContainer}>
                    <ScrollView 
                    style={styles.scrollView}
                    horizontal={true}>
                    {this.state.photos.map((item,i) => this.renderImage(item,i))}
                    </ScrollView>
                </View>
                
                <Footer >
                    <FooterTab style={{backgroundColor : Global.COLOR.MAIN}}>
                        <Button 
                         //onPress={() => this.setState({imageBrowserOpen: true})}
                           onPress={this._pickImage}
                            vertical>
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
    scrollViewContainer : {width : '100%', height : 100},
    scrollView : {flexDirection : 'row', flex : 1},
    ImageStyle :{
        width : 100,
        height : 100,
        borderColor : 'white',
        borderWidth : 1
    },
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#76c6ff'
    },
    textInputContainer: {
      flexDirection: 'row',
      paddingLeft: 8,
      paddingRight: 8,
      flex: 4,
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
        marginLeft : 0, 
        marginRight : 5,
        fontFamily : 'System',
        marginTop : Platform.OS === 'android' ? 2 : 0
    },
    privacy : {
        fontSize : 10,
        paddingLeft : 0
    },
    name : {
        fontSize : 14
    },
  });

  const mapStateToProps = state => {
      return state.user;
  }
export default connect(mapStateToProps)(PostPage);
