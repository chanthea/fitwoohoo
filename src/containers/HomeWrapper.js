import React, {Component} from 'react';
import { Search, Wrapper } from '../components/common';
import { Content} from 'native-base';


class HomeWrapper extends Component {

    render(){
        return(
            <Wrapper>
                <Search />
                <Content style={{backgroundColor : '#ffffff'}}>
                    {this.props.children}
                </Content>
            </Wrapper>
        );
    }
}

export  { HomeWrapper };
