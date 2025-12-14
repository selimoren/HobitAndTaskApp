import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { addTask } from '../../redux/taskSlice'
import CustomButton from '../../components/CustomButton'
import styles from './style'
import LinearGradient from 'react-native-linear-gradient'

const AddTaskScreen = () => {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState(1); // 0: Low, 1: Medium, 2: High
  const [dueDate, setDueDate] = useState('');
  const [period, setPeriod] = useState('daily'); // daily or weekly
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const priorityOptions = [
    { label: 'Düşük', value: 0, color: '#4CAF50' },
    { label: 'Orta', value: 1, color: '#FF9800' },
    { label: 'Yüksek', value: 2, color: '#F44336' },
  ];

  const handleAddTask = async () => {
    if (!taskName.trim()) {
      alert('Lütfen görev adını giriniz.');
      return;
    }

    const dueDateFormatted = dueDate ? dueDate : null;
    
    try {
      const result = await dispatch(addTask({
        name: taskName.trim(),
        periodText: period,
        priority: priority,
        dueDate: dueDateFormatted
      })).unwrap();
      
      console.log('Görev başarıyla eklendi:', result);
      setTaskName('');
      setPriority(1);
      setDueDate('');
      setPeriod('daily');
      navigation.goBack();
    } catch (err) {
      console.error('Görev eklenirken hata oluştu:', err);
      alert('Görev eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <LinearGradient
      colors={['#817E87', '#AED89D']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.label}>Görev Adı</Text>
        <TextInput
          placeholder="Görev adını giriniz"
          value={taskName}
          onChangeText={setTaskName}
          style={styles.textInput}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Öncelik</Text>
        <View style={styles.priorityContainer}>
          {priorityOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.priorityButton,
                priority === option.value && styles.priorityButtonActive,
                { borderColor: option.color }
              ]}
              onPress={() => setPriority(option.value)}
            >
              <Text style={[
                styles.priorityButtonText,
                priority === option.value && { color: option.color, fontWeight: 'bold' }
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Periyot</Text>
        <View style={styles.periodContainer}>
          <TouchableOpacity
            style={[
              styles.periodButton,
              period === 'daily' && styles.periodButtonActive
            ]}
            onPress={() => setPeriod('daily')}
          >
            <Text style={[
              styles.periodButtonText,
              period === 'daily' && styles.periodButtonTextActive
            ]}>
              Günlük
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.periodButton,
              period === 'weekly' && styles.periodButtonActive
            ]}
            onPress={() => setPeriod('weekly')}
          >
            <Text style={[
              styles.periodButtonText,
              period === 'weekly' && styles.periodButtonTextActive
            ]}>
              Haftalık
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Bitiş Tarihi (Opsiyonel)</Text>
        <TextInput
          placeholder="YYYY-MM-DD formatında giriniz (örn: 2024-12-31)"
          value={dueDate}
          onChangeText={setDueDate}
          style={styles.textInput}
          placeholderTextColor="#999"
        />
        <Text style={styles.hint}>Örnek: 2024-12-31</Text>

        <CustomButton
          title="Görev Ekle"
          onPress={handleAddTask}
          variant="primary"
          style={styles.addButton}
        />
      </ScrollView>
    </LinearGradient>
  )
}

export default AddTaskScreen
