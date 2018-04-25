import React, {Component} from 'react';
import {  Fab, Button, Icon } from 'native-base';
import Global from '../globals/Globals';
import { NavigationActions } from 'react-navigation';

class FabButton extends Component {
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
       // this.props.navigation.navigate('PostPage');
        this.props.navigation.dispatch(navigateAction);
    };



    render(){
        const navigateAction = NavigationActions.navigate({
            routeName: 'Profile',
            params: {name : 'Profile'},
          });
        return(
            <Fab
                active={this.props.active}
                direction="up"
                style={{ backgroundColor: Global.COLOR.LIGHTMAIN }}
                position="bottomRight"
                onPress={this.props.postPressed}
                onLongPress={this.props.longPressed}>
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
        );
    }
}

export default FabButton;
