import React, {Children, Component} from "react";
import {Text, Button, View, TouchableOpacity, StyleSheet, Platform, SafeAreaView, Image, Linking} from "react-native"; 
import {RFValue} from 'react-native-responsive-fontsize';
import DropDownPicker from "react-native-dropdown-picker";
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Font from 'expo-font';
import firebase from 'firebase';
import AppLoading from 'expo-app-loading';

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class StateMap extends Component{
    constructor(props){
    super(props);
    this.state = {
      dropdownHeight: 150,
      fontsLoaded: false,
      states: '',
      previewState: '',
      latitude: 37.0902,
      longitude: -95.7129,
      name: 'US',
      flag: 'https://cdn.britannica.com/81/4481-004-660915ED/flag-Stars-and-Stripes-July-4-1912.jpg',
      link: '',
    }
    }
    async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
    }
    componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
    }
    fetchUser = () => {
        let theme;
        firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .on("value", snapshot => {
            theme = snapshot.val().current_theme;
            this.setState({ light_theme: theme === "light" });
          });
    }
    getLocation = () => {
      const {previewState} = this.state
        var path = '/US/' + previewState + '/coordinates/'
        var coordinate = [];
        var latitude;
        var longitude;
        firebase
          .database()
          .ref(path)
          .on(
            "value",
            snapshot => {
              if (snapshot.val()) {
                coordinate = snapshot.val();
                latitude = parseInt(coordinate.latitude);
                longitude = parseInt(coordinate.longitude);
              }
              this.setState({latitude: latitude, longitude: longitude});
              //this.props.setUpdateToFalse();
            },
            function (errorObject) {
              console.log("The read failed: " + errorObject.code);
            }
          );
    }
    fetchName = () => {
      const {previewState} = this.state
      var path = '/US/' + previewState + '/name/'
      var name = '';
      firebase
        .database()
        .ref(path)
        .on(
          "value",
          snapshot => {
            if (snapshot.val()) {
              name = snapshot.val();
            }
            this.setState({name: name});
            //this.props.setUpdateToFalse();
          },
          function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          }
        );
    }
    fetchFlag = () => {
      const {previewState} = this.state
      var path = '/US/' + previewState + '/flags/'
      var flag = '';
      firebase
        .database()
        .ref(path)
        .on(
          "value",
          snapshot => {
            if (snapshot.val()) {
              flag = snapshot.val();
            }
            this.setState({flag: flag});
            //this.props.setUpdateToFalse();
          },
          function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          }
        );
    }
    fetchLink = async () => {
      const {previewState} = this.state
      var path = '/US/' + previewState + '/links/'
      var link = '';
      firebase
        .database()
        .ref(path)
        .on(
          "value",
          snapshot => {
            if (snapshot.val()) {
              link = snapshot.val();
            }
            this.setState({link: link});
            //this.props.setUpdateToFalse();
          },
          function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          }
        );
        if (await Linking.canOpenURL(this.state.link)) {
          Linking.openURL(this.state.link);
      }
    }
    render(){
      if(!this.state.fontsLoaded){
        return <AppLoading />
      } else {
        return(
          <View style = {
            this.state.light_theme ? styles.containerLight : styles.container
          }>
             <SafeAreaView style = {styles.droidSafeArea}>
               <View style = {{justifyContent: 'center', alignItems: 'center'}}>
               <Ionicons name="arrow-forward"
                    style={{
                      position: 'absolute',
                      right: 5,
                      top: 5
                    }} />
                 <Text style = {this.state.light_theme ? styles.titleLight : styles.title}> State App</Text>
               </View>
            <View style={{height: RFValue(this.state.dropdownHeight),flexDirection: 'row' }}>
            <DropDownPicker containerStyle = {{height: 40, width: 300}}
              items={[
                { label: "Alabama", value: "state_1" },
                { label: "Alaska", value: "state_2" },
                { label: "Arizona", value: "state_3" },
                { label: "Arkansas", value: "state_4" },

                { label: "California", value: "state_5" },
                { label: "Colorado", value: "state_6" },
                { label: "Connecticut", value: "state_7" },

                { label: "Delaware", value: "state_8" },
                { label: "Florida", value: "state_9" },
                { label: "Georgia", value: "state_10" },
                { label: "Hawaii", value: "state_11" },

                { label: "Idaho", value: "state_12" },
                { label: "Illinois", value: "state_13" },
                { label: "Indiana", value: "state_14" },
                { label: "Iowa", value: "state_15" },

                { label: "Kansas", value: "state_16" },
                { label: "Kentucky", value: "state_17" },
                { label: "Louisiana", value: "state_18" },

                { label: "Maine", value: "state_19" },
                { label: "Maryland", value: "state_20" },
                { label: "Massachusetts", value: "state_21" },
                { label: "Michigan", value: "state_22" },
                { label: "Minnesota", value: "state_23" },
                { label: "Mississippi", value: "state_24" },
                { label: "Missouri", value: "state_25" },
                { label: "Montana", value: "state_26" },

                { label: "Nebraska", value: "state_27" },
                { label: "Nevada", value: "state_28" },
                { label: "New Hampshire", value: "state_29" },
                { label: "New Jersey", value: "state_30" },
                { label: "New Mexico", value: "state_31" },
                { label: "New York", value: "state_32" },
                { label: "North Carolina", value: "state_33" },
                { label: "North Dakota", value: "state_34" },

                { label: "Ohio", value: "state_35" },
                { label: "Oklahoma", value: "state_36" },
                { label: "Oregon", value: "state_37" },

                { label: "Pennsylvania", value: "state_38" },
                { label: "Rhode Island", value: "state_39" },
                { label: "South Carolina", value: "state_40" },
                { label: "South Dakota", value: "state_41" },

                { label: "Tennessee", value: "state_42" },
                { label: "Texas", value: "state_43" },
                { label: "Utah", value: "state_44" },
                { label: "Vermont", value: "state_45" },
                { label: "Virginia", value: "state_46" },

                { label: "Washington", value: "state_47" },
                { label: "West Virginia", value: "state_48" },
                { label: "Wisconsin", value: "state_49" },
                { label: "Wyoming", value: "state_50" },
              ]}
              onOpen={() => {
                this.setState({ dropdownHeight: 170 });
              }}
              onClose={() => {
                this.setState({ dropdownHeight: 40 });
              }}
              style={{ 
                backgroundColor: "transparent" 
              }}
              itemStyle={{
                justifyContent: "flex-start"
              }}
              dropDownStyle={{
                backgroundColor: this.state.light_theme ? "#eee" : "#2f345d"
              }}
              labelStyle={
                this.state.light_theme
                  ? styles.dropdownLabelLight
                  : styles.dropdownLabel
              }
              arrowStyle={
                this.state.light_theme
                  ? styles.dropdownLabelLight
                  : styles.dropdownLabel
              }
              onChangeItem={item =>
                this.setState({
                  previewState: item.value
                })
              }
            />
            <View>
                <TouchableOpacity style = {this.state.light_theme ? styles.borderLight : styles.border}
                onPress={() => {
                    this.getLocation()
                    this.fetchName()
                    this.fetchFlag()
                    //this.fetchLink()
                }}>
                    <Text style = {this.state.light_theme ? styles.submitLight : styles.submit}> Go </Text>
                </TouchableOpacity>
            </View>
          </View>

          <View>
          <MapView style = {styles.map}
            provider={PROVIDER_GOOGLE}
            region = {{
              latitude: 7.0902,
              longitude: -115.7129,
              latitudeDelta: 100,
              longitudeDelta: 100
            }}> 
          <Marker 
            coordinate={{ latitude: this.state.latitude,longitude: this.state.longitude}}>
              <Callout style = {styles.callout} onPress={this.fetchLink}> 
                <Image style = {styles.image}
                source = {{uri: this.state.flag}}
                />
                <Text>{this.state.name}</Text>
              </Callout>
          </Marker>

            </MapView>
            </View>

          </SafeAreaView>
          </View>
        )
    }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white"
  },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    title: {
      marginTop: RFValue(20),
      alignItems: "center",
      justifyContent: "center",
      color: 'white',
      fontSize: RFValue(50),
      fontFamily: "Bubblegum-Sans"
    },
    titleLight: {
      marginTop: RFValue(20),
      alignItems: "center",
      justifyContent: "center",
      color: 'black',
      fontSize: RFValue(50),
      fontFamily: "Bubblegum-Sans"
    },
    dropdownLabel: {
      color: "white",
      fontFamily: "Bubblegum-Sans"
    },
    dropdownLabelLight: {
      color: "black",
      fontFamily: "Bubblegum-Sans"
    },
    map: { 
      width: "100%", 
      height: "100%",
    },
    submit: {
      alignItems: "center",
      justifyContent: "center",
      color: 'white',
      fontSize: RFValue(18),
      fontFamily: "Bubblegum-Sans",
      margin: 7.5
    },
    submitLight: {
      alignItems: "center",
      justifyContent: "center",
      color: 'black',
      fontSize: RFValue(18),
      fontFamily: "Bubblegum-Sans",
      margin: 7.5
    },
    flagContainer: {
      flex: 1
    },
    flag: {
      width: 200,
      height: 200,
    },
    image: {
      width: RFValue(100),
      height: RFValue(50),
    },
    callout: {
      justifyContent: "center",
      alignItems: 'center'
    },
    border: {
      borderWidth: 1,
      borderColor: 'white',
      marginLeft: 10
    },
    borderLight: {
      borderWidth: 1,
      borderColor: 'black',
      marginLeft: 10
    },
  });
