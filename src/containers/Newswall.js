import React, {Component} from 'react';
import { Search, Wrapper } from '../components/common';
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


    render(){
        return(
            <Wrapper>
                <Search menuPressed={()=>this.props.navigation.navigate('DrawerOpen')}/>

                <View style={{ flex: 1, backgroundColor : '#ffffff' }}>
                    <FullPost/>
                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{ }}
                        style={{ backgroundColor: Global.COLOR.LIGHTMAIN }}
                        position="bottomRight"
                        onPress={() => this.setState({ active: !this.state.active })}>
                        <Icon name="plus" type='FontAwesome'/>
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
