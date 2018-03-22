import React, {Component} from 'react';
import {Text}  from 'react-native';
import { HomeWrapper } from './index';


class Notification extends Component {
    render(){
        return(
            <HomeWrapper>
                <Text>Hello</Text>
            </HomeWrapper>
        );
    }
}

export  { Notification };
