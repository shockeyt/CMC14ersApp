'use strict';
 
import React, { Component } from 'react';
import { StyleSheet, View, Text, ListView } from 'react-native';

import axios from 'axios';
import Button from 'react-native-button';
 
var styles = StyleSheet.create({
  description: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#82C6E2',
  }
});

let summits = {}; 
let summitArray = [];

class Info extends Component {
  constructor(props){
      super(props);
      this.state = {
        peakData:{}
      }
    }
  // getPeaks () {
  //       axios.get('http://localhost:3000/peak/')
  //       .then(function (response) {
  //         console.log(response);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  // }
  componentDidMount() {
    console.log(this.props.peakInfo);
      // axios.get('http://localhost:3000/peak/')
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      // });
  }

  
  peakData() {
    console.log("my peaks pushed");
    this.setState({whichPage: "peaks"});
    axios.get('http://localhost:3000/peak/')
      .then(function (response) {
        console.log(response.data);
        summits = response.data;
        summits.forEach(function(peaks) {
          summitArray.push(peaks.name);
        }); 
        console.log(summitArray);

      })
      .catch(function (error) {
        console.log(error);
    });

  }

  essentialsList() {
    console.log("Essentials clicked");
    this.setState({whichPage: "essentials"});
  }
  clubInfo() {
    console.log("Club info clicked");
    this.setState({whichPage: "club"});
  }
  // homePage() {
  //   this.setState({whichPage: "home"});
  // }

  renderContent(){
    switch (this.state.whichPage) {
      case "peaks":
      return (
        <View style={styles.container}>
          <Text>My Peaks List</Text>
          <Text>{this.props.peakInfo}</Text>
          <Button onPress={() => {this.setState({whichPage: "home"})}}>Back</Button>
        </View>
        )
      case "essentials":
      return (
        <View style={styles.container}>
          <Text>Top 10 Essentials List</Text>
          <Text>{this.props.peakInfo}</Text>
          <Button onPress={() => {this.setState({whichPage: "home"})}}>Back</Button>
        </View>
        )
      case "club":
      return (
        <View style={styles.container}>
          <Text>Club information</Text>
          <Text>{this.props.peakInfo}</Text>
          <Button onPress={() => {this.setState({whichPage: "home"})}}>Back</Button>
        </View>
        )
      case "home":
      return (
        <View style={styles.container}>
          <Text style={styles.description}>
            Info page!
          </Text>
          <Button onPress={() => {this.peakData()}}>My Peaks</Button>
          <Button onPress={() => {this.essentialsList()}}>Hiking Essentials</Button>
          <Button onPress={() => {this.clubInfo()}}>About Us</Button>
        </View>
        ) 
    }
  }

  componentWillMount() {
    this.setState({whichPage: "home"});
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderContent()}
        
      </View>
    );
  }
}
 
module.exports = Info;