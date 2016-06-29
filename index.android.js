'use strict';

import React, {
  Component
}                     from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ListView,
  View,
  DeviceEventEmitter
}                     from 'react-native';
import Beacons        from 'react-native-beacons-android';


class reactNativeBeaconExample extends Component {
  constructor(props) {
    super(props);
    // Create our dataSource which will be displayed in the ListView
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2 }
    );
    this.state = {
      // region information
      uuidRef: '6665542b-41a1-5e00-931c-6a82db9b78c1',
      // React Native ListView datasource initialization
      dataSource: ds.cloneWithRows([])
    };
  }

  componentWillMount() {
    //
    // ONLY non component state aware here in componentWillMount
    //
    Beacons.detectIBeacons();

    const uuid = this.state.uuidRef;
    Beacons
      .startRangingBeaconsInRegion(
        'REGION1',
        uuid
      )
      .then(
        () => console.log('Beacons ranging started succesfully')
      )
      .catch(
        error => console.log(`Beacons ranging not started, error: ${error}`)
      );
  }

  componentDidMount() {
    //
    // component state aware here - attach events
    //
    // Ranging:
    this.beaconsDidRange = DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data.beacons)
        });
      }
    );
  }

  componentWillUnMount(){
    this.beaconsDidRange = null;
  }

  render() {
    const { dataSource } =  this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>
          All beacons in the area
        </Text>
        <ListView
          dataSource={ dataSource }
          enableEmptySections={ true }
          renderRow={(rowData) => this.renderRow(rowData)}
        />
      </View>
    );
  }

  renderRow(rowData) {
    return (
      <View style={styles.row}>
        <Text style={styles.smallText}>
          UUID: {rowData.uuid ? rowData.uuid  : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          Major: {rowData.major ? rowData.major : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          Minor: {rowData.minor ? rowData.minor : 'NA'}
        </Text>
        <Text>
          RSSI: {rowData.rssi ? rowData.rssi : 'NA'}
        </Text>
        <Text>
          Proximity: {rowData.proximity ? rowData.proximity : 'NA'}
        </Text>
        <Text>
          Distance: {rowData.accuracy ? rowData.accuracy.toFixed(2) : 'NA'}m
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  btleConnectionStatus: {
    // fontSize: 20,
    paddingTop: 20
  },
  headline: {
    fontSize: 20,
    paddingTop: 20
  },
  row: {
    padding: 8,
    paddingBottom: 16
  },
  smallText: {
    fontSize: 11
  }
});

AppRegistry.registerComponent(
  'reactNativeBeaconExample',
  () => reactNativeBeaconExample
);
