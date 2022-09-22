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

const Dailytips = () => {
  const [Tips,setTips] = useState([]);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const ref = store.collection('dailyTips').orderBy('Time', 'asc');
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

  // console.log(Tips)
  const [date, setDate] = useState(null);
  useEffect(() => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    setDate(date);
  }, []);

  const Item = ({item}) => {
    return(
      <View key={item.Teams} style={styles.homeHeading}>
        <View><Text style={styles.homeOddsTime}>{item.Time}</Text></View>
        <View><Text style={styles.homeOddsTeams}>{item.Teams}</Text></View>
        <View><Text style={styles.homeOddsTip}>{item.Tip}</Text></View>
        <View><Text style={styles.homeOddsOdds}>{item.Odds}</Text></View>
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
                  Predictions for today 
                  <Text style={styles.todayD}>  {date}</Text>
                </Text>
            </View>
            <View style={styles.homeHeading}>
              <Text style={styles.homeHeadTime}>Time</Text>
              <Text style={styles.homeHeadTeams}>Teams</Text>
              <Text style={styles.homeHeadTip}>Tip</Text>
              <Text style={styles.homeHeadOdds}>Odds</Text>
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

export default Dailytips

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
  homePage: {
    padding: 2,
  },
  homeHeading: {
    width:'100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  homeHeadTime: {
    fontWeight: 'bold',
    fontSize: 20,
    width: 60,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginLeft: 4
  },
  homeHeadTeams: {
    fontWeight: 'bold',
    fontSize: 20,
    width: 120,
    paddingLeft: 6,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginLeft: 4
  },
  homeHeadTip: {
    fontWeight: 'bold',
    fontSize: 20,
    width: 100,
    paddingLeft: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginLeft: 4
  },
  homeHeadOdds: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 0,
    width: 50,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginLeft: 4
  },
  homeOddsTime: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    width: 60,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginLeft: 4
  },
  homeOddsTeams: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    width: 150,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginLeft: 4
  },
  homeOddsTip: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    width: 120,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginLeft: 4
  },
  homeOddsOdds: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    width: 50,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginLeft: 4
  },
  todayT: {
    padding: 5,
    fontSize: 23,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  todayD: {
    padding: 5,
    fontSize: 23,
    marginRight: 20,
    color: '#00008b'
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