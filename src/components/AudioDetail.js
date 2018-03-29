import React from 'react';
import { ScrollView, View, TouchableHighlight, Text, StyleSheet } from 'react-native';
import { Video } from 'expo';
import VideoPlayer from '@expo/videoplayer';
import BaseScreen from './BaseScreen';



export default class AudioDetail extends BaseScreen {
  static navigationOptions = {
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
                uri:
                  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
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