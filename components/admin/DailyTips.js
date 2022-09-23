import { 
    View, 
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Alert
} from 'react-native'
import { 
    FAB,
    TextInput 
} from 'react-native-paper';
import React, { useState, useEffect } from 'react'
import { store } from '../../firebase-config';

const DailyTips = () => {

const [date, setDate] = useState(null);
  useEffect(() => {
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    setDate(date);
  }, []);

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

  const Item = ({item}) => {
    return(
      <View key={item.Teams} style={styles.homeHeading}>
        <View><Text style={styles.homeOddsTime}>{item.Time}</Text></View>
        <View><Text style={styles.homeOddsTeams}>{item.Teams}</Text></View>
        <View><Text style={styles.homeOddsTip}>{item.Tip}</Text></View>
        <View><Text style={styles.homeOddsOdds}>{item.Odds}</Text></View>
        <View style={{padding: 10}}>
            <TouchableOpacity
                onPress={() => handleDelete(item)}
            >
                <Text style={styles.homeOddsAction}>
                    Delete
                </Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }

  const [time, setTime] = useState(0);
  const [game, setGame] = useState('');
  const [prediction, setPrediction] = useState('');
  const [odds, setOdds] = useState(0);

  const [showText, setShowText] = useState(false);
  
  const addGame = () => {
    setShowText(previousState => !previousState);
  };

  const newPrediction = () => {
    store.collection('dailyTips').add({
        Time: time,
        Teams: game,
        Tip: prediction,
        Odds: odds
    })
    Alert.alert('Team added successfully');
    setTime('')
    setGame('')
    setPrediction('')
    setOdds('')
  };

  const handleDelete = async (item) => {
    const ref = store.collection('dailyTips').doc(item.id);
    try {
        await ref.delete();
      } catch (err) {
        console.error(err);
      }
    }

  return (
    <View style={styles.Tipscontainer}>
        <View style={{padding: 2}}>
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
                <Text style={styles.homeHeadAction}>Action</Text>
            </View>
              <FlatList
              data={Tips}
              renderItem={Item}
              keyExtractor={(item) => item.id}
              />
            <View style={styles.activityI} >
                <ActivityIndicator animating={animate} size="large" />      
            </View>
        </View>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={addGame}
        />

        {showText ? (
        <View style={styles.textInput}>
          <TextInput
            mode="outlined"
            label="Time"
            value={time}
            onChangeText={text => setTime(text)}
          />
          <TextInput
            mode="outlined"
            label="Game"
            value={game}
            onChangeText={text => setGame(text)}
          />
          <TextInput
            mode="outlined"
            label="Prediction"
            value={prediction}
            onChangeText={text => setPrediction(text)}
          />
          <TextInput
            mode="outlined"
            label="Odds"
            value={odds}
            onChangeText={text => setOdds(text)}
          />
          <TouchableOpacity 
            style = {styles.registerbtn}
            disabled={!time || !game || !prediction || !odds}
            onPress = {newPrediction}
            >
            <Text style={styles.regtext}>
               Submit
            </Text>
        </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </View>
  )
}

export default DailyTips

const styles = StyleSheet.create({
    Tipscontainer: {
        flexDirection: 'column',
        flex: 1
    },
    fab: {
        alignSelf: 'flex-end',
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#0782F9'
    },
    textInput: {
        position: 'relative',
        margin: 18,
    },
    btn: {
        marginTop: 20,
    },
    todayT: {
        padding: 20,
        fontSize: 23,
        fontWeight: 'bold',
    },
    todayD: {
        padding: 5,
        fontSize: 23,
        marginRight: 20,
        color: '#00008b'
    },
    homeHeading: {
        width:'100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
    },
    homeHeadTime: {
        fontWeight: 'bold',
        fontSize: 20,
        width: 60,
        marginLeft: 4
      },
    homeHeadTeams: {
        fontWeight: 'bold',
        fontSize: 20,
        width: 100,
        marginLeft: 4
      },
    homeHeadTip: {
        fontWeight: 'bold',
        fontSize: 20,
        width: 60,
        marginLeft: 4
      },
      homeHeadOdds: {
        fontWeight: 'bold',
        fontSize: 20,
        width: 50,
        marginLeft: 4
      },
      homeHeadAction: {
        fontWeight: 'bold',
        fontSize: 20,
        width: 50,
        marginLeft: 4
      },
      homeOddsTime: {
        padding: 10,
        width: 60,
        marginLeft: 4
      },
      homeOddsTeams: {
        padding: 10,
        width: 120,
        marginLeft: 4
      },
      homeOddsTip: {
        padding: 10,
        width: 80,
        marginLeft: 4
      },
      homeOddsOdds: {
        padding: 10,
        width: 50,
        marginLeft: 4
      },
      homeOddsAction: {
        padding: 5,
        width: 50,
        marginLeft: 4,
        backgroundColor: '#d11a2a',
        color: '#fff'
      },
    registerbtn: {
        backgroundColor: '#0782F9',
        marginTop: 15,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        height: 50,
    },
    regtext: {
        color:'#fff',
        fontSize: 18,
    },
  })