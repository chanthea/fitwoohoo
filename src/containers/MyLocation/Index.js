import React from 'react';
import { SwitchNavigator  } from 'react-navigation';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import { connect } from 'react-redux';

class Location extends React.Component {
    static navigationOptions = {
        tabBarVisible : false,
        header : null
    }
  constructor(props) {
    super(props);
    this._renderLocation();
  }
  _renderLocation = () =>{
    if(this.props.user.user.role_id !== 1){
        this.props.navigation.navigate('MyLocation');
    }else{
        this.props.navigation.navigate('TrainerLocation');
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const mapStateToProps = state => {
    return state.user
}
export default connect(mapStateToProps)(Location);