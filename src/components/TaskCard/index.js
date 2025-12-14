import {Text, View, TouchableOpacity, FlatList} from 'react-native'
import React from 'react'
import styles from './style'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {fetchTasksByFilter} from '../../redux/taskSlice'
import { RouterNames } from '../../config/RouterNames'

// const fakeTask=[{
//   id: 1,
//   name: 'Ders Çalışma',
//   completed: '0',
//   continuing: '1',
//   created_at: '10.10.2010',
//   updated_at: '20.10.2010'
// }];

const index = ({style, navigation}) => {
  const tasks = useSelector(state => state.tasks.list);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchTasksByFilter({limit : 3}))
    .then(()=> console.log('Dispatch tamamlandı'))
    .catch(err=> console.log('Dispatch tamamlanmadı',err));
    
  },[])
  return (
    <TouchableOpacity style={[styles.cardBase, style]} onPress={()=> {navigation.navigate(RouterNames.Tasks)}}>
        <Text style={styles.title}>Görevler</Text>
      {tasks != null ? (
        <FlatList
          data={tasks}
          keyExtractor={(item)=> item.id.toString()}
          renderItem={({item})=> (
            <Text style={styles.text}>{item.name}</Text>
          )}
        />
        )
      : 
        (
          <Text>Görev bulunmamaktadır</Text>
        )
      }
    </TouchableOpacity>
  )
}

export default index
