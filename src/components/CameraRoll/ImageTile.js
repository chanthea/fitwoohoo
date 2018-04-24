import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableHighlight,
} from 'react-native';
import Global from '../../globals/Globals';
import { Icon } from 'native-base';
const { width } = Dimensions.get('window')

class ImageTile extends React.PureComponent {
  render() {
    let { item, index, selected, selectImage } = this.props;
    if (!item) return null;
    return (
      <TouchableHighlight
        style={{opacity: selected ? 0.7 : 1}}
        underlayColor='transparent'
        onPress={() => selectImage(index)}
      >
        <View>
         {this.props.selected && <Icon 
        style={{position : 'absolute', bottom : 5, right : 5, color : Global.COLOR.MAIN}} 
          name='ios-checkmark-circle'/>}
        <Image
          style={{width: width/4, height: width/4, borderColor : 'white', borderWidth : 1}}
          source={{uri: item}}
        />
        </View>
      </TouchableHighlight>
    )
  }
}
export default ImageTile;
