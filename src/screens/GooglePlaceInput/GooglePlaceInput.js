import React from 'react';
import { View, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { _paddingAndroid } from '../../helpers';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { NavigationActions } from 'react-navigation';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

export default class GooglePlaceInput extends React.Component {
  static navigationOptions = {
      header : null
  };
  render(){
    return (

      <Container>
          {/* <Header style={{ backgroundColor : '#ffffff', marginTop : _paddingAndroid()}}>
            <Left>
              <Button onPress={()=>this.props.navigation.navigate('Register')} transparent>
                <Icon style={{color : 'rgba(0,0,0,0.8)'}} name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title style={{color : 'rgba(0,0,0,0.8)'}}>Set your location</Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon name='menu' />
              </Button>
            </Right>
          </Header> */}
          <View style={{flex:1}}>
          <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed='auto'    // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        
        getDefaultValue={() => ''}
        
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyD-rpxROQJySd9le4EUhR2NWJ7jjmgocJ8',
          language: 'en', // language of the results
          types: '(cities)' // default: 'geocode'
        }}
        
        styles={{
          textInputContainer: {
            width: '100%',
            marginTop : _paddingAndroid()
          },
          description: {
            fontWeight: 'bold'
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          }
        }}
        
        currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
        // currentLocationLabel="Current location"
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
          </View>
        </Container>
    );
  }
  
}
