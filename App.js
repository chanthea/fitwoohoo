import React from 'react';
import { SwitchNavigator  } from 'react-navigation';
import store from './src/redux/store';
import { Provider } from 'react-redux';
import Expo from "expo";
import MainDrawer from './src/components/navigations/MainDrawer';
import AuthStack from './src/components/navigations/AuthStack';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import {Root} from 'native-base';
// import axios from 'axios';

// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';
// axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// axios.interceptors.request.use(request =>{
//   return request;
// }, error => {
//   return Promise.reject(error);
// });

// axios.interceptors.response.use(response => {
//   return response;
// }, error => {
//   return Promise.reject(error);
// });






export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loadingFont: true };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loadingFont: false });
  }

  render() {
    if (this.state.loadingFont) {
      return <Expo.AppLoading />;
    }
    const RootStack  = SwitchNavigator(
      {
        AuthLoading: AuthLoadingScreen,
        App: MainDrawer,
        Auth: AuthStack,
      },
      {
        initialRouteName: 'AuthLoading',
      }
    );
    return (
      <Provider store={store}>
        <Root>
          <RootStack/>
        </Root>
        </Provider>
    );
  }
}