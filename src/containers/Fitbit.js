import React, { Component} from 'react';
import {Image} from 'react-native';
import {Button , Icon} from 'native-base';

class Fitbit extends Component{

    static navigationOptions = {
        drawerLabel: 'Profile',
        drawerIcon: ({ tintColor }) => (
          <Icon name="ios-arrow-back"/> ),
      };
    
      render() {
        return (
          <Button
          onPress={() => this.props.navigation.goBack()}
            title="Go to notifications"
          />
        );
      }
}
export {Fitbit};

