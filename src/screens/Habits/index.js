import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import styles from './style'
import { fetchHabits, deleteHabit, markHabitCompletedForDay } from '../../redux/habitSlice'
import { useSelector, useDispatch } from 'react-redux'
import { HabitService } from '../../services/habitService'
import Icons from '../../config/Icons'
import LinearGradient from 'react-native-linear-gradient'
import Checkbox from '../../components/Checkbox'

const HabitsScreen = () => {
  const habits = useSelector(state => state.habits.list)
  const dispatch = useDispatch();
  const [completionStatus, setCompletionStatus] = useState({});

  // Ekran her focus olduğunda listeyi yenile
  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchHabits())
        .then(() => console.log('Habits listesi yenilendi'))
        .catch(err => console.log('Habits listesi yenilenirken hata:', err));
    }, [dispatch])
  );

  useEffect(() => {
    // Check completion status for today for each habit
    const checkCompletions = async () => {
      const status = {};
      for (const habit of habits) {
        const isCompleted = await HabitService.isHabitCompletedForDay(habit.id);
        status[habit.id] = isCompleted;
      }
      setCompletionStatus(status);
    };
    if (habits.length > 0) {
      checkCompletions();
    }
  }, [habits]);

  const handleDelete = (id) => {
    dispatch(deleteHabit(id));
  };

  const handleToggleComplete = async (id) => {
    await dispatch(markHabitCompletedForDay({ id }));
    // Update local state
    const isCompleted = await HabitService.isHabitCompletedForDay(id);
    setCompletionStatus(prev => ({ ...prev, [id]: isCompleted }));
  };

  return (
    <LinearGradient
      colors={['#817E87', '#AED89D']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      {habits != null && habits.length > 0 ? (
        <View style={styles.container}>
          <FlatList
            data={habits}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              const isCompletedToday = completionStatus[item.id] || false;
              return (
                <View style={[styles.card, isCompletedToday && styles.cardCompleted]}>
                  <View style={styles.cardContent}>
                    <View style={styles.leftSection}>
                      <Checkbox
                        checked={isCompletedToday}
                        onPress={() => handleToggleComplete(item.id)}
                        size={24}
                        color="#AED89D"
                      />
                      <View style={styles.textBox}>
                        <Text style={[styles.habitName, isCompletedToday && styles.habitNameCompleted]}>
                          {item.name}
                        </Text>
                        {item.description && (
                          <Text style={styles.description}>{item.description}</Text>
                        )}
                        <View style={styles.statusContainer}>
                          {isCompletedToday ? (
                            <View style={styles.completedBadge}>
                              <Text style={styles.completedText}>✓ Bugün tamamlandı</Text>
                            </View>
                          ) : (
                            <View style={styles.pendingBadge}>
                              <Text style={styles.pendingText}>○ Bugün tamamlanmadı</Text>
                            </View>
                          )}
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
          <Text style={styles.emptyText}>Alışkanlık bulunmamaktadır</Text>
        </View>
      )}
    </LinearGradient>
  )
}

export default HabitsScreen
