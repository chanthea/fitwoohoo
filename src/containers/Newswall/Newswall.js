import React, {Component} from 'react';
import { SearchTab, Wrapper } from '../../components/common';
import { Content, Container, Header, View, Button, Icon, Text } from 'native-base';
import Global from '../../globals/Globals';
import Fab from '../../components/Fab';
import Post from '../../components/Post/Post';
import {FlatList, StatusBar, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import { Constants } from 'expo';
import axios from '../../config/axios/axiosWithToken';


class Newswall extends React.PureComponent {
    static navigationOptions ={
        //tabBarVisible :false
    }
    constructor(props) {
        super(props);
        this.state = {
          firstLoad : true,
          active: false,
          loading: false,
          data: [],
          offset: 0,
          limit : 4,
          error: null,
          refreshing: false,
        };
    }
    _handleRefresh = ()=>{
        this.setState({
            offset : 0,
            refreshing : true,
        }, ()=>{
            this._makeRemoteRequest();
        });
    }

    _handleLoadMore = () =>{
        this.setState({
            offset : this.state.offset + this.state.limit,
        }, () => {
            this._makeRemoteRequest();
        });
    }
    _onPressPost = ()=> {
        this.setState({
            active : false
        });
        this.props.navigation.navigate('PostPage');
    };

    componentDidMount() {
        this._makeRemoteRequest();
    }

    _makeRemoteRequest = async() => {
        const { offset } = this.state;

        this.setState({ loading: true });
       // setTimeout(() =>{
        axios.get('/newswall',{limit : 4,offset : offset})
            .then(res => {
              this.setState({
                data: offset === 0 ? res.data : [...this.state.data, ...res.data],
                error: res.error || null,
                loading: false,
                refreshing: false,
              });
              if(this.state.firstLoad === true){
                this.setState({ firstLoad: false });
              }
              
            })
            .catch(error => {
              this.setState({ error, loading: false, refreshing : false });
              if(this.state.firstLoad === true){
                this.setState({ firstLoad: false });
              }
            });
       
      };

      

      _renderHeader = ()=>{
            return(
            <SearchTab  
            hasMargin={false}
            searchPressed ={()=>this.props.navigation.navigate('GeneralSearch')}
            menuPressed={()=>this.props.navigation.navigate('DrawerOpen')}/>
        );
      }
      _renderFooter = () => {
        if (!this.state.loading) return null;
        return (
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 1,
              borderColor: "#CED0CE"
            }}
          >
            <ActivityIndicator animating size="large" />
          </View>
        );
      };
    

    render(){
        return(
            <Wrapper>
                <View style={styles.statusBar} />
                {this.state.firstLoad ?
                    <View style={{flexGrow: 1, backgroundColor : 'white', justifyContent :'center'}}>
                        <ActivityIndicator size='large'/>
                        <Text style={{textAlign : 'center'}}>Loading....</Text>
                    </View> :
                  <FlatList 
                    style={styles.container}
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <Post post={item}/>
                    )}
                   keyExtractor={(item, index) => index}
                    ListHeaderComponent={this._renderHeader}
                    ListFooterComponent={this.renderFooter}
                    refreshing={this.state.refreshing}
                    onRefresh={this._handleRefresh}
                    onEndReached={this._handleLoadMore}
                    onEndReachedThreshold={5}
                
                />}
                
                
                  {/* <Fab 
              postPressed = {this._onPressPost}
              active = {this.state.active}
              longPressed = {() => this.setState({ active: !this.state.active })}
              />     */}
                  
            </Wrapper>
            
        );
    }
}

let { height } = Dimensions.get("window");
// console.log(height);
const styles = StyleSheet.create({
    statusBar: {
      backgroundColor: Global.COLOR.DARKMAIN,
      height: Constants.statusBarHeight,
    },
    container : { 
        flexGrow: 1, 
        backgroundColor : '#ffffff',
        height: height - 30
     }

  });

export { Newswall };
