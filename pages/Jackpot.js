import {  
    StyleSheet, 
    StatusBar, 
    ScrollView, 
    View, 
    Text,
    ActivityIndicator, 
    FlatList,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { store } from '../firebase-config';

const Jackpot = () => {
  const [Tips,setTips] = useState([]);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const ref = store.collection('grandJackpot').orderBy('TeamID', 'asc');
    ref.onSnapshot((query) => {
        const objs = [];
        query.forEach((doc) => {
          objs.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setTips(objs);
        setAnimate(false);
      });
  }, [])

  const Item = ({item}) => {
    return(
      <View key={item.TeamID} style={styles.jackpotHeading}>
        <View><Text style={styles.jackpotHID}>{item.TeamID}</Text></View>
        <View><Text style={styles.jackpotHTime}>{item.Time}</Text></View>
        <View><Text style={styles.jackpotHDate}>{item.Date}</Text></View>
        <View><Text style={styles.jackpotHGame}>{item.Game}</Text></View>
        <View><Text style={styles.jackpotHTip}>{item.Tip}</Text></View>
      </View>
    )
  }
  return (
    <ScrollView horizontal={false}>
    <StatusBar backgroundColor="#79A7D3" barStyle="light-content" />
    <View>
        <View style={styles.titleBar}>
            <Text style={styles.titleName}>OFISHO TIPS</Text>
            <Text style={styles.titleText}>Daily Free Tips and Jackpot Tips.</Text>
        </View>
      
        <View>
            <Text style={styles.todayT}>
              Betika Grand Jackpot Prediction
            </Text>
        </View>    
        <View style={styles.jackpotHeading}>
          <Text style={styles.jackpotID}>ID</Text>
          <Text style={styles.jackpotTime}>Time</Text>
          <Text style={styles.jackpotDate}>Date</Text>
          <Text style={styles.jackpotGame}>Game</Text>
          <Text style={styles.jackpotTip}>Tip</Text>
        </View>
        <ScrollView horizontal={true} style={{flex: 1}}>
          <FlatList
          data={Tips}
          renderItem={Item}
          keyExtractor={(item) => item.id}
           />
        </ScrollView>
        <View style={styles.activityI} >
            <ActivityIndicator animating={animate} size="large" />      
        </View>
    </View>
    </ScrollView>
  )
}

export default Jackpot

const styles = StyleSheet.create({
  titleBar: {
    flex: 1,
    padding: 20,
    backgroundColor: '#00008b'
  },
  titleName: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold'
  },
  titleText: {
    color: '#fff',
    fontSize: 12,
    paddingLeft: 130
  },
  jackpotHeading: {
    width:'100%',
    flex: 1,
    flexDirection: 'row',
  },
  jackpotID: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 20,
    width: 40,
    marginLeft: 4
  },
  jackpotTime: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 20,
    width: 70,
    marginLeft: 4
  },
  jackpotDate: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 20,
    width: 100,
    marginLeft: 4
  },
  jackpotGame: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 20,
    width: 120,
    marginLeft: 4
  },
  jackpotTip: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 20,
    width: 70,
    marginLeft: 4
  },
  jackpotHID: {
    padding: 10,
    width: 40,
    marginLeft: 4
  },
  jackpotHTime: {
    padding: 10,
    width: 50,
    marginLeft: 4
  },
  jackpotHDate: {
    padding: 10,
    width: 85,
    marginLeft: 4
  },
  jackpotHGame: {
    padding: 10,
    width: 150,
    marginLeft: 4
  },
  jackpotHTip: {
    padding: 10,
    width: 80,
    marginLeft: 4
  },
  todayT: {
    padding: 5,
    fontSize: 23,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  activityI: {
    position: 'absolute',
    top: 110,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
});