'use strict';
 
import React, { Component } from 'react';
import {  StyleSheet, 
          View, 
          Text, 
          Image, 
          ListView, 
          TouchableHighlight, 
          ScrollView,
          TextInput
        } from 'react-native';

// import ListViewSelect from 'react-native-list-view-select';
// import _ from 'lodash';

import Button from 'react-native-button';

import SearchBar from './SearchBar';
import Footer from './Footer'; 
import peaks from './peaklist';

import { Separator } from 'react-native-form-generator';

import axios from 'axios';

import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = (<Icon name="check-circle-o" size={30} color="#2f62bf" />);
const arrow = (<Icon name="chevron-left" size={60} color="#234F33" />);
const compass = (<Icon name="compass" size={15} color="red" />);

const ds = {};

var styles = StyleSheet.create({
  description: {
    fontSize: 40,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    height: 200,
    backgroundColor: '#82C6E2',
    marginTop: 20,
  },
  peak: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  exit: {
    fontSize: 30,
    color: 'white',
    backgroundColor: '#234F33',
    marginTop: 0,
    marginLeft: 30,
    borderRadius: 2
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 12,
    // height: 20,
    flex: 1,
    //backgroundColor: '#234F33',
    alignItems: 'center',
    //color: 'white',
  },
  rowText: {
    marginLeft: 12,
    fontSize: 16,
  },
  rowElevation: {
    // marginLeft: 40,
    left: 40,
    
  },
  textElevation: {
    color: 'white',
    textAlign: 'right',
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  completed: {
    // flex: 2,
  },
  textInput: {
    height: 30,
    borderWidth: 1,
    borderColor: '#8E8E8E',
    marginBottom: 10,
    marginHorizontal: 20,
    backgroundColor: 'white',
  },
});
 
class Peak extends Component {


  constructor(props) {
  super(props);

    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(peaks),

      text: ''
      //peakInfo: {},
      // dataSource: ds.cloneWithRows([
      //   {name: 'Mt. Evans', elevation: '14,100 ft'}
      //   ]),
    };

  }

  // componentWillMount() {
  //   this.setState({dataSource: ds.cloneWithRows(this.state.peaks)});
  // }

  rowClick = (data) => {
    console.log("row clicked");
    console.log(data);
    let onePeak = data;
    //console.log("onePeak is", onePeak);
    this.setState({
      selectedPeak: onePeak,
      showPeak: true});
  }

  // savePeak(data) {
  //   //console.log("save button clicked");
  //   console.log(data.name);
  //   //this.setState({peakInfo: data});
  //   axios.post('http://localhost:3000/peak/', {
  //     name: data.name
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }

  filterSearch(text){
      const newData = peaks.filter(function(item){
          const itemData = item.name.toUpperCase()
          const textData = text.toUpperCase()
          return itemData.indexOf(textData) > -1
      })
      this.setState({
          dataSource: this.state.dataSource.cloneWithRows(newData),
          text: text
      })
  }

  render() {
    //const {elevation, name} = this.state.selectedPeak;
    console.log(this.state.selectedPeak);
    if (this.state.selectedPeak) {
      let picture = this.state.selectedPeak.picture;
      console.log(picture);
    }
    return (
      <View style={styles.container}>
        {this.state.showPeak && 
        <View style={styles.container}> 
        <ScrollView> 
          <Button style={styles.exit} onPress={() => {this.setState({showPeak: false})}}>
          {arrow}
          </Button>
          
          <View style={styles.peak}>
            <View style={styles.completed}>
              
              <Text style={{marginTop:0, fontSize: 18}} onPress={() => {this.props.onSavePeak(this.state.selectedPeak)}}>Completed? {myIcon}</Text>
            </View>
            <Text style={{fontSize: 30, color: 'white', marginBottom: 10, marginTop: 10}}>{this.state.selectedPeak.name}</Text>
            <Image source={{uri: this.state.selectedPeak.picture}} style={{width: 270, height: 270}}/>
            <View>
            <Text style={{fontSize: 18, marginTop: 5}}>Elevation: {this.state.selectedPeak.elevation} ft</Text>
            <Text style={{fontSize: 18}}>Rating: {this.state.selectedPeak.rating}</Text>
            <Text style={{fontSize: 18}}>Nearest town: {this.state.selectedPeak.near}</Text>    
            <Text style={{fontSize: 18}}>Round Trip Distance: {this.state.selectedPeak.distance}</Text>
            </View>
            <Text style={{padding: 5, width: 270, marginTop: 5, backgroundColor: 'white'}}>Directions: {this.state.selectedPeak.directions}</Text>
            <Text style={{padding: 5, width: 270, marginTop: 5, backgroundColor: 'white'}}>Route: {this.state.selectedPeak.route}</Text>
            
          
          </View>
          </ScrollView>
        </View>
        ||
      <View style={styles.container}>
        <Text style={styles.description}>
          14er List
        </Text>
        <TextInput 
            style={styles.textInput}
            onChangeText={(text) => this.filterSearch(text)}
            value={this.state.text}
            placeholder=" Search..."
            placeholderTextColor="#82c6e2"
        />
        <ScrollView>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(data) => <View style={styles.rowContainer}>
            <Image source={{uri: data.picture}} style={{width: 40, height: 40, borderRadius: 20}} />
            <Text style={styles.rowText} onPress={() => {this.rowClick(data)}}>{data.name}</Text>
              <View style={styles.rowElevation}>
                <Text style={styles.textElevation}>{compass} {data.elevation} ft</Text>
              </View>
            </View>
          }
          renderSeparator={(data) => <View key={data.elevation} style={styles.separator}/>}
          //renderHeader={() => <SearchBar />}
          //renderFooter={() => <Footer />}
        />
        </ScrollView>
          
      </View>
      }
      </View>
    );
  }

}


 
module.exports = Peak;