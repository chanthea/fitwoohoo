import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import axios from '../config/axios/axiosNoAuth';
import {StoreUserAction} from '../redux/actions/StoreUserAction';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    //console.log(this.props);
    this._bootstrapAsync();
  }

  _checkValidToken = (token, dispatch) =>{
    axios.get('/auth/getuser?token='+token)
      .then(res =>{
      //console.log(res.data);
      //  this.onLoginSuccess(token);
      this.props.StoreUserAction(res.data);
        this.props.navigation.navigate(res.data.status === 'success' ? 'App' : 'Auth');
      }).catch(err =>{
        this.props.navigation.navigate('Auth');
      });
  }

  _bootstrapAsync = async (dispatch) => {
    const userToken = await AsyncStorage.getItem('userToken');
    if(userToken) {
      this._checkValidToken(userToken,dispatch);
      
    }else{
      this.props.navigation.navigate('Auth');
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator  size="large"/>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = {
  StoreUserAction
}

export default connect(mapStateToProps,mapDispatchToProps)(AuthLoadingScreen);

const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center'
  }
});

