import React, {Component} from 'react';
import { SearchTab, Wrapper } from '../../components/common';
import { Content, Container, Header, View, Button, Icon, Text } from 'native-base';
import FullPost from '../../containers/FullPost';
import Global from '../../globals/Globals';
import Fab from '../../components/Fab';
import Post from '../../components/Post';
import {FlatList, StatusBar, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import { Constants } from 'expo';
//import axios from '../../config/axios/axiosWithToken';
import axios from 'axios';


class Newswall extends Component {
    static navigationOptions ={
        //tabBarVisible :false
    }
    constructor(props) {
        super(props);
        this.state = {
          active: false,
          loading: false,
          data: [],
          page: 1,
          seed: 1,
          error: null,
          refreshing: false,
        };
    }
    _handleRefresh = ()=>{
        this.setState({
            page : 1,
            refreshing : true,
            seed : this.state.seed +1
        }, ()=>{
            this._makeRemoteRequest();
        });
    }

    _handleLoadMore = () =>{
        this.setState({
            page : this.state.page + 1,
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
        StatusBar.setBackgroundColor('#553A91');
        this._makeRemoteRequest();
    }

    _makeRemoteRequest = async() => {
        const { page, seed } = this.state;
        const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=5`;
        this.setState({ loading: true });
       // setTimeout(() =>{
            axios.get(url)
            .then(res => {
              //  console.log(res.data);
              this.setState({
                data: page === 1 ? res.data.results : [...this.state.data, ...res.data.results],
                error: res.error || null,
                loading: false,
                refreshing: false
              });
            })
            .catch(error => {
             //   console.log(error.response);
              this.setState({ error, loading: false, refreshing : false });
            });
     //   },3000);
       
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
            <Wrapper style={{backgroundColor : 'blue'}}>
                <View style={styles.statusBar} />
                  <FlatList 
                    style={styles.container}
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <Post  key={item.email}/>
                    )}
                    keyExtractor={item => item.email}
                    ListHeaderComponent={this._renderHeader}
                    ListFooterComponent={this.renderFooter}
                    refreshing={this.state.refreshing}
                    onRefresh={this._handleRefresh}
                    onEndReached={this._handleLoadMore}
                    onEndReachedThreshold={5}
                
                />
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
console.log(height);
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
