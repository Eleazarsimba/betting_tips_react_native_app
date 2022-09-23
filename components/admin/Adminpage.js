import { 
  View, 
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth, store } from '../../firebase-config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntiDesign from 'react-native-vector-icons/AntDesign'

const Adminpage = ({navigation}) => {
  const handleLogout = () => {
    auth
     .signOut()
     .then(user => {
        alert('You are logged out');
        AsyncStorage.clear();
        navigation.replace('Homepage')
     })
     .catch(error => alert(error.message))
 }

 const [Notifs,setNotifs] = useState([]);

 useEffect(() => {
  const ref = store.collection('notifications')
  .where('Read', '==', false)
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

const [loggeduser, setLoggedUser] = useState({});
  useEffect(() => {
      auth
      .onAuthStateChanged(currentUser => {
          setLoggedUser(currentUser)
      })        
  }, []);

  return (
    <View>
      <StatusBar backgroundColor="#79A7D3" barStyle="light-content" />
      <View style={styles.adminContainer}>
        <Text style={styles.profileData}>ADMIN ACCOUNT</Text>
        <Text>Welcome {loggeduser.email}</Text>
        <View style={styles.adminContainerOptions}>
            <TouchableOpacity style={styles.Option} onPress={() => navigation.navigate('Addadmin')}>
                <View style={styles.icon1}>
                  <AntiDesign name="adduser" size={30} color="#79A7D3" />
                </View>
                <Text style={styles.OptionData}>
                  Add Admin
                </Text>
            </TouchableOpacity>
            
            <View style={styles.profileNotification}>
              <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => navigation.navigate('Notifications')}>
                <View style={styles.icon1}>
                  <Ionicons name="notifications-circle" size={30} color="#79A7D3" />
                </View>
                <Text style={styles.OptionData}>
                  Notifications
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileCount}>
                <Text style={styles.OptionCount}>{Notifs.length}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.Option} onPress={() => navigation.navigate('AdminTips')}>
                <View style={styles.icon1}>
                  <Ionicons name="football" size={30} color="#79A7D3" />
                </View>
                <Text style={styles.OptionData}>
                  Daily Tips
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Option} onPress={() => navigation.navigate('GrandJP')}>
                <View style={styles.icon1}>
                  <Ionicons name="list" size={30} color="#79A7D3" />
                </View>
                <Text style={styles.OptionData}>
                  Jackpots
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Option} onPress={handleLogout}>
                <View style={styles.icon1}>
                  <MaterialIcon name="logout" size={30} color="#79A7D3" />
                </View>
                <Text style={styles.OptionData}>
                  Logout
                </Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Adminpage

const styles = StyleSheet.create({
  adminContainer: {
    padding: 30,
  },
  adminContainerOptions: {
    paddingTop: 40
  },
  profileData: {
    fontSize: 23,
    fontWeight: '700',
    color: '#808080'
  },
  Option: {
    flexDirection: 'row',
    padding: 25
  },
  profileNotification:{
    flexDirection: 'row',
    padding: 25
  },
  OptionData:{
    fontSize: 20,
    color: '#808080',
    fontWeight: '500'
  },
  profileCount: {
    // marginLeft: 20,
    backgroundColor: '#0782F9',
    width: 25,
    height: 25,
    borderRadius: 50 / 2,
    alignItems:'center',
    justifyContent:'center',
    borderColor: '#89ABE3FF',
    marginLeft: 10
  },
  OptionCount:{
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  icon1:{
     marginRight: 20,
  },
})