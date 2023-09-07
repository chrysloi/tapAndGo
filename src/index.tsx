/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  Dimensions,
  Image,
  PermissionsAndroid,
} from 'react-native';
import React from 'react';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import axios from 'axios';
import Card from './assets/Card.png';
import {SvgXml} from 'react-native-svg';
import {Cityscape} from './assets/CityScape';
import Logo from './assets/AC-MOBILITY-LOGO.png';

export const HomeScreen = () => {
  const [cardNumber, setCardNumber] = React.useState<any>(null);
  const [tAmount, setTAmount] = React.useState<any>(0);
  const [hasNfc, setHasNFC] = React.useState(false);

  const readTag = async () => {
    await NfcManager.registerTagEvent();
  };
  console.info(hasNfc);
  console.log(cardNumber, 'cardNumber');

  React.useEffect(() => {
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported();

      setHasNFC(deviceIsSupported);
      if (deviceIsSupported) {
        // const granted = await PermissionsAndroid.request(
        //   PermissionsAndroid.PERMISSIONS.NFC,
        //   {
        //     title: 'NFC Permission',
        //     message: 'App needs access to NFC',
        //     buttonPositive: 'OK',
        //     buttonNegative: 'Cancel',
        //   },
        // );
        // if (granted === PermissionsAndroid.RESULTS.GRANTED)
        await NfcManager.start();
        // else console.log('NFC Permission denied');
      }
    };
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: any) => {
      console.log('tag found', tag);
      setCardNumber(tag.id);
      // setTAmount(checkCard('F1DD627F'));
    });

    checkIsSupported();
    readTag();
    // availableScooters();
    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, []);

  // console.log(tAmount, 'tAmount');

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Image
        source={Logo}
        style={{
          width: width / 4,
          height: height / 22.5,
          marginBottom: 20,
          position: 'absolute',
          top: height / 13,
          right: 20,
        }}
      />
      <View style={styles.body}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            height: height / 18,
            justifyContent: 'space-between',
          }}>
          <Text style={styles.txt}>Kureba Nomero y'ikarita</Text>
          <Text style={styles.txt}>Koza ikarita kuri telefoni inyuma</Text>
        </View>
        <ImageBackground source={Card} style={styles.card}>
          <View style={styles.cardNumber}>
            <Text style={styles.label}>Nomero y'ikarita</Text>
            <Text style={styles.label}>{cardNumber}</Text>
          </View>
        </ImageBackground>
      </View>
      <SvgXml
        xml={Cityscape}
        width={Dimensions.get('window').width}
        height={'10%'}
        fill={'#fff'}
        opacity={0.2}
        style={{position: 'absolute', bottom: 0}}
      />
    </View>
  );
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#20449d',
    justifyContent: 'center',
  },
  body: {
    paddingHorizontal: '5%',
    width: width,
    backgroundColor: '#fff',
    height: height / 1.45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {color: '#000', fontSize: 25, marginVertical: 10, marginTop: -20},
  title: {fontSize: 20, fontWeight: 'bold', marginBottom: 20},
  cardNumber: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 30,
    marginTop: height / 12,
  },
  card: {
    width: width / 1.1,
    height: height / 3.5,
    alignSelf: 'center',
  },
  label: {
    color: '#fff',
    paddingHorizontal: 10,
    fontSize: 25,
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    paddingHorizontal: 10,
    fontSize: 22,
  },
  inputHour: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    width: '65%',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    paddingHorizontal: 10,
    fontSize: 22,
  },
});
