import React, {Component} from 'react';
import { View, TextInput}  from 'react-native';
import { Wrapper } from '../components/common';
import { _paddingAndroid } from '../helpers';
import Global from '../globals/Globals';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import { Header, Left, Body, Right, Button, Icon, Title,Text, List, ListItem, Thumbnail } from 'native-base';



class PostPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            text : null
        }
    }

    static navigationOptions = {
        tabBarVisible : false,
        drawerLockMode: 'locked-closed',
        swipeEnabled : false
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
            <Body>
                <Title style={{color : '#ffffff'}}>Post new post</Title>
            </Body>
            <Right>
                <Button small iconRight transparent style={{borderColor : '#ffffff'}} onPress={this.props.menuPressed}>
                    <Text style={{color : '#ffffff', fontSize : 15, paddingRight:0}}>Post</Text>
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
                        <Text>Gguon Lykhim</Text>
                        <Text note>Doing what you like will always keep you happy . .</Text>
                    </Body>
                    </ListItem>
                </List>
                <View>
                {/* <TextInput
    multiline={true}
    numberOfLines={4}
    onChangeText={(text) => this.setState({text})}
    value={this.state.text}
    style={{height}}/> */}
                <AutoGrowingTextInput 
                minHeight={40}
                maxHeight={maxHeight} // this is a flexible value that I set in my 
                    // component, where I use this reusable component, same below, unless specified the other
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor='#C7C7CD'
                style={inputStyle}
                value={value}
            />
                        </View>
            </View>
        </Wrapper>

        );
    }
}

export  { PostPage };
