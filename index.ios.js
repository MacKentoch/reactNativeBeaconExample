'use strict';

import React, {
  Component
}                             from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ListView,
  DeviceEventEmitter
}                             from 'react-native';
import Beacons                from 'react-native-ibeacon';
import BluetoothState         from 'react-native-bluetooth-state';


class reactNativeBeaconExample extends Component {
  constructor(props) {
    super(props);
    // Create our dataSource which will be displayed in the ListView
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2 }
    );
    this.state = {
      bluetoothState: '',
      // region information
      identifier: 'GemTot for iOS',
      uuid: '6665542b-41a1-5e00-931c-6a82db9b78c1',
      // React Native ListView datasource initialization
      dataSource: ds.cloneWithRows([])
    };
  }

  componentWillMount(){
    //
    // ONLY non component state aware here in componentWillMount
    //
    // Request for authorization while the app is open
    Beacons.requestWhenInUseAuthorization();
    // Define a region which can be identifier + uuid,
    // identifier + uuid + major or identifier + uuid + major + minor
    // (minor and major properties are numbers)
    const region = {
      identifier: this.state.identifier,
      uuid: this.state.uuid
    };
    // Range for beacons inside the region
    Beacons.startRangingBeaconsInRegion(region);
    Beacons.startUpdatingLocation();
  }

  componentDidMount() {
    //
    // component state aware here - attach events
    //
    // Ranging: Listen for beacon changes
    this.beaconsDidRange = DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data.beacons)
        });
      }
    );

    // listen bluetooth state change event
    BluetoothState.subscribe(
      bluetoothState => {
        this.setState({ bluetoothState: bluetoothState });
      }
    );
    BluetoothState.initialize();
  }

  componentWillUnMount(){
    this.beaconsDidRange = null;
  }

  render() {
    const { bluetoothState, dataSource } =  this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.btleConnectionStatus}>
          Bluetooth connection status: { bluetoothState ? bluetoothState  : 'NA' }
        </Text>
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
    backgroundColor: '#F5FCFF',
  },
  btleConnectionStatus: {
    fontSize: 20,
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
