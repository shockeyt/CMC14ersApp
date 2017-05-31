'use strict';
 
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ListView, TouchableHighlight, ScrollView } from 'react-native';

// import ListViewSelect from 'react-native-list-view-select';
// import _ from 'lodash';

import Button from 'react-native-button';

import SearchBar from './SearchBar';
import Footer from './Footer'; 

import { Separator } from 'react-native-form-generator';

import axios from 'axios';

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
});
 
class Peak extends Component {


  constructor(props) {
  super(props);

    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      peaks: [
      { name: 'Longs Peak', 
        elevation: "14,255", 
        rating: "Very difficult", 
        distance: "16 miles", 
        near: "Estes Park",
        picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Fall05-LongsPeakCU_JPG_RSZ_md.jpg/280px-Fall05-LongsPeakCU_JPG_RSZ_md.jpg", 
        directions: "Drive south from Estes Park 10 miles on Colorado 7, then 1 mile west to a 'T' junction",
        route: "The trailhead for Longs is next to the ranger station.  Follow a good, moderately steep trail 6 miles west to the boulder field at about 12,800 feet."
      },
      { name: 'Mount Evans', 
        elevation: "14,264", 
        rating: "Moderate", 
        distance: "9 miles", 
        near: "Georgetown",
        picture: "https://www.codot.gov/travel/scenic-byways/north-central/mount-evans/photo-tour/Mt%20Evans%20-%20Summit%20Lake.JPG/image_preview", 
        directions: "Take I-70 west to Idaho Springs.  Take exit 240 and follow the sings to Mount Evans Road.",
        route: "Start from Summit Lake by hiking northwest around the lake to the start of the established trail up the ridge to Mount Spaulding."
      },
      { name: 'Mount Bierstadt', 
        elevation: "14,060", 
        rating: "Moderate", 
        distance: "6 miles", 
        near: "Georgetown",
        picture: "https://photos.smugmug.com/14ers/Front-Range/Mount-Evans-Bierstadt-14ers/i-BnVhn7r/0/9ca8685f/L/100_0053-L.jpg", 
        directions: "From Georgetown, drive south 11 miles along South Clear Creek Roud to Guanella Pass at 11,699 feet.",
        route: "Hike 1 mile on the boardwalk over the dreaded willows."
      },
      { name: 'Pikes Peak', 
        elevation: "14,110", 
        rating: "Moderate but long", 
        distance: "26 miles", 
        near: "Manitou Springs",
        picture: "https://s3.amazonaws.com/gs-geo-images/1d555f19-3f27-44ae-b24c-84cccdddbbef_l.jpg", 
        directions: "To reach the Barr Trail, drive to Manitou Springs and locate the City Hall.  Proceed west on US-25 about 0.5 miles to Ruxton Ave.",
        route: "From the trailhead the route switchbacks and climbs steeply for 3.5 miles, then rises gradually for the next 2 miles."
      },
      { name: 'Kit Carson Peak', 
        elevation: "14,165", 
        rating: "Very difficult", 
        distance: "6 miles", 
        near: "Westcliffe",
        picture: "https://s3.amazonaws.com/gs-geo-images/1d555f19-3f27-44ae-b24c-84cccdddbbef_l.jpg", 
        directions: "Approaching from the north, go 14 miles on CO 17 and US 285, or approaching from the south, go north 17 miles from Hooper on CO 17.",
        route: "Take the trail around the north side of the lake and continue above the falls."
      },
      { name: 'Humboldt Peak', 
        elevation: "14,064", 
        rating: "Moderate", 
        distance: "4 miles", 
        near: "Westcliffe",
        picture: "https://s3.amazonaws.com/gs-geo-images/1d555f19-3f27-44ae-b24c-84cccdddbbef_l.jpg", 
        directions: "From Westcliffe, drive southeast about 4.5 miles on CO 69 toward Walsenburg.",
        route: "From lower South Colony Lake, hike northwest on the trail up South Colony Creek to the east side."
      },
      { name: 'Crestone Peak', 
        elevation: "14,294", 
        rating: "Very difficult", 
        distance: "6 miles", 
        near: "Westcliffe",
        picture: "https://s3.amazonaws.com/gs-geo-images/1d555f19-3f27-44ae-b24c-84cccdddbbef_l.jpg", 
        directions: "From Westcliffe drive southeast about 4.5 miles on CO 69 toward Walsenburg.",
        route: "Follow the trail west past lower South Colony Lake."
      },
      { name: 'Crestone Needle', 
        elevation: "14,197", 
        rating: "Very difficult", 
        distance: "3 miles", 
        near: "Westcliffe",
        picture: "https://s3.amazonaws.com/gs-geo-images/1d555f19-3f27-44ae-b24c-84cccdddbbef_l.jpg", 
        directions: "From Westcliffe drive southeast about 4.5 miles on CO 69 toward Walsenburg.",
        route: "Follow the trail west past lower South Colony Lake."
      }
      ],
      //peakInfo: {},
      // dataSource: ds.cloneWithRows([
      //   {name: 'Mt. Evans', elevation: '14,100 ft'}
      //   ]),
    };

  }

  componentWillMount() {
    this.setState({dataSource: ds.cloneWithRows(this.state.peaks)});
  }

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
          <Button style={styles.exit} onPress={() => {this.setState({showPeak: false})}}>
          Back
          </Button>
          <ScrollView>
          <View style={styles.peak}>
          
            <Text style={{fontSize: 30, color: 'white', marginBottom: 10}}>{this.state.selectedPeak.name}</Text>
            <Image source={{uri: this.state.selectedPeak.picture}} style={{width: 220, height: 220}}/>
            <Text style={{fontSize: 18, marginTop: 5}}>Elevation: {this.state.selectedPeak.elevation} ft</Text>
            <Text style={{fontSize: 18}}>Rating: {this.state.selectedPeak.rating}</Text>
            <Text style={{fontSize: 18}}>Nearest town: {this.state.selectedPeak.near}</Text>    
            <Text style={{fontSize: 18}}>Round Trip Distance: {this.state.selectedPeak.distance}</Text>
            <Text style={{width: 220, marginTop: 5, backgroundColor: 'white'}}>Directions: {this.state.selectedPeak.directions}</Text>
            <Text style={{width: 220, marginTop: 5, backgroundColor: 'white'}}>Route: {this.state.selectedPeak.route}</Text>
            <Button onPress={() => {this.props.onSavePeak(this.state.selectedPeak)}}>Save</Button>
          
          </View>
          </ScrollView>
        </View>
        ||
      <View style={styles.container}>
        <Text style={styles.description}>
          14er List
        </Text>
        <ScrollView>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data) => <View style={styles.rowContainer}>
            <Image source={{uri: data.picture}} style={{width: 40, height: 40, borderRadius: 20}} />
            <Text style={styles.rowText} onPress={() => {this.rowClick(data)}}>{data.name}</Text>
              <View style={styles.rowElevation}>
                <Text style={styles.textElevation}>{data.elevation} ft</Text>
              </View>
            </View>
          }
          renderSeparator={(data) => <View key={data.elevation} style={styles.separator}/>}
          renderHeader={() => <SearchBar />}
          renderFooter={() => <Footer />}
        />
        </ScrollView>
          
      </View>
      }
      </View>
    );
  }

//   constructor(props) {
//       super(props);

//       var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//       this.state = {
//         data: this._genRow(),
//         dataSource: ds,
//       }
//     }

//     componentDidMount() {
//       this.setState({
//         dataSource: this.state.dataSource.cloneWithRows(this.state.data)
//       });
//     }

//     _genRow(){
//       var datas = [];
//       for (var i = 0; i < 5; i++) {
//         datas.push({
//           row: i,
//           isSelect: false,
//         });
//       }
//       console.log('datas ' + JSON.stringify(datas));
//       return datas;
//     }

//     render() {
//       return (
//         <ListView
//           dataSource = {this.state.dataSource}
//           renderRow = {this._renderRow.bind(this)}
//           renderHeader = {() => <View style={{height: 10, backgroundColor:     '#f5f5f5'}} />}
//           onEndReached = {() => console.log('')}
//           renderSeparator = {(sectionID, rowID) =>
//             <View
//               style={styles.style_separator}
//               key={`${sectionID} - ${rowID}`}
//             />}
//         />
//       );
//     }

//     _renderRow(rowData: string, sectionID: number, rowID: number) {
//       console.log('render row ...');
//       return (
//         <TouchableHighlight onPress={this._onPressRow.bind(this.rowID, rowData)}>
//           <View style={styles.style_row_view}>
//             <Text style={styles.style_text}>{rowData.row}</Text>
//             <Text style={styles.style_text}>{rowData.isSelect ? 'true' : 'false'}                   </Text>
//               </View>
//             </TouchableHighlight>
//           );
//         }

//     _onPressRow(rowID, rowData) {

//       rowData.isSelect = !rowData.isSelect;
//       var dataClone = this.state.data;
//       dataClone[rowID] = rowData;
//       this.setState({
//         data: dataClone
//       });
//       console.log(this.state.data);
//     }
}

// const styles = StyleSheet.create({
//   style_row_view: {
//     flex: 1,
//     flexDirection: 'row',
//     height: 57,
//     backgroundColor: '#FFFFFF',
//   },
//   style_text: {
//     flex: 1,
//     marginLeft: 12,
//     fontSize: 16,
//     color: '#333333',
//     alignSelf: 'center',
//   },

// });

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 100,
//     paddingBottom: 100,
//   },
// });
 
module.exports = Peak;