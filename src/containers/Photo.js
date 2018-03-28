import React, { PureComponent } from 'react';
import { Text, ScrollView, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import GridList from 'react-native-grid-list'; 
import ImageGallery from './ImageGallery';

export default class Photo extends PureComponent {
    constructor(props){
        super(props);
      
      
    }
//   _renderImageGallery(){
//       return <ImageGallery />
//   }  
  renderItemAnimationAndSeparator = ({ item, animation }) => (
    <TouchableOpacity onPress={()=>console.log(123)}>
    <Image
      style={styles.imageRadius}
      source={item.thumbnail}
      onLoad={() => animation.start()}
    />
    </TouchableOpacity>
  );
  renderItemAnimation = ({ item, animation }) => (
    <Image
      style={styles.image}
      source={item.thumbnail}
      onLoad={() => animation.start()}
    />
  );
  renderItemSeparator = ({ item }) => (
    <Image style={styles.image} source={item.thumbnail} />
  );

  render() {
    
    return (
        
      //<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
       <TouchableOpacity style={{marginTop : 100}} onPress={()=>console.log(123)}>
           <Text>123</Text>
        </TouchableOpacity>
     
    //     <View style={styles.girdAnimationAndSeparator}>
    //       <GridList
    //         showAnimation
    //         showSeparator
    //         data={itemsAnimationAndSeparator}
    //         numColumns={3}
    //         renderItem={this.renderItemAnimationAndSeparator}
    //         separatorBorderWidth={2}
    //         separatorBorderColor={'white'}
    //         animationInitialBackgroundColor={'white'}
    //       />
    //     </View>
    //   </ScrollView>
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
  imageRadius: {
    width: '100%',
    height: '100%',
    // borderRadius: 10,
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
console.log(image);


const itemsAnimationAndSeparator = Array.from(Array(16)).map((_, index) =>
  image(index),
);

// const itemsAnimation = Array.from(Array(6)).map((_, index) => image(index));
// const itemsSeparator = Array.from(Array(4)).map((_, index) => image(index));
// console.log(itemsAnimationAndSeparator);
// console.log(itemsAnimation);
// console.log(itemsSeparator);