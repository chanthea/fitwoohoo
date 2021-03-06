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

let ICONS = {
    trainer : require('../../images/marker-icon/z-trainer.png'),
    gym : require('../../images/marker-icon/z-gym.png'),
    massage : require('../../images/marker-icon/z-massage.png'),
    nutrition : require('../../images/marker-icon/z-nutrition.png'),
    spa : require('../../images/marker-icon/z-spa.png'),
    yoga : require('../../images/marker-icon/z-yoga.png')
}

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
        header : null
    }

    constructor(props) {
        super(props);
        this.map;
        this.state = {
            region : region,
            markers : [],
            loading : true,
            active: true,
            currentMarker : null
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
       if (status !== 'granted') {
        Toast.show({
            text: "Permission to access location was denied",
            position: "bottom"
          });
       }
       let location = await Location.getCurrentPositionAsync({enableHighAccuracy : true});
        this._getNearByLocation(location.coords.latitude,location.coords.longitude);  
     };
     
     _getNearByLocation = (lat,lng) => {
        axios.get('/marker/nearby', {
            params : {
                lat : lat,
                lng : lng,
                mile : 100
            }
        }).then(res=>{
            const region = {
                latitude: lat,
                longitude: lng,
                ...deltas
                };
             this.setState({
                region,
                currentMarker : {
                    coords: { latitude: lat, longitude: lng}
                },
                markers : res.data,
                loading : false
            });
            setTimeout(this._zoomAllLocations, 5000)
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

   
   _renderMarkers = () => {

       let result;
        let marker = this.state.markers.map((val,i)=>{
        result = this._getIconName(val.role);
         return  <MapView.Marker
        key={val.id_user}
        coordinate={{ latitude: parseFloat(val.lat), longitude: parseFloat(val.lng)}}
        title={val.role}
        description={"Name : "+val.name+' '+val.lastname}
        onLoad={() => this.forceUpdate()}
        onLayout={() => this.forceUpdate()}
        image = {result.icon}
        >
        {/* <Image source={result.icon}
        style={{width : result.size.width, height : result.size.height}}
        /> */}
        </MapView.Marker>
       })
   
      return  marker;
   }

   _getIconName = (role) => {
       let icon = '';
       let size = {};
    if(role === 'Trainer'){
        icon = ICONS.trainer
        size = {
            width : 31,
            height :41
        }
    }else if(role === 'Gym'){
        icon = ICONS.gym
        size = {
            width : 30,
            height :41
        }
    }else if(role === 'Nutritionist'){
        icon = ICONS.nutrition
        size = {
            width : 30,
            height :35
        }
    }else if(role === 'M-Therapist'){
        icon = ICONS.massage
        size = {
            width : 30,
            height :35
        }
    }else if(role ==='Yoga-Inst'){
        icon = ICONS.yoga
        size = {
            width : 30,
            height :35
        }
    }else if(role === 'Massage/SPA-Business'){
        icon = ICONS.spa
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

   _reRenderFindLocation = () => {
    Toast.show({
        text: "Searching current location...",
        position: "bottom",
        duration : 2000
      });
    this._getLocationAsync();   
   }

   _zoomAllLocations = () => {
    this.map.fitToElements(true)
    Toast.show({
        text: "Zooming all locations",
        position: "bottom",
        duration : 2000
      });
    
   }

   _reSearchLocation(address, lat, lng) {
       if(lat !== '' && lng !== ''){
           this._getNearByLocation(lat,lng);
       }
    
    }
    render(){
        return(
            <HeaderTab 
            goBackPressed = {()=>this.props.navigation.navigate('NewsWall')}
            menuPressed = {()=>this.props.navigation.navigate('DrawerOpen')}
            noRight = {false}
            title='Location'
            >
                <View style={styles.container}>
                    <MapView
                    ref={ref => { this.map = ref }}
                    style={{ alignSelf: 'stretch', height : '100%'}}
                    region ={this.state.region}
                    onRegionChangeComplete={this._handleMapRegionChange}
                    //showsUserLocation
                   // showsMyLocationButton
                    //onLayout={() => this.mapRef.fitToCoordinates(this.state.markers, { edgePadding: { top: 50, right: 10, bottom: 10, left: 10 }, animated: false })} >
                    >
                       {this._renderMarkers()}
                       {this.state.currentMarker !== null &&
                        <MapView.Marker
                        coordinate={this.state.currentMarker.coords}
                        title={this.props.user.user.name + ' ' + this.props.user.user.lastname}
                       // description={"Name : "+val.name+' '+val.lastname}
                        onLoad={() => this.forceUpdate()}
                        >
                            <Image source={{uri : Global.PHOTO.PROFILE+this.props.user.user.photo}}
                            style={{
                                width : 20, 
                                height : 20, 
                                borderRadius : 20/2, 
                                borderWidth :2, 
                                borderColor : 'rgba(0,0,0,0.3)'
                            }}
                            />
                        </MapView.Marker>
                    }
                    </MapView>
                    <Button 
                    style={styles.button}
                    onPress={this._zoomAllLocations}
                    >
                    <Icon style={styles.buttonIcon} name='location-searching' type='MaterialIcons' />
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
                    {/* <Button disabled style={{ backgroundColor: 'white' }}>
                    <Icon style={{color : Global.COLOR.MAIN}} name="mail" />
                    </Button> */}
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
export default connect(mapStateToProps)(MyLocation);
