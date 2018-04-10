import React, {Component} from 'react';
import {Platform} from 'react-native'
import { HeaderTab } from '../../components/common';
import {Icon,Root, Container, Header, Button, Content, ActionSheet, Text } from "native-base";

let BUTTONS = [
        { text: "Option 0", icon: "american-football", iconColor: "#2c8ef4" },
        { text: "Option 1", icon: "analytics", iconColor: "#f42ced" },
        { text: "Option 2", icon: "aperture", iconColor: "#ea943b" },
        { text: "Delete", icon: "trash", iconColor: "#fa213b" },
        { text: "Cancel", icon: "close", iconColor: "#25de5b" }
      ];
const DESTRUCTIVE_INDEX = 3;
const CANCEL_INDEX = 4;
class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }
    render(){
        return(
        
            <HeaderTab 
            goBackPressed = {()=>this.props.navigation.goBack()}
            menuPressed = {()=>this.props.navigation.navigate('DrawerOpen')}
            noRight = {true}
            actionButton = {(<Button transparent 
                onPress={() =>
                    ActionSheet.show(
                      {
                        options: BUTTONS,
                        cancelButtonIndex: CANCEL_INDEX,
                        destructiveButtonIndex: DESTRUCTIVE_INDEX,
                        title: "What you wanna do ?"
                      },
                      buttonIndex => {
                        this.setState({ clicked: BUTTONS[buttonIndex] });
                      }
                    )}
            >
                    <Icon  style={{color : '#ffffff'}}  name='md-keypad' />
            </Button>)}
            title='Location'
            >
                <Text>Hello</Text>
            </HeaderTab>
        
           
        );
    }
}
export  { Location };
