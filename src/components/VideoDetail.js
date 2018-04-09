import React from 'react';
import { ScrollView, View, TouchableHighlight, Text, StyleSheet } from 'react-native';
import { Video } from 'expo';
import VideoPlayer from '@expo/videoplayer';
import BaseScreen from './BaseScreen';



export default class VideoDetail extends BaseScreen {
  static navigationOptions = {
    mode : 'modal',
    tabBarVisible : false,
    drawerLockMode: 'locked-closed',
    swipeEnabled : false,
    headerTransparent:true,
    headerTintColor: 'white',
    headerStyle : {
        elevation: 0,
        shadowOpacity: 0,
        shadowColor: 'transparent',
        borderBottomWidth: 0,
      }
}

  constructor(props){
    super(props);
    this.state = {
      uri : ''
    }
  }
  componentWillMount(){
    const navParams = this.props.navigation.state.params;
    this.setState({
      uri : navParams.source.source
    })
  }

  changeRate(rate) {
    this._playbackInstance.setStatusAsync({
      rate: rate,
      shouldCorrectPitch: true,
    });
  }
  render() {
    return (
        <ScrollView
          contentContainerStyle={styles.container}>
          <VideoPlayer
            videoProps={{
              shouldPlay: true,
              resizeMode: Video.RESIZE_MODE_CONTAIN,
              source: {
                uri: this.state.uri,
              },
              isMuted: false,
              ref: component => {
                this._playbackInstance = component;
              },
              
            }}
            showControlsOnLoad={true}
            isPortrait={this.state.isPortrait}
            switchToLandscape={this.switchToLandscape.bind(this)}
            switchToPortrait={this.switchToPortrait.bind(this)}
            playFromPositionMillis={0}
            // usePoster={true}
            // posterSource = {{uri : 'https://www.istockphoto.com/resources/images/PhotoFTLP/img_67920257.jpg'}}
           // useNativeControls={true}
          />
        </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#000000',
  }
})