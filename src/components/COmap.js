'use strict';
 
import React, { Component } from 'react';
import { MapView, StyleSheet, View, Text } from 'react-native';
//import MapViewPage from './mapView'
 


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
});
 
class COmap extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Maps Page!
        </Text> 
      </View>
    );
  }
}
 
module.exports = COmap;