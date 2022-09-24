import { 
    View, 
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
 } from 'react-native'
 import React, { useState, useEffect } from 'react'
 import { store, auth } from '../../firebase-config';
import { 
    FAB,
    TextInput 
} from 'react-native-paper';

const GrandJP = () => {
  const [jpTips,setjpTips] = useState([]);
  const [animate, setAnimate] = useState(true);

  const [loggeduser, setLoggedUser] = useState({});
    useEffect(() => {
        auth
        .onAuthStateChanged(currentUser => {
            setLoggedUser(currentUser)
        })        
    }, []);

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
        setjpTips(objs);
        setAnimate(false);
      });
  }, [])

  const Item = ({item}) => {
    return(
      <View key={item.Teams} style={styles.homeHeading}>
        <View><Text style={styles.homeHeadTimeB}>{item.Time}</Text></View>
        <View><Text style={styles.homeHeadDateB}>{item.Date}</Text></View>
        <View><Text style={styles.homeHeadGameB}>{item.Game}</Text></View>
        <View><Text style={styles.homeHeadTipB}>{item.Tip}</Text></View>
        <View style={{padding: 10}}>
            <TouchableOpacity
                onPress={() => handleDelete(item)}
            >
                <Text style={styles.homeHeadActionB}>
                    Delete
                </Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }

  const [time, setTime] = useState(0);
  const [date, setDate] = useState('24/09/2022');
  const [game, setGame] = useState('');
  const [prediction, setPrediction] = useState('');
  const [ID, setID] = useState(0);

  const [showText, setShowText] = useState(false);
  
  const addGame = () => {
    setShowText(previousState => !previousState);
  };

  const newPrediction = () => {
    store.collection('grandJackpot').add({
        Time: time,
        Date: date,
        Game: game,
        Tip: prediction,
        TeamID: ID
    })
    store.collection('notifications').add({
        Info: `${loggeduser.email} added game id ${ID} to the grand Jackpot predictions`,
        Time: new Date().toLocaleString(),
        Read: false
      })
    Alert.alert('Team added successfully');
    setTime('')
    setGame('')
    setPrediction('')
    setID('')
    setDate('24/09/2022')
  };

  const handleDelete = async (item) => {
    const ref = store.collection('grandJackpot').doc(item.id);
    try {
        store.collection('notifications').add({
            Info: `${loggeduser.email} deleted game id ${ID} from the grand Jackpot predictions`,
            Time: new Date().toLocaleString(),
            Read: false
          })
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
              Betika Grand Jackpot
            </Text>
        </View>
        <View style={styles.homeHeading}>
            <Text style={styles.homeHeadTime}>Time</Text>
            <Text style={styles.homeHeadDate}>Date</Text>
            <Text style={styles.homeHeadGame}>Game</Text>
            <Text style={styles.homeHeadTip}>Tip</Text>
            <Text style={styles.homeHeadAction}>Action</Text>
        </View>
          <FlatList
          data={jpTips}
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
        label="Game_ID"
        value={ID}
        onChangeText={text => setID(text)}
      />
      <TextInput
        mode="outlined"
        label="Time"
        value={time}
        onChangeText={text => setTime(text)}
      />
      <TextInput
        mode="outlined"
        label="Date"
        value={date}
        onChangeText={text => setDate(text)}
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
    
      <TouchableOpacity 
        style = {styles.registerbtn}
        disabled={!time || !game || !prediction || !date}
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

export default GrandJP
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
    homeHeadDate: {
        fontWeight: 'bold',
        fontSize: 20,
        width: 80,
        marginLeft: 4
      },
    homeHeadGame: {
        fontWeight: 'bold',
        fontSize: 20,
        width: 100,
        marginLeft: 4
      },
    homeHeadTip: {
        fontWeight: 'bold',
        fontSize: 20,
        width: 100,
        marginLeft: 4
      },
    homeHeadAction: {
        fontWeight: 'bold',
        fontSize: 20,
        width: 50,
        marginLeft: 4
      },
    homeHeadTimeB: {
        fontSize: 15,
        width: 60,
        marginLeft: 4,
        padding: 10,
      },
    homeHeadDateB: {
        fontSize: 15,
        width: 90,
        marginLeft: 4,
        padding: 10,
      },
    homeHeadGameB: {
        fontSize: 15,
        width: 120,
        marginLeft: 4,
        padding: 10,
      },
    homeHeadTipB: {
        fontSize: 15,
        width: 90,
        marginLeft: 4,
        padding: 10,
      },
    homeHeadActionB: {
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