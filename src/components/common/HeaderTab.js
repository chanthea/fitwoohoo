import React, {Component} from 'react';
import {Text, View}  from 'react-native';
import { Wrapper } from './index';
import { _paddingAndroid } from '../../helpers';
import Global from '../../globals/Globals';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

class HeaderTab extends Component {
    render(){
        return(
            <Wrapper>
                <Header style={{marginTop : _paddingAndroid(), backgroundColor : Global.COLOR.MAIN}}>
                <Left>
                    <Button transparent onPress={this.props.goBackPressed}>
                    <Icon  style={{color : '#ffffff'}} name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title style={{color : '#ffffff'}}>{this.props.title}</Title>
                </Body>
                <Right>
                    <Button transparent onPress={this.props.menuPressed}>
                    <Icon  style={{color : '#ffffff'}} name='md-options' />
                    </Button>
                </Right>
                </Header>
                <View style={{flex : 1, backgroundColor : '#ffffff'}}>
                    {this.props.children}
                </View>
          </Wrapper>
        );
    }
}

export  { HeaderTab };
