import { Text, View, Image } from 'react-native'
import React from 'react'
import TaskCard from '../../components/TaskCard'
import HabitCard from '../../components/HabitCard'
import styles from './style'
import LinearGradient from 'react-native-linear-gradient'

const HomeScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#817E87', '#AED89D']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>Ana Sayfa</Text>
      </View>
      <View style={styles.container}>
        <HabitCard navigation={navigation}/>
        <TaskCard navigation={navigation}/>
      </View>
    </LinearGradient>
  )
}

export default HomeScreen
