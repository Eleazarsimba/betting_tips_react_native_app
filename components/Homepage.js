import { 
    View, 
    Text, 
    Button, 
    StyleSheet 
  } from 'react-native'
  import React from 'react'
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  const Homepage = ({navigation}) => {

    const _checkAuth = async () => {
      try {
        const tokenValue = await AsyncStorage.getItem('token');
          // console.log(tokenValue);
        tokenValue ? navigation.navigate('Adminhome') :         
        navigation.navigate('Login')
      } catch (error) {
        console.log(error);
      }
    };    
    return (
      <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
        <View style={styles.authCheck}>
          <Text style={{fontSize: 20}}>Continue as: </Text>
          <View  style={styles.authcheckBtn} >
          <View style={styles.authBtn}>
            <Button
            onPress = {_checkAuth}
              title="Admin"
              color="#89ABE3FF"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
          <View style={styles.authBtn}>
            <Button
              onPress={() => navigation.navigate('Userhome')}
              title="User"
              color="#EA738DFF"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
          </View>
        </View>
      </View>
    )
  }
  
  export default Homepage
  
  const styles = StyleSheet.create({
   authCheck: {
    alignItems:'center',
    justifyContent:'center',
    width: 300,
    height: 150,
    borderRadius: 50 / 2,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: '#89ABE3FF',
   },
   authcheckBtn: {
    flexDirection: 'row',
    margin: 20
   },
   authBtn: {
    margin: 10,
    width: 100
   }
  })