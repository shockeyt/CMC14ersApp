'use strict';
 
import React, { Component } from 'react';
import { MapView, StyleSheet, View, Text, Image, ScrollView } from 'react-native';
//import MapViewPage from './mapView'

const viewmap = require('../images/14ermappic.jpg'); 


var styles = StyleSheet.create({
  description: {
    // marginTop: 10,
    fontSize: 25,
    textAlign: 'center',
    color: '#FFFFFF',
    backgroundColor: '#234F33',
  },
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#82C6E2',
  },
  image: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
 
class COmap extends Component {
  render() {
    return (
      <View style={styles.container}>

        <ScrollView> 
        <Image style={styles.image} source={viewmap} />
        </ScrollView>
      </View>
    );
  }
}
 
module.exports = COmap;