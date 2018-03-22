import React, { Component } from 'react';
import { View , StatusBar} from 'react-native';
import Global from '../../globals/Globals';

class Wrapper extends Component {
  render() {
    return (
      <View style={{flex :1, backgroundColor : Global.COLOR.MAIN}}>
          {this.props.children}
      </View>
    );
  }
}
export {Wrapper};
