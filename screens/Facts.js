import React, {Component} from "react";
import {Text, View, TouchableOpacity, StyleSheet, Platform, SafeAreaView} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from 'expo-font';
import firebase from 'firebase';

let customFonts = {
    "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
  };

export default class Facts extends Component{

  constructor(props){
    super(props);
    this.state = {
      dropdownHeight: 150,
      fontsLoaded: false,
      facts: '',
      previewFact: '',
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
      };

      findFact = () => {
        const {previewFact} = this.state
        var path = '/facts/' + previewFact
        var facts = '';
        firebase
          .database()
          .ref(path)
          .on(
            "value",
            snapshot => {
              if (snapshot.val()) {
                facts = snapshot.val();
              }
              this.setState({facts: facts});
              //this.props.setUpdateToFalse();
            },
            function (errorObject) {
              console.log("The read failed: " + errorObject.code);
            }
          );
      };
    
    render(){
        return(
          <View  style={
            this.state.light_theme ? styles.containerLight : styles.container
          }>
            <SafeAreaView style = {styles.droidSafeArea}>
               <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                 <Text style = {this.state.light_theme ? styles.titleLight : styles.title}> State App</Text>
               </View>
            <View style={{ height: RFValue(this.state.dropdownHeight),flexDirection: 'row' }}>
            <DropDownPicker containerStyle = {{height: 40, width: 300}}
              items={[
                { label: "Alabama", value: "stateFact_1" },
                { label: "Alaska", value: "stateFact_2" },
                { label: "Arizona", value: "stateFact_3" },
                { label: "Arkansas", value: "stateFact_4" },

                { label: "California", value: "stateFact_5" },
                { label: "Colorado", value: "stateFact_6" },
                { label: "Connecticut", value: "stateFact_7" },

                { label: "Delaware", value: "stateFact_8" },
                { label: "Florida", value: "stateFact_9" },
                { label: "Georgia", value: "stateFact_10" },
                { label: "Hawaii", value: "stateFact_11" },

                { label: "Idaho", value: "stateFact_12" },
                { label: "Illinois", value: "stateFact_13" },
                { label: "Indiana", value: "stateFact_14" },
                { label: "Iowa", value: "stateFact_15" },

                { label: "Kansas", value: "stateFact_16" },
                { label: "Kentucky", value: "stateFact_17" },
                { label: "Louisiana", value: "stateFact_18" },

                { label: "Maine", value: "stateFact_19" },
                { label: "Maryland", value: "stateFact_20" },
                { label: "Massachusetts", value: "stateFact_21" },
                { label: "Michigan", value: "stateFact_22" },
                { label: "Minnesota", value: "stateFact_23" },
                { label: "Mississippi", value: "stateFact_24" },
                { label: "Missouri", value: "stateFact_25" },
                { label: "Montana", value: "stateFact_26" },

                { label: "Nebraska", value: "stateFact_27" },
                { label: "Nevada", value: "stateFact_28" },
                { label: "New Hampshire", value: "stateFact_29" },
                { label: "New Jersey", value: "stateFact_30" },
                { label: "New Mexico", value: "stateFact_31" },
                { label: "New York", value: "stateFact_32" },
                { label: "North Carolina", value: "stateFact_33" },
                { label: "North Dakota", value: "stateFact_34" },

                { label: "Ohio", value: "stateFact_35" },
                { label: "Oklahoma", value: "stateFact_36" },
                { label: "Oregon", value: "stateFact_37" },

                { label: "Pennsylvania", value: "stateFact_38" },
                { label: "Rhode Island", value: "stateFact_39" },
                { label: "South Carolina", value: "stateFact_40" },
                { label: "South Dakota", value: "stateFact_41" },

                { label: "Tennessee", value: "stateFact_42" },
                { label: "Texas", value: "stateFact_43" },
                { label: "Utah", value: "stateFact_44" },
                { label: "Vermont", value: "stateFact_45" },
                { label: "Virginia", value: "stateFact_46" },

                { label: "Washington", value: "stateFact_47" },
                { label: "West Virginia", value: "stateFact_48" },
                { label: "Wisconsin", value: "stateFact_49" },
                { label: "Wyoming", value: "stateFact_50" },
              ]}
              onOpen={() => {
                this.setState({ dropdownHeight: 170 });
              }}
              onClose={() => {
                this.setState({ dropdownHeight: 40 });
              }}
              style={{ backgroundColor: "transparent" }}
              itemStyle={{
                justifyContent: "flex-start",
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
                  previewFact: item.value
                })
              }
            />
            <View>
                <TouchableOpacity style = {this.state.light_theme ? styles.borderLight : styles.border}
                onPress={() =>
                    this.findFact()
                }>
                    <Text style = {this.state.light_theme ? styles.submitLight : styles.submit}> Go </Text>
                </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style = {this.state.light_theme ? styles.factLight : styles.fact}> {this.state.facts? 'An interesting fact about this state is that '+ this.state.facts : 'Select a state'} </Text>
          </View>
          </SafeAreaView>
          </View>
        )
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
    appTitle: {
      flex: 0.07,
      flexDirection: "row"
    },
    appIcon: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    iconImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain"
    },
    appTitleTextContainer: {
      flex: 0.7,
      justifyContent: "center"
    },
    appTitleText: {
      color: "white",
      fontSize: RFValue(28),
      fontFamily: "Bubblegum-Sans"
    },
    appTitleTextLight: {
      color: "black",
      fontSize: RFValue(28),
      fontFamily: "Bubblegum-Sans"
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
    fieldsContainer: {
      flex: 0.85
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
    fact: {
      marginTop: RFValue(20),
      alignItems: "center",
      justifyContent: "center",
      color: 'white',
      fontSize: RFValue(30),
      fontFamily: "Bubblegum-Sans"
    },
    factLight: {
      marginTop: RFValue(20),
      alignItems: "center",
      justifyContent: "center",
      color: 'black',
      fontSize: RFValue(30),
      fontFamily: "Bubblegum-Sans"
    },
    previewImage: {
      width: "93%",
      height: RFValue(250),
      alignSelf: "center",
      borderRadius: RFValue(10),
      marginVertical: RFValue(10),
      resizeMode: "contain"
    },
    inputFont: {
      height: RFValue(40),
      borderColor: "white",
      borderWidth: RFValue(1),
      borderRadius: RFValue(10),
      paddingLeft: RFValue(10),
      color: "white",
      fontFamily: "Bubblegum-Sans"
    },
    inputFontLight: {
      height: RFValue(40),
      borderColor: "black",
      borderWidth: RFValue(1),
      borderRadius: RFValue(10),
      paddingLeft: RFValue(10),
      color: "black",
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
    inputFontExtra: {
      marginTop: RFValue(15)
    },
    inputTextBig: {
      textAlignVertical: "top",
      padding: RFValue(5)
    },
    submitButton: {
      marginTop: RFValue(20),
      alignItems: "center",
      justifyContent: "center"
    },
  });
  