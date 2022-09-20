import {  
    StyleSheet, 
    StatusBar, 
    ScrollView, 
    View, 
    Text, 
    Image,
    ActivityIndicator,
} from 'react-native'
import React,{ useState, useEffect } from 'react'
import axios from 'axios'

const News = () => {
  const [news, setNews] = useState([]);
  const [animate, setAnimate] = useState(true);
  const _url = 'http://api.mediastack.com/v1/news?access_key=8137b743c25881df6500548cf5d2622d&categories=sports&languages=en'
  useEffect(() => {
  axios.get(_url)
    .then(function (response) {
      // handle success
        setNews(response.data.data)
        setAnimate(false);
    })
    .catch(function (error) {
        // handle error
        console.log(error.response.data.error);
    })
  },[]);

  // console.log(news)
  return (
    <ScrollView>
    <StatusBar backgroundColor="#79A7D3" barStyle="light-content" />
       <View style={{ flex: 1 }}>
          <View style={styles.titleBar}>
              <Text style={styles.titleName}>OFISHO TIPS</Text>
              <Text style={styles.titleText}>Daily Free Tips and Jackpot Tips.</Text>
          </View>

          <View style={styles.homePage}>
            <View style={styles.activityI} >
                <ActivityIndicator animating={animate} size="large" />      
            </View>
              {news.map(sport => {
                return (
                  <View key={sport.url}>
                    <Text style={styles.HomeTitle}>{sport.title}</Text>
                    <Image 
                      source={{uri: sport.image}}
                      alt="Alternate Text" size="xl"
                      style={{width: '100%', height: 290}}
                    />
                    <Text style={styles.HomeText}>{sport.description}</Text>
                    <Text style={styles.HomeText}>Source: {sport.source}</Text>               
                    <Text style={styles.HomeText}>By: {sport.author}</Text>
                  </View>
                );
              })}
          </View>
      </View>
    </ScrollView>
  )
}

export default News

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
    padding: 10,
  },
  HomeText: {
    fontSize: 18
  },
  HomeTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  activityI: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
});