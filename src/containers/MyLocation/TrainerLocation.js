import React, {Component} from 'react';
import { Platform, StyleSheet, View, Text, Dimensions, Image} from 'react-native'
import { HeaderTab } from '../../components/common';
import {Icon,Root, Container, Header, Button, Content, ActionSheet, Text as NBText, Toast, Fab} from "native-base";
import { Constants, MapView, Location, Permissions } from 'expo';
import { connect } from 'react-redux';
//import Image from 'react-native-scalable-image';
import axios from '../../config/axios/axiosWithToken';
import Global from '../../globals/Globals';
import { duration } from 'moment';


const deltas = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const region = {
    latitude: 37.321996988,
    longitude: -122.0325472123455,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0521
  }
const { height } = Dimensions.get("window");
class TrainerLocation extends Component {

    static navigationOptions = {
        tabBarVisible : false,
    }

    constructor(props) {
        super(props);
        this.marker;
        this.state = {
            region : region,
            loading : true,
            active: true,
            currentMarker : null
          };
      }
      componentDidMount() {
        this._getSaveLocation();
      }

      _handleMapRegionChange = mapRegion => {
        this.setState({ region : mapRegion});
      };
    
      _getLocationAsync = async () => {
       let { status } = await Permissions.askAsync(Permissions.LOCATION);
       if (status !== 'granted') {
        Toast.show({
            text: "Permission to access location was denied",
            position: "bottom"
          });
       }
       let location = await Location.getCurrentPositionAsync({enableHighAccuracy : true});
       this._setState(location.coords.latitude,location.coords.longitude);
     };

     _getSaveLocation = () => {
         axios.get('/marker').then(res=>{
            this._setState(res.data.lat, res.data.lng);
         }).catch(error => {
            Toast.show({
                text: "Server is not responding",
                position: "bottom"
              });
              this.setState({
                loading : false
                });
        })
     }

    
   
   _reRenderFindLocation = () => {
    Toast.show({
        text: "Searching current location...",
        position: "bottom",
        duration : 1500
      });
    this._getLocationAsync();   
   }
   _reSearchLocation(address, lat, lng) {
       if(lat !== '' && lng !== ''){
            this._setState(lat,lng);
       }
    }

    _setState = (lat,lng) => {
        lat = parseFloat(lat);
        lng = parseFloat(lng);
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + lng + '&key=' + Global.GOOGLE_API_KEY)
        .then((response) => response.json())
        .then((res) => {
            //console.log('ADDRESS GEOCODE is BACK!! => ' + res.results[0].formatted_address);
            const region = {
                latitude: lat,
                longitude: lng,
                ...deltas
                };
            this.setState({
                region,
                currentMarker : {
                    coords: { latitude: lat, longitude: lng},
                    address : res.results[0].formatted_address
                },
                loading : false
            });
        })

      
     }

     

     _saveLocation = () =>{
         const {currentMarker} = this.state;
         if(currentMarker === null){
            Toast.show({
                text: "Location is invalid...!",
                position: "bottom",
            });
         }else{

         
        Toast.show({
            text: "Saving location...",
            position: "bottom",
        });
          axios.post('marker',{
            address : currentMarker.address,
            lat : currentMarker.coords.latitude,
            lng : currentMarker.coords.longitude,
          }).then(res=>{
            Toast.show({
                text: "Location saved successfully !",
                position: "bottom",
                duration : 3000
              });
          }).catch(error => {
            Toast.show({
                text: "Server is not responding",
                position: "bottom",
                duration : 3000
              });
          })
         }
          
     }
     _onDragEnd = (e) => {
         let coordinate = e.nativeEvent.coordinate;
         this._setState(coordinate.latitude, coordinate.longitude);
     }

    render(){
       // console.log(this.state.region);
        return(
            <HeaderTab 
            goBackPressed = {()=>this.props.navigation.navigate('NewsWall')}
            menuPressed = {()=>this.props.navigation.navigate('DrawerOpen')}
            noRight = {false}
            title='Location'
            >
                <View style={styles.container}>
                    <MapView
                    style={{ alignSelf: 'stretch', height : '100%'}}
                    region ={this.state.region}
                    onRegionChangeComplete={this._handleMapRegionChange}
                    >
                       {this.state.currentMarker !== null &&
                        <MapView.Marker
                        ref={ref=>{this.marker = ref}}
                        onDragEnd = {(e) => this._onDragEnd(e)}
                        coordinate={this.state.currentMarker.coords}
                        title={this.props.user.user.name + ' ' + this.props.user.user.lastname}
                        description = {this.state.currentMarker.address}
                        onLoad={() => this.forceUpdate()}
                        onLayout={() => this.forceUpdate()}
                        draggable
                        >
                            <Image source={{uri : Global.PHOTO.PROFILE+this.props.user.user.photo}}
                            style={{
                                width : 35, 
                                height : 35, 
                                borderRadius : 35/2, 
                                borderWidth :2, 
                                borderColor : 'white'
                            }}
                            />
                        </MapView.Marker>
                    }
                    </MapView>
                    <Button 
                    style={styles.button}
                    onPress={this._getSaveLocation}
                    >
                    <Icon style={styles.buttonIcon} name='logo-buffer' />
                    </Button>
                     {this.state.loading === true &&
                    <View 
                    style={styles.loading}>
                        <Text style={{paddingLeft : 10, color : 'rgba(255,255,255,0.9)'}}>Getting Information.....</Text>
                    </View>}
                </View>
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{ }}
                    style={{ backgroundColor: !this.state.active ? Global.COLOR.MAIN : Global.COLOR.LIGHTMAIN }}
                    position="bottomRight"
                    onPress={() => this.setState({ active: !this.state.active })}>
                    <Icon name="align-center" type="FontAwesome" />

                    <Button onPress={this._reRenderFindLocation} style={{ backgroundColor: 'white' }}>
                    <Icon style={{color : Global.COLOR.MAIN}} name='rss' type='FontAwesome' />
                    </Button>
                    <Button 
                    onPress={()=> this.props.navigation.navigate('GooglePlace',{
                    title : 'Find nearby locations', 
                    returnData: this._reSearchLocation.bind(this)})} 
                    style={{ backgroundColor: 'white' }}
                    >
                    <Icon style={{color : Global.COLOR.MAIN}} name="search" type='FontAwesome'/>
                    </Button>
                    <Button 
                    onPress={this._saveLocation} 
                    style={{ backgroundColor: 'white' }}>
                    <Icon style={{color : Global.COLOR.MAIN}} name="save" type='FontAwesome' />
                    </Button>
                </Fab>
            </HeaderTab>
        
           
        );
    }
}
const styles = StyleSheet.create({
    button : {
        position : 'absolute', 
        top : 8, 
        left : 8,
        backgroundColor : 'white',
        height : 50,
        width : 50,
        borderRadius : 50/2,
        justifyContent : 'center'
    },
    loading : {
        position : 'absolute', 
        height : 50, 
        width : '100%', 
        backgroundColor  :'rgba(0,0,0,0.7)',
        justifyContent : 'center',
        bottom : 0,
        },
    buttonIcon : {
        textAlign : 'center',
        color : 'rgba(0,0,0,0.8)',
        marginLeft : 0,
        marginRight : 0,
        fontWeight : 'bold',
        padding : 0
        },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    //  paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
    },
});

const mapStateToProps = state => {
    return state.user 
}
export default connect(mapStateToProps)(TrainerLocation);
