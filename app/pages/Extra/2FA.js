import React, {useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View,} from 'react-native';
//import {Body, Button, Header, Text, Title} from 'native-base';
import axios from 'axios';
import Constants from './Constants';
//import RNSecureKeyStore from 'react-native-secure-key-store';
import * as SecureStore from 'expo-secure-store';

import {RSA} from 'react-native-rsa-native';

import {Body, Button, Container, Footer, FooterTab, Header, Icon, Left, Right, Text, Title,} from 'native-base';
import getDeviceInfo from '../Device/Device';

export default function TwoFA (props){
  const [loading,setLoading]=useState(false)


  const userClickedYes=()=> {
    this.sendRequest('YES');
  }

  const userClickedNo=()=> {
    this.sendRequest('NO');
  }

  //style = {{ opacity : this.props.loading ? 1 : 0 }}


  const getSignature=async()=>{
    const privateKey=await SecureStore.getItemAsync("PRIVATE_KEY")
    return await RSA.sign(this.props.route.params?.challenge, privateKey)
  }


  const  sendRequest= async (action)=> {

    await this.setState({loading: true});
    let deviceInfo = await getDeviceInfo();
    const signature=await this.getSignature()
    //RNSecureKeyStore.get("privateKey").then(privateKey=>{
    //RSA.sign(this.props.navigation.state.params?.challenge,privateKey).then(signature=>{
    SecureStore.getItemAsync('deviceId')
      .then((deviceId) => {
        axios({
          method: 'post',
          url: Constants.hostname + '/api/v1/remote/auth/u2f',
          data: {
            answer: action,
            deviceId: deviceId,
            deviceInfo: JSON.stringify(deviceInfo),
            signature: signature,
            challenge: this.props.route.params?.challenge,
          },
        })
          .then((value) => {
            //console.log(value)
            this.setState({loading: false});
            this.props.navigation.navigate('Home');
          })
          .catch((reason) => {
            this.setState({loading: false});
            console.log(reason)
            alert(reason);
            this.props.navigation.navigate('Home');
          });
      })
      .catch((e) => {
        console.log(e);
        this.setState({loading: false});
        this.props.navigation.navigate('Home'); //if no device id set, go to home page
      });
    //})
    //})
  }


    return (
      <Container>
        <Header style={styles.navBar}>
          <Left>
            <Button transparent>
              <Icon
                name={'arrow-back'}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </Button>
          </Left>

          <Body>
            <Title style={styles.pageHeader}>Authorize</Title>
          </Body>
          <Right />
        </Header>

        <ScrollView style={{flex: 0}}>
          <View style={styles.inputs}>
            <Icon type="Ionicons" name="ios-globe" style={{fontSize: 30}} />
            <Text style={{fontSize: 50, fontWeight: 'bold'}}>
              {this.props.route.params?.orgName}
            </Text>
            {/*<Text style={{fontSize: 35, fontWeight: 'bold', color: 'teal'}}>Seknox</Text>*/}

            <View style={styles.inputContainer}>
              <View style={styles.contentMargin}>
                <Icon
                  type="MaterialCommunityIcons"
                  name="security"
                  style={{fontSize: 30}}
                />
                <Text style={styles.text2}>
                  {this.props.route.params?.appName}
                </Text>
                {/*<Text style={styles.text2}>ssh-prod01</Text>*/}
              </View>

              <View style={styles.contentMargin}>
                <Icon type="Ionicons" name="ios-pin" style={{fontSize: 35}} />
                <Text style={styles.text2}>
                  {this.props.route.params?.ipAddr}
                </Text>
                {/*<Text style={styles.text2}>192.168.0.100</Text>*/}
              </View>

              <View style={styles.contentMargin}>
                <Icon type="Ionicons" name="ios-time" style={{fontSize: 30}} />
                <Text style={styles.text2}>
                  {this.props.route.params?.time}
                </Text>
                {/*<Text style={styles.text2}>2835792384579245</Text>*/}
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button large success full onPress={this.userClickedYes}>
                  <Text>Authorize</Text>
                </Button>
              </View>
              <View style={styles.button}>
                <Button large danger full onPress={this.userClickedNo}>
                  <Text>Cancel</Text>
                </Button>
              </View>
            </View>
            {this.state.loading ? (
              <ActivityIndicator size="large" animating={true} color={"blue"}/>
            ) : null}
            <Text style={styles.sub}>
              (If this was not initiated by you, contact your admin)
            </Text>
          </View>
        </ScrollView>

        <Footer>
          <FooterTab style={styles.navBar}>
            <Button full>
              <Text>Proudly A Product Of SEKNOX</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );

}

const styles = StyleSheet.create({
  navBar: {
    //           backgroundColor:'#1582dc',
  },
  headerCard: {
    marginTop: 70,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 20,
    //backgroundColor:'#ffae70', //'rgba(1,1,35,1)',
    //alignItems: 'flex-start',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'flex-end',
    //   borderRadius: 5,
    //  borderColor: 'teal',
    // borderWidth : 1,
  },

  button: {
    width: 200,
    height: 100,
    //  backgroundColor: 'blue',
    // borderRadius: 2,
    // padding: 10,
    //alignSelf:'flex-start',
  },

  textContainer: {
    //flex: 1,
    //backgroundColor:'#ffae70', //'rgba(1,1,35,1)',
    //alignItems: 'flex-start',
    //justifyContent: 'space-around',
    //flexDirection: 'column',
    //alignItems:'flex-end',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    //             borderColor: 'teal',
    borderWidth: 1,
  },
  pageHeader: {
    //  marginLeft: '30%',
    fontSize: 25,
    color:'white'
  },
  text1: {
    fontSize: 20,
    //                color: 'teal',
  },
  sub: {
    fontSize: 15,
    //               color: '#696969',
    //   color: 'teal',
  },
  text2: {
    fontSize: 20,
    //              color: '#696969',
    //  fontWeight: 'bold',
    //   textAlign: 'justify',
  },
  viewcontainer: {
    // backgroundColor: 'rgba(1,1,35,1)',
    alignItems: 'center',
    justifyContent: 'center',
    //   flex: 5,
    // height: '70%',
  },

  inputs: {
    //  backgroundColor:'rgba(1,1,35,1)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  contentMargin: {
    //  backgroundColor:'rgba(1,1,35,1)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },

  inputContainer: {
    paddingTop: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    //margin: 5
  },
  text: {
    borderRadius: 5,
    //                 borderColor: 'teal',
    borderWidth: 1,
    width: 250,
    height: 50,
    padding: 10,
    margin: 5,
    //            color: 'teal',
    fontSize: 15,
  },
});
