import React, {Component} from 'react';
import {Text}  from 'react-native';
import { HeaderTab } from '../components/common';
import { Icon } from 'native-base';

class FitnessWellness extends Component {
    render(){
        return(
            <HeaderTab 
            goBackPressed = {()=>this.props.navigation.goBack()}
            menuPressed = {()=>this.props.navigation.navigate('DrawerOpen')}
            title='Fitness / Wellness'
            >
                <Text>Hello</Text>
            </HeaderTab>
        );
    }
}
export  { FitnessWellness };
