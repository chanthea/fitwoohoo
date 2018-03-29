import React, { PureComponent } from 'react';
import { Text, ScrollView, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import {Icon } from 'native-base';
import GridList from 'react-native-grid-list'; // 1.0.5


export default class Video extends PureComponent {
  componentDidMount(){
     // console.log(NativeModules.UIManager);
    console.log('Video Page Component Did Mount');
  }
  renderItemAnimationAndSeparator = ({ item, i,animation }) => (
    <TouchableOpacity onPress={this.props.VideoDetail}>
    <Image
      style={styles.image}
      source={item.thumbnail}
      onLoad={() => animation.start()}
    />
     <Icon name="play-circle-outline" type="MaterialIcons" 
     style={{ position: 'absolute', top: '43%', left: '43%', color :'#ffffff' }} />
    </TouchableOpacity>
  );

  render() {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.girdAnimationAndSeparator}>
          <GridList
            showAnimation
            showSeparator
            data={itemsAnimationAndSeparator}
            numColumns={3}
            renderItem={this.renderItemAnimationAndSeparator}
            separatorBorderWidth={2}
            separatorBorderColor={'white'}
            animationInitialBackgroundColor={'white'}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : 'white'
  },
  girdAnimationAndSeparator: {
    backgroundColor: 'white',
  },
  girdAnimation: {
    backgroundColor: 'tomato',
  },
  girdSeparator: {
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

const newImage = {
  0: 'business',
  1: 'cats',
  2: 'city',
  3: 'food',
  4: 'nightlife',
  5: 'fashion',
  6: 'people',
  7: 'nature',
  8: 'animals',
  9: 'imageUrl',
  10: 'business',
  11: 'cats',
  12: 'city',
  13: 'food',
  14: 'nightlife',
  15: 'fashion',
  16: 'people',
};

const image = index => ({
  thumbnail: {
    uri: `https://lorempixel.com/200/200/${
      newImage[index % (Object.keys(newImage).length - 1)]
    }`,
  },
});
const itemsAnimationAndSeparator = Array.from(Array(16)).map((_, index) =>
  image(index),
);

// const itemsAnimation = Array.from(Array(6)).map((_, index) => image(index));
// const itemsSeparator = Array.from(Array(4)).map((_, index) => image(index));
// console.log(itemsAnimationAndSeparator);
// console.log(itemsAnimation);
// console.log(itemsSeparator);