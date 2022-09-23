import { 
  View, 
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { store } from '../../firebase-config'

const Notifications = ({navigation}) => {
  const [Notifs,setNotifs] = useState([]);

 useEffect(() => {
  const ref = store.collection('notifications')
  .orderBy('Time', 'desc');
  ref
  .onSnapshot((query) => {
      const objs = [];
      query.forEach((doc) => {
        objs.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setNotifs(objs)
    });
}, []) 

const Item = ({item}) => {
  return(
    <View key={item.Info} 
    style={[item.Read.toString() === 'true' ? styles.notifbofy : styles.notifbofyunread]}
    >
      <TouchableOpacity style={{flexDirection: 'row'}}
        onPress={() =>
          navigation.navigate('myNotification', {
            item,
          })
        }
      >
        <View style={[item.Read.toString() === 'true' ? styles.readDot : styles.unreadDot]}></View>
        <Text style={styles.notifTime}>{item.Time}</Text>
        <Text style={styles.notifInf}>{item.Info}</Text>
      </TouchableOpacity>
    </View>
  )
}

  return (
    <View style={{flex: 1}}>
        <FlatList
        data={Notifs}
        renderItem={Item}
        keyExtractor={(item) => item.id}
        />
    </View>
  )
}
export default Notifications

const styles = StyleSheet.create({
  notifbofy: {
      width:'100%',
      flexDirection: 'row',
      alignItems: 'flex-start',
      margin: 1
  },
  notifbofyunread: {
    width:'100%',
      flexDirection: 'row',
      alignItems: 'flex-start',
      margin: 1,
      backgroundColor: '#79A7D3'
  },
  notifTime: {
      fontSize: 15,
      width: 100,
      padding: 10,
  },
  notifInf: {
      fontSize: 15,
      width: 310,
      padding: 10,
  },
  unreadDot: {
    width: 8,
    height: 8,
    backgroundColor: '#0000ff',
    borderRadius: 16/2,
    marginTop: 20,
    marginLeft: 4
  },
  readDot: {
    display: 'none'
  },
})