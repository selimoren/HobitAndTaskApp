import { Text, View, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import styles from './style'
import { fetchTasks, deleteTask, isCompleted } from '../../redux/taskSlice'
import { useSelector, useDispatch } from 'react-redux'
import Icons from '../../config/Icons'
import LinearGradient from 'react-native-linear-gradient'
import Checkbox from '../../components/Checkbox'

const TasksScreen = () => {
  const tasks = useSelector(state => state.tasks.list)
  const dispatch = useDispatch();

  // Ekran her focus olduğunda listeyi yenile
  useFocusEffect(
    React.useCallback(() => {
      console.log('📋 Tasks ekranı focus oldu, liste yenileniyor...');
      dispatch(fetchTasks())
        .then((result) => {
          console.log('✅ Tasks listesi yenilendi. Toplam görev:', result.payload?.length || 0);
        })
        .catch(err => {
          console.error('❌ Tasks listesi yenilenirken hata:', err);
        });
    }, [dispatch])
  );

  // Redux state değişikliklerini logla
  useEffect(() => {
    console.log('📊 Tasks Redux state güncellendi. Toplam görev:', tasks?.length || 0);
  }, [tasks]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleToggleComplete = (id) => {
    dispatch(isCompleted(id));
  };

  const getPriorityLabel = (priority) => {
    const priorities = ['Düşük', 'Orta', 'Yüksek'];
    return priorities[priority] || 'Orta';
  };

  const getPriorityColor = (priority) => {
    const colors = ['#4CAF50', '#FF9800', '#F44336'];
    return colors[priority] || '#FF9800';
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  return (
    <LinearGradient
      colors={['#817E87', '#AED89D']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      {tasks != null && tasks.length > 0 ? (
        <View style={styles.container}>
          <FlatList
            data={tasks}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              const isTaskCompleted = Number(item.completed) === 1;
              const priority = item.priority !== undefined ? item.priority : 1;
              return (
                <View style={[styles.card, isTaskCompleted && styles.cardCompleted]}>
                  <View style={styles.cardContent}>
                    <View style={styles.leftSection}>
                      <Checkbox
                        checked={isTaskCompleted}
                        onPress={() => handleToggleComplete(item.id)}
                        size={24}
                        color={getPriorityColor(priority)}
                      />
                      <View style={styles.textBox}>
                        <Text style={[styles.taskName, isTaskCompleted && styles.taskNameCompleted]}>
                          {item.name}
                        </Text>
                        <View style={styles.metaInfo}>
                          <Text style={styles.periodText}>
                            {item.period === 0 ? 'Günlük' : 'Haftalık'}
                          </Text>
                          {item.due_date && (
                            <Text style={styles.dueDate}>
                              📅 {formatDate(item.due_date)}
                            </Text>
                          )}
                        </View>
                        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(priority) + '20' }]}>
                          <Text style={[styles.priorityText, { color: getPriorityColor(priority) }]}>
                            {getPriorityLabel(priority)}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleDelete(item.id)}
                      style={styles.deleteButton}
                    >
                      <Image source={Icons.trash} style={styles.deleteIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }}
            contentContainerStyle={styles.listContent}
          />
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Görev bulunmamaktadır</Text>
        </View>
      )}
    </LinearGradient>
  )
}

export default TasksScreen
