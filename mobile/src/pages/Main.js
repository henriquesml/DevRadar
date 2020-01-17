import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

export default function Main({ navigation }) {

  const [ currentRegion, setCurrentRegion ] = useState(null)

  useEffect(()=>{
    async function loadPosition(){
      const { granted } = await requestPermissionsAsync()

      if (granted){
        const { coords } = await getCurrentPositionAsync()
        const { latitude, longitude } = coords

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.05 ,
          longitudeDelta: 0.05
        })
      }
    }
    loadPosition()
  }, [])

  if (!currentRegion) {
    return null
  }

  return (
    <>
    <MapView  initialRegion={currentRegion} style={styles.map}>
      <Marker coordinate={{ latitude: -26.3079387, longitude: -48.842988 }}>
        <Image  style={styles.avatar} source={{ uri: 'https://avatars1.githubusercontent.com/u/39440032?s=460&v=4' }} />
        <Callout onPress={() => {
          navigation.navigate('Profile', { github_username: 'henriquesml' })
        }} >
          <View style={styles.callout}>
            <Text style={styles.devName} >Henrique Schmeller</Text>
            <Text style={styles.devBio} >Desenvolvedor</Text>
            <Text style={styles.devTechs} >ReactJs e React Native</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>

    <View style={styles.search} >
      <TextInput 
        style={styles.searchInput} 
        placeholder='Buscar devs por Tecnologias'
        placeholderTextColor='#999'
        autoCapitalize='words'
        autoCorrect={false}      
      />

      <TouchableOpacity 
        onPress={() => {}}
        style={styles.searchButton} 
      >
        <MaterialIcons name='my-location' size={20} color='#FFF' />
      </TouchableOpacity>

    </View>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF'
  },
  callout: {
    width: 260
  },
  devName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  devBio: {
    color: '#666',
    marginTop: 5
  },
  devTechs: {
    marginTop: 5
  },
  search: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row'
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 3
  },
  searchButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8e4dff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 3
  }
})