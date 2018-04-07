// import React, {Component} from 'react';
// import { SearchTab, Wrapper } from '../../components/common';
// import { Content, Container, Header, View, Button, Icon, Text } from 'native-base';
// import FullPost from '../../containers/FullPost';
// import Global from '../../globals/Globals';
// import Fab from '../../components/Fab';
// import Post from '../../components/Post';
// import {FlatList, StatusBar, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
// import { Constants } from 'expo';
// import axiosToken from '../../config/axios/axiosWithToken';
// import axios from 'axios';


// class Newswall extends Component {
//     static navigationOptions ={
//         //tabBarVisible :false
//     }
//     constructor(props) {
//         super(props);
//         this.state = {
//           active: false,
//           loading: false,
//           data: [],
//           offset: 0,
//           limit : 4,
//           error: null,
//           refreshing: false,
//         };
//     }
//     _handleRefresh = ()=>{
//         this.setState({
//             offset : 0,
//             refreshing : true,
//         }, ()=>{
//             this._makeRemoteRequest();
//         });
//     }

//     _handleLoadMore = () =>{
//         this.setState({
//             offset : this.state.offset + this.state.limit,
//         }, () => {
//             this._makeRemoteRequest();
//         });
//     }
//     _onPressPost = ()=> {
//         this.setState({
//             active : false
//         });
//         this.props.navigation.navigate('PostPage');
//     };

//     componentDidMount() {
//         // axiosToken.get('/newswall',{limit : 4,offset : 0}).
//         // then((response)=>{
//         //         console.log(response.data);
//         // }).catch((error)=>{
//         //        console.log(error.response);
//         // })

//         this._makeRemoteRequest();


//     }

//     _makeRemoteRequest = async() => {
//         const { offset } = this.state;

//         this.setState({ loading: true });
//        // setTimeout(() =>{
//         axiosToken.get('/newswall',{limit : 4,offset : offset})
//             .then(res => {
//               //  console.log(res.data);
//               this.setState({
//                 data: offset === 0 ? res.data : [...this.state.data, ...res.data],
//                 error: res.error || null,
//                 loading: false,
//                 refreshing: false
//               });
//             })
//             .catch(error => {
//              //   console.log(error.response);
//               this.setState({ error, loading: false, refreshing : false });
//             });
//      //   },3000);
       
//       };

//       _renderHeader = ()=>{
//             return(
//             <SearchTab  
//             hasMargin={false}
//             searchPressed ={()=>this.props.navigation.navigate('GeneralSearch')}
//             menuPressed={()=>this.props.navigation.navigate('DrawerOpen')}/>
//         );
//       }
//       _renderFooter = () => {
//         if (!this.state.loading) return null;
//         return (
//           <View
//             style={{
//               paddingVertical: 20,
//               borderTopWidth: 1,
//               borderColor: "#CED0CE"
//             }}
//           >
//             <ActivityIndicator animating size="large" />
//           </View>
//         );
//       };
    

//     render(){
//         const generateKey = (pre) => {
//             return `${ pre }_${ new Date().getTime() }`;
//         }
//         return(
//             <Wrapper style={{backgroundColor : 'blue'}}>
//                 <View style={styles.statusBar} />
//                   <FlatList 
//                     style={styles.container}
//                     data={this.state.data}
//                     renderItem={({ item }) => (
//                         <Post post={item}/>
//                     )}
//                     keyExtractor={(item, index) => index}
//                     ListHeaderComponent={this._renderHeader}
//                     ListFooterComponent={this.renderFooter}
//                     refreshing={this.state.refreshing}
//                     onRefresh={this._handleRefresh}
//                     onEndReached={this._handleLoadMore}
//                     onEndReachedThreshold={5}
                
//                 />
//                   {/* <Fab 
//               postPressed = {this._onPressPost}
//               active = {this.state.active}
//               longPressed = {() => this.setState({ active: !this.state.active })}
//               />     */}
                  
//             </Wrapper>
            
//         );
//     }
// }

// let { height } = Dimensions.get("window");
// // console.log(height);
// const styles = StyleSheet.create({
//     statusBar: {
//       backgroundColor: Global.COLOR.DARKMAIN,
//       height: Constants.statusBarHeight,
//     },
//     container : { 
//         flexGrow: 1, 
//         backgroundColor : '#ffffff',
//         height: height - 30
//      }

//   });
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native'
import PhotoGrid from 'react-native-thumbnail-grid';
import _ from 'lodash'

export default class Newswall extends Component {
  constructor (props) {
    super(props)
    this.state = {
      images: []
    }
  }

  componentWillMount () {
    const images = [
      'https://drscdn.500px.org/photo/216465193/m%3D2048_k%3D1_a%3D1/dda61fd7cea5013f8ebe7661b7abea3a',
      'https://drscdn.500px.org/photo/215467843/m%3D2048_k%3D1_a%3D1/344703e86f31e1fffb2d63effa2cee33',
      'https://drscdn.500px.org/photo/216340727/m%3D2048_k%3D1_a%3D1/20d583e15467fb39d06d48131767edc2',
      'https://drscdn.500px.org/photo/215498077/m%3D2048_k%3D1_a%3D1/f79e906eb96938807f6f9d758fc652fd',
      'https://drscdn.500px.org/photo/216559713/m%3D2048_k%3D1_a%3D1/393ef5251fa94964fe62cad52a416b7e',
      'https://drscdn.500px.org/photo/214943889/m%3D2048_k%3D1_a%3D1/90bd2e3619dfcaae53fed683561aae1b',
      'https://drscdn.500px.org/photo/216158509/m%3D2048_k%3D1_a%3D1/cf70d51aab6ca4c4a3c1ecc225c69990',
      'https://drscdn.500px.org/photo/216111469/m%3D2048_k%3D1_a%3D1/d2d83296c838258095dbf2bffda70602',
      'https://drscdn.500px.org/photo/216051623/m%3D2048_k%3D1_a%3D1/5a3732bb413f240ad71b8279b038a3ff',
      'https://drscdn.500px.org/photo/216047335/m%3D2048_k%3D1_a%3D1/4237ac4606474f0ec7ccc05ca311772e',
      'https://drscdn.500px.org/photo/216000289/m%3D2048_k%3D1_a%3D1/5ac2a21092f9281feef3ab8484d2b19c'
    ]
    this.setState({ images: images })
    // this.interval = setInterval(() => {
    //   let numImage = Math.floor(Math.random() * 11) + 1
     
    // }, 2000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  render () {
    const { images } = this.state
    return (
      <View style={styles.container}>
        <PhotoGrid source={images} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'grey'
  }
})


 export { Newswall };
