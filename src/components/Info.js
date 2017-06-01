'use strict';
 
import React, { Component } from 'react';
import { StyleSheet, View, Text, ListView, Image } from 'react-native';

import axios from 'axios';
import Button from 'react-native-button';

import Icon from 'react-native-vector-icons/FontAwesome';
const listIcon = (<Icon name="arrow-right" size={30} color="#2f62bf" />);
const arrow = (<Icon name="chevron-left" size={50} color="#2f62bf" />);
const angle = (<Icon name="angle-double-right" size={20} color="#234F33" />);
 
const logo = require('../images/CMC_logo_edit2.png');
const hikeone = require('../images/hikepic3.png');
const hiketwo = require('../images/hikepic4.png');
const peakbag = require('../images/peakbagged.png');

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
  },
  links: {
    fontSize: 25,
    marginBottom: 15,
    color: '#234F33'
  }
});

let summits = {}; 
let summitArray = [];
let testArray = ["A", "B", "C"];

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
  }

  renderItem = (text, i) => {
    console.log("am i alive?");
    return (
      <View style={{margin: 20}}>
        <Image style={{width:40, height:40}} source={peakbag} />
        <Text style={{fontSize: 25}}>{text}</Text>
      </View>
    )
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
    console.log("summit array is", summitArray);
    switch (this.state.whichPage) {
      case "peaks":
      return (
        <View style={styles.container}>
          <Text style={{fontSize: 30, color: 'white'}}>My Peaks</Text>
          <Text>{this.props.peakInfo}</Text>
          <View>
            {summitArray.map(this.renderItem)}
          </View>
          <Button onPress={() => {this.setState({whichPage: "home"})}}>{arrow}</Button>
        </View>
        )
      case "essentials":
      return (
        <View style={styles.container}>
          <Text style={{marginBottom: 10, fontSize: 40, color: 'white'}}>Top 10 Essentials</Text>
          <Text style={{marginBottom: 5, fontSize: 14, marginLeft: 20, marginRight: 20}}>A properly equipped hiker will more likely than not have a successful outing. Essential equipment includes: broken-in hiking boots over wool socks on your feet and an extra pair of socks, wool or polypro, in your pack; quick-drying pants or rain pants, not cotton jeans; a lightweight wool or polypro shirt, not cotton; a hooded waterproof jacket or parka; warm head covering and gloves; and plenty of water, plus at least one meal and additional snacks.</Text>
          <Text style={{marginBottom: 5, fontSize: 14, marginLeft: 20, marginRight: 20}}>The CMC has adopte a list, compiled by the Mountaineers of Seattle, of the '10 Essentials' that hikers and mountain climbers should carry in their day packs or backpacks.</Text>
          <View>
            <Text style={{fontSize: 16, color: 'white'}}>{angle} Map</Text>
            <Text style={{fontSize: 16, color: 'white'}}>{angle} Compass</Text>
            <Text style={{fontSize: 16, color: 'white'}}>{angle} Flashlight or headlamp</Text>
            <Text style={{fontSize: 16, color: 'white'}}>{angle} Extra food</Text>
            <Text style={{fontSize: 16, color: 'white'}}>{angle} Sun protection-hat, sunglasses, sunscreen</Text>
            <Text style={{fontSize: 16, color: 'white'}}>{angle} Extra clothing</Text>
            <Text style={{fontSize: 16, color: 'white'}}>{angle} A small first aid kit</Text>
            <Text style={{fontSize: 16, color: 'white'}}>{angle} Pocket knife</Text>
            <Text style={{fontSize: 16, color: 'white'}}>{angle} Matches</Text>
            <Text style={{fontSize: 16, color: 'white'}}>{angle} Fire starter</Text>
          </View>
          <Button onPress={() => {this.setState({whichPage: "home"})}}>{arrow}</Button>
        </View>
        )
      case "club":
      return (
        <View style={styles.container}>
          <Text style={{marginBottom: 10, fontSize: 40, color: 'white'}}>About Us</Text>
          <Text style={{marginLeft: 20, marginRight: 20, fontSize: 16, color: 'white', marginBottom: 5}}>The Colorado Mountain Club is the state’s leading organization dedicated to adventure, recreation, conservation and education. Founded in 1912, the CMC acts as a gateway to the mountains for novices and experts alike, offering an array of year-round activities, events and schools centered on outdoor recreation. The Club comprises 14 regional groups across the state to serve the local needs of its members and partners. To ensure the continued enjoyment of Colorado’s pristine places, the CMC also leads efforts to protect wild and public lands with its conservation and stewardship programs. The Club publishes a quarterly magazine, Trail & Timberline, and operates a press with more than 45 current titles. No other organization in the Intermountain West employs such a strong or broad approach to connecting people with the Rocky Mountain landscape.</Text>
          <Button onPress={() => {this.setState({whichPage: "home"})}}>{arrow}</Button>
        </View>
        )
      case "home":
      return (
        <View style={styles.container}>
          <Image source={hikeone} />
          <Button style={styles.links} onPress={() => {this.peakData()}}>My Peaks</Button>
          <Image source={hiketwo} />
          <Button style={styles.links} onPress={() => {this.essentialsList()}}>Hiking Essentials</Button>
          <Image source={logo} />
          <Button style={styles.links} onPress={() => {this.clubInfo()}}>About Us</Button>
        </View>
        ) 
    }
  }

  componentWillMount() {
    this.setState({whichPage: "home"});
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

  render() {
    console.log(summitArray);
    return (
      <View style={styles.container}>
        {this.renderContent()}
        
      </View>
    );
  }
}
 
module.exports = Info;