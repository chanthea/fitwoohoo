import React from 'react';
import { View, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { _paddingAndroid } from '../../helpers';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { HeaderTab } from '../../components/common';


const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

export default class GooglePlaceInput extends React.Component {
  static navigationOptions = {
      header : null
  };
  _goBackWithParams(address,lat,lng){
    this.props.navigation.state.params.returnData(address, lat,lng);
    this.props.navigation.goBack();
  }

 
  render(){
    return (
        <HeaderTab 
        goBackPressed = {()=>this._goBackWithParams('','','')}
        title='Select your address'
        noRight={false}
        >
      <GooglePlacesAutocomplete
        placeholder='Search your address...'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed='auto'    // true/false/undefined
        fetchDetails={true}
        renderDescription={(row) => row.description || row.vicinity} // custom description render
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        this._goBackWithParams(data.description,details.geometry.location.lat,details.geometry.location.lng)
        }}
        
        
        getDefaultValue={() => {
          return ''; // text input default value
        }}
        
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyD-rpxROQJySd9le4EUhR2NWJ7jjmgocJ8',
          language: 'en', // language of the results
          types: 'geocode'/*'(cities)'*/ // default: 
        }}
        
        styles={{
          textInputContainer: {
            width: '100%'
          },
          description: {
            fontWeight: 'bold'
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          }
        }}
       // nearbyPlacesAPI={'None'}
       nearbyPlacesAPI={'GoogleReverseGeocoding'}
      //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
       // currentLocationLabel="Select my current location"
          // minLength={2} // minimum length of text to search
          // autoFocus={false}
          // listViewDisplayed={false} // true/false/undefined
          // fetchDetails={true}
          // renderDescription={(row) => row.description || row.vicinity} // custom description render
          // onPress={this.props.onPress}
          // onChangeText={this.props.onFocus}
          // getDefaultValue={() => {
          // return ''; // text input default value
          // }}
        // nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        // GoogleReverseGeocodingQuery={{
        //   // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        // }}
        // GooglePlacesSearchQuery={{
        //   // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        //   rankby: 'distance',
        //   types: 'food'
        // }}
  
        // filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        // predefinedPlaces={[homePlace, workPlace]}
  
        //debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      //   renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
      //   renderRightButton={() => <Text>Custom text after the input</Text>}
      />
    </HeaderTab>
      // <Container>
        
      //     <Header style={{ backgroundColor : '#ffffff', marginTop : _paddingAndroid()}}>
      //       <Left>
      //         <Button onPress={()=>this.props.navigation.navigate('Register')} transparent>
      //           <Icon style={{color : 'rgba(0,0,0,0.8)'}} name='arrow-back' />
      //         </Button>
      //       </Left>
      //       <Body>
      //         <Title style={{color : 'rgba(0,0,0,0.8)'}}>Set your location</Title>
      //       </Body>
      //       <Right>
      //         <Button transparent>
      //           <Icon name='menu' />
      //         </Button>
      //       </Right>
      //     </Header>
      //     <View style={{flex:1}}>
          
      //     </View>
      //   </Container>
    );
  }
  
}
