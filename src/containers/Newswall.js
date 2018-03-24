import React, {Component} from 'react';
import { SearchTab, Wrapper } from '../components/common';
import { Content, Container, Header, View, Fab, Button, Icon, Text } from 'native-base';
import FullPost from '../containers/FullPost';
import Global from '../globals/Globals';


class Newswall extends Component {
    constructor(props) {
        super(props);
        this.state = {
          active: false
        };
    }

    _onPressPost = ()=> {
        this.props.navigation.navigate('PostPage');
        this.setState({
            active : false
        });
        console.log(123);
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
                        active={this.state.active}
                        direction="up"
                        containerStyle={{ }}
                        style={{ backgroundColor: Global.COLOR.LIGHTMAIN }}
                        position="bottomRight"
                        onPress={this._onPressPost}
                        onLongPress={() => this.setState({ active: !this.state.active })}>
                        <Icon name="plus" type='FontAwesome'/>
                        <Button style={{ backgroundColor: '#95a5a6' }}>
                        <Icon name="ios-paper-outline" />
                        </Button>
                        <Button style={{ backgroundColor: '#2980b9' }}>
                        <Icon name="ios-image" />
                        </Button>
                        <Button style={{ backgroundColor: '#27ae60' }}>
                        <Icon name="ios-videocam" />
                        </Button>
                        <Button  style={{ backgroundColor: '#e67e22' }}>
                        <Icon name="ios-musical-notes" />
                        </Button>
                        
                    </Fab>
                </View>
            </Wrapper>
        );
    }
}

export  { Newswall };
