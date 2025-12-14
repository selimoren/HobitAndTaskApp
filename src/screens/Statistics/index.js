import { Text, View, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTasks } from '../../redux/taskSlice'
import { TaskService } from '../../services/taskService'
import LinearGradient from 'react-native-linear-gradient'
import ProgressBar from '../../components/ProgressBar'
import styles from './style'

const { width } = Dimensions.get('window');

const StatisticsScreen = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.list);
  const [dailyCompletedCount, setDailyCompletedCount] = useState(0);
  const [weeklyData, setWeeklyData] = useState([]);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    dispatch(fetchTasks());
    loadStatistics();
  }, []);

  useEffect(() => {
    loadStatistics();
  }, [tasks]);

  const loadStatistics = async () => {
    try {
      // Get daily completed tasks count
      const dailyCount = await TaskService.getDailyCompletedTasksCount();
      setDailyCompletedCount(dailyCount);

      // Get weekly data
      const weekly = await TaskService.getWeeklyTasks();
      setWeeklyData(weekly);

      // Get completion percentage
      const percentage = await TaskService.getCompletionPercentage();
      setCompletionPercentage(percentage);
    } catch (error) {
      console.error('Statistics yüklenirken hata:', error);
    }
  };

  const getMaxValue = () => {
    if (weeklyData.length === 0) return 1;
    return Math.max(...weeklyData.map(d => Math.max(d.total || 0, d.completed || 0)), 1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' });
    } catch {
      return dateString;
    }
  };

  const getDayName = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      const days = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
      return days[date.getDay()];
    } catch {
      return '';
    }
  };

  const maxValue = getMaxValue();
  const chartWidth = width - 64;

  return (
    <LinearGradient
      colors={['#817E87', '#AED89D']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Daily Completed Tasks Count */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Günlük Tamamlanan Görevler</Text>
          <View style={styles.statValueContainer}>
            <Text style={styles.statValue}>{dailyCompletedCount}</Text>
            <Text style={styles.statLabel}>görev bugün tamamlandı</Text>
          </View>
        </View>

        {/* Completion Percentage */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Genel Tamamlanma Oranı</Text>
          <View style={styles.progressContainer}>
            <ProgressBar 
              progress={completionPercentage} 
              height={20}
              showPercentage={true}
            />
          </View>
        </View>

        {/* Weekly Chart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Haftalık Görev Grafiği</Text>
          <View style={styles.chartContainer}>
            {weeklyData.length > 0 ? (
              <View style={styles.chart}>
                {weeklyData.map((item, index) => {
                  const totalHeight = (item.total || 0) / maxValue * 150;
                  const completedHeight = (item.completed || 0) / maxValue * 150;
                  return (
                    <View key={index} style={styles.barContainer}>
                      <View style={styles.bars}>
                        <View style={[styles.bar, styles.totalBar, { height: totalHeight }]} />
                        <View style={[styles.bar, styles.completedBar, { height: completedHeight }]} />
                      </View>
                      <Text style={styles.barLabel}>{getDayName(item.date)}</Text>
                      <Text style={styles.barDate}>{formatDate(item.date)}</Text>
                      <Text style={styles.barValue}>{item.completed || 0}/{item.total || 0}</Text>
                    </View>
                  );
                })}
              </View>
            ) : (
              <View style={styles.emptyChart}>
                <Text style={styles.emptyChartText}>Bu hafta için veri bulunmamaktadır</Text>
              </View>
            )}
          </View>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, styles.totalBar]} />
              <Text style={styles.legendText}>Toplam</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, styles.completedBar]} />
              <Text style={styles.legendText}>Tamamlanan</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default StatisticsScreen
