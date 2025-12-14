import { Text, View, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { addHabit } from '../../redux/habitSlice'
import CustomButton from '../../components/CustomButton'
import styles from './style'
import LinearGradient from 'react-native-linear-gradient'

const AddHabitScreen = () => {
  const [habitName, setHabitName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAddHabit = () => {
    if (!habitName.trim()) {
      alert('Lütfen alışkanlık adını giriniz.');
      return;
    }

    dispatch(addHabit({
      name: habitName.trim(),
      description: description.trim() || null
    }))
      .then(() => {
        setHabitName('');
        setDescription('');
        navigation.goBack();
      })
      .catch(err => {
        console.error('Alışkanlık eklenirken hata oluştu:', err);
        alert('Alışkanlık eklenirken bir hata oluştu.');
      });
  };

  return (
    <LinearGradient      
      colors={['#817E87', '#AED89D']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.label}>Alışkanlık Adı</Text>
        <TextInput
          placeholder="Alışkanlık adını giriniz (örn: Su içme, Kitap okuma)"
          value={habitName}
          onChangeText={setHabitName}
          style={styles.textInput}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Açıklama (Opsiyonel)</Text>
        <TextInput
          placeholder="Alışkanlık hakkında kısa bir açıklama"
          value={description}
          onChangeText={setDescription}
          style={[styles.textInput, styles.textArea]}
          multiline
          numberOfLines={4}
          placeholderTextColor="#999"
        />

        <CustomButton
          title="Alışkanlık Ekle"
          onPress={handleAddHabit}
          variant="primary"
          style={styles.addButton}
        />
      </ScrollView>
    </LinearGradient>
  )
}

export default AddHabitScreen
