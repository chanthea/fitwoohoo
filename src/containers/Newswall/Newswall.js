import React, {Component} from 'react';
import { SearchTab, Wrapper } from '../../components/common';
import { Content, Container, Header, View, Button, Icon, Text } from 'native-base';
import FullPost from '../../containers/FullPost';
import Global from '../../globals/Globals';
import Fab from '../../components/Fab';


class Newswall extends Component {
    constructor(props) {
        super(props);
        this.state = {
          active: false
        };
    }
    _onPressPost = ()=> {
        this.setState({
            active : false
        });
        this.props.navigation.navigate('PostPage');
    };

    render(){
        return(
            <Wrapper>
                <SearchTab  
                searchPressed ={()=>this.props.navigation.navigate('GeneralSearch')}
                 menuPressed={()=>this.props.navigation.navigate('DrawerOpen')}/>
                <View style={{ flex: 1, backgroundColor : '#ffffff' }}>
                    <FullPost/>
                    <Fab 
              postPressed = {this._onPressPost}
              active = {this.state.active}
              longPressed = {() => this.setState({ active: !this.state.active })}
              />       
                </View>
            </Wrapper>
        );
    }
}

export { Newswall };
