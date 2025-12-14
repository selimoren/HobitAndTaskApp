import {Text, View, TouchableOpacity, FlatList} from 'react-native'
import React from 'react'
import styles from './style'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchHabitsByFilter } from '../../redux/habitSlice'
import { RouterNames } from '../../config/RouterNames'

// const fakeHabit=[{
//   id: 1,
//   name: 'Su içme',
//   completed: '0',
//   continuing: '1',
//   created_at: '10.10.2010',
//   updated_at: '20.10.2010'
// }];

const index = ({style, navigation}) => {
  const habits = useSelector(state => state.habits.list);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchHabitsByFilter({limit : 3}))
    .then(()=> console.log('Dispatch tamamlandı'))
    .catch(err=> console.log('Dispatch tamamlanmadı',err));
  },[])

  return (
    <TouchableOpacity style={[styles.cardBase, style]} onPress={()=> {navigation.navigate(RouterNames.Habits)}}>
        <Text style={styles.title}>Alışkanlıklar</Text>
      {habits != null ? (
        <FlatList
          data={habits}
          keyExtractor={(item)=> item.id.toString()}
          renderItem={({item})=> (
            <Text style={styles.text}>{item.name}</Text>
          )}
        />
        )
       : 
        (
          <Text>Alışkanlık bulunmamaktadır.</Text>
        )
      }
    </TouchableOpacity>
  )
}

export default index
