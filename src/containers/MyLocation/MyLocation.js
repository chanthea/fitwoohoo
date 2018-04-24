import React, {Component} from 'react';
import { Platform, StyleSheet, View, Text, Dimensions, Image} from 'react-native'
import { HeaderTab } from '../../components/common';
import {Icon,Root, Container, Header, Button, Content, ActionSheet, Text as NBText, Toast } from "native-base";
import { Constants, MapView, Location, Permissions } from 'expo';
import { connect } from 'react-redux';
//import Image from 'react-native-scalable-image';
import axios from '../../config/axios/axiosWithToken';
import Global from '../../globals/Globals';
import { duration } from 'moment';

let BUTTONS = [
        { text: "Option 0", icon: "american-football", iconColor: "#2c8ef4" },
        { text: "Option 1", icon: "analytics", iconColor: "#f42ced" },
        { text: "Option 2", icon: "aperture", iconColor: "#ea943b" },
        { text: "Delete", icon: "trash", iconColor: "#fa213b" },
        { text: "Cancel", icon: "close", iconColor: "#25de5b" }
      ];
const DESTRUCTIVE_INDEX = 3;
const CANCEL_INDEX = 4;

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
class MyLocation extends Component {

    static navigationOptions = {
        tabBarVisible : false,
    }

    constructor(props) {
        super(props);
        this.map;
        this.state = {
           // mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
            locationResult: null,
            location: {coords: { latitude: 37.78825, longitude: -122.4324}},
            region : region,
            markers : [],
            loading : true,
          };
      }
      componentDidMount() {
        this._getLocationAsync();
       
      }

      _handleMapRegionChange = mapRegion => {
        this.setState({ region : mapRegion});
      };
    
      _getLocationAsync = async () => {
       let { status } = await Permissions.askAsync(Permissions.LOCATION);
     // console.log(status);
       if (status !== 'granted') {
        this.setState({
            loading : false
        });
        Toast.show({
            text: "Permission to access location was denied",
            position: "bottom"
          });
       }
       let location = await Location.getCurrentPositionAsync({});
       //console.log(location);
        this._getNearByLocation(location.coords.latitude,location.coords.longitude);
          const region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            ...deltas
          };
          this.setState({ 
             region,
             location
             });
     };
     _getNearByLocation = (lat,lng) => {
        axios.get('/marker/nearby', {
            params : {
                lat : lat,
                lng : lng,
                mile : 100
            }
        }).then(res=>{
            this.setState({
                markers : res.data,
                loading : false
            });
        }).catch(error => {
            Toast.show({
                text: "Server is not responding",
                position: "bottom"
              });
              this.setState({
                markers : res.data,
                loading : false
            });
        })
   }
   _renderMarkers = () => {
   
       let result;
        let marker = this.state.markers.map((val,i)=>{
        result = this._getIconName(val.role);
      return  <MapView.Marker
        key={val.id_user}
        coordinate={{ latitude: parseFloat(val.lat), longitude: parseFloat(val.lng)}}
        title={val.role}
        description={"Name : "+val.name+' '+val.lastname}
        //image = {{uri : Global.MARKER.BASE_URL+result.icon}}
        >
        <Image source={{uri : Global.MARKER.BASE_URL+result.icon}} 
        style={{width : result.size.width, height : result.size.height}}
        />
        </MapView.Marker>
       })
      return  marker;
   }

   _getIconName = (role) => {
       let icon = '';
       let size = {};
    if(role === 'Trainer'){
        icon = 'z-trainer.png';
        size = {
            width : 31,
            height :41
        }
    }else if(role === 'Gym'){
        icon = 'z-gym.png';
        size = {
            width : 30,
            height :41
        }
    }else if(role === 'Nutritionist'){
        icon = 'z-nutrition.png';
        size = {
            width : 30,
            height :35
        }
    }else if(role === 'M-Therapist'){
        icon = 'z-massage.png';
        size = {
            width : 30,
            height :35
        }
    }else if(role ==='Yoga-Inst'){
        icon = 'z-yoga.png';
        size = {
            width : 30,
            height :35
        }
    }else if(role === 'Massage/SPA-Business'){
        icon = 'z-spa.png';
        size = {
            width : 30,
            height :35
        }
    }
    return {
        icon : icon,
        size : size
    };
   }
    render(){
       // console.log(this.state.region);
        return(
            <HeaderTab 
            goBackPressed = {()=>this.props.navigation.goBack()}
            menuPressed = {()=>this.props.navigation.navigate('DrawerOpen')}
            noRight = {true}
            actionButton = {(<Button transparent 
                onPress={() =>
                    ActionSheet.show(
                      {
                        options: BUTTONS,
                        cancelButtonIndex: CANCEL_INDEX,
                        destructiveButtonIndex: DESTRUCTIVE_INDEX,
                        title: "What you wanna do ?"
                      },
                      buttonIndex => {
                        this.setState({ clicked: BUTTONS[buttonIndex] });
                      }
                    )}
            >
                    <Icon  style={{color : '#ffffff'}}  name='md-keypad' />
            </Button>)}
            title='Location'
            >
                <View style={styles.container}>
                    <MapView
                    ref={ref => { this.map = ref }}
                    style={{ alignSelf: 'stretch', height : '100%'}}
                    region ={this.state.region}
                    onRegionChangeComplete={this._handleMapRegionChange}
                    showsUserLocation
                   // showsMyLocationButton
                    //onLayout={() => this.mapRef.fitToCoordinates(this.state.markers, { edgePadding: { top: 50, right: 10, bottom: 10, left: 10 }, animated: false })} >
                    >
                       {this._renderMarkers()}
                    </MapView>
                    <Button 
                    small
                    style={{
                        position : 'absolute', 
                        top : 5, 
                        right : 5,
                        backgroundColor : 'white'
                    }}
                    onPress={()=> this.map.fitToElements(true)}
                    >
                    <Icon style={{
                        color : 'rgba(0,0,0,0.6)',
                        paddingLeft : 5, 
                        paddingRight : 5,
                        marginRight : 0,
                        marginLeft : 0
                        }} name='location-searching' type='MaterialIcons' />
                    <NBText style={{
                        color : 'rgba(0,0,0,0.6)',
                        paddingLeft : 0, 
                        paddingRight : 5,
                        marginRight : 0,
                        marginLeft : 0

                        }} uppercase={false}>Zoom in</NBText>
                    </Button>

                     {this.state.loading === true &&
                    <View 
                    style={{
                        position : 'absolute', 
                        height : 50, 
                        width : '100%', 
                        backgroundColor  :'rgba(0,0,0,0.7)',
                        justifyContent : 'center',
                        bottom : 0,
                        }}>
                        <Text style={{paddingLeft : 10, color : 'rgba(255,255,255,0.9)'}}>Getting Information.....</Text>
                    </View>}
                </View>
            </HeaderTab>
        
           
        );
    }
}
const styles = StyleSheet.create({
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
export default connect(mapStateToProps)(MyLocation);
