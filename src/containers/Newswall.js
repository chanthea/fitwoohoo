import React, {Component} from 'react';
import { Search, Wrapper } from '../components/common';
import { Content, Button, Text} from 'native-base';


class Newswall extends Component {
    render(){
        return(
            <Wrapper>
                <Search menuPressed={()=>this.props.navigation.navigate('DrawerToggle')}/>
                <Content style={{backgroundColor : '#ffffff'}}>
                  <Text>Hello dude</Text>
                </Content>
            </Wrapper>
        );
    }
}

export  { Newswall };
