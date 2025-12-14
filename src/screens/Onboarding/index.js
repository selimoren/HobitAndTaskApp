import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../components/CustomButton';
import { StorageService } from '../../services/storageService';
import { RouterNames } from '../../config/RouterNames';
import styles from './style';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const onboardingData = [
    {
      id: 1,
      title: 'Görevlerinizi Yönetin',
      description: 'Günlük ve haftalık görevlerinizi ekleyin, öncelik belirleyin ve takip edin.',
      image: require('../../assets/images/onboarding-task.png'),
      features: [
        'Öncelik seviyesi belirleme',
        'Bitiş tarihi ekleme',
        'Günlük/Haftalık periyot seçimi',
      ],
    },
    {
      id: 2,
      title: 'Alışkanlıklarınızı Takip Edin',
      description: 'Günlük alışkanlıklarınızı ekleyin ve her gün tamamlayarak ilerlemenizi görün.',
      image: require('../../assets/images/onboarding-habit.png'),
      features: [
        'Günlük alışkanlık ekleme',
        'Günlük tamamlama takibi',
        'Açıklama ekleme',
      ],
    },
    {
      id: 3,
      title: 'İlerlemenizi İzleyin',
      description: 'Tamamladığınız görevleri ve alışkanlıklarınızı istatistikler sayfasında görüntüleyin.',
      image: require('../../assets/images/onboarding-stats.png'),
      features: [
        'Günlük tamamlanan görev sayısı',
        'Haftalık görev grafiği',
        'Genel tamamlanma oranı',
      ],
    },
    {
      id: 4,
      title: 'Başlayalım!',
      description: 'Artık görevlerinizi ve alışkanlıklarınızı takip etmeye hazırsınız.',
      image: require('../../assets/images/onboarding-home.png'),
      features: [],
    },
  ];

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      scrollViewRef.current?.scrollTo({
        x: nextPage * width,
        animated: true,
      });
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    handleFinish();
  };

  const handleFinish = async () => {
    try {
      await StorageService.setOnboardingCompleted(true);
      navigation.replace(RouterNames.TabNav);
    } catch (error) {
      console.error('Onboarding tamamlanırken hata:', error);
      navigation.replace(RouterNames.TabNav);
    }
  };

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / width);
    setCurrentPage(page);
  };

  return (
    <LinearGradient
      colors={['#817E87', '#AED89D']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      {/* Skip Button */}
      {currentPage < onboardingData.length - 1 && (
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Atla</Text>
        </TouchableOpacity>
      )}

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {onboardingData.map((item, index) => (
          <View key={item.id} style={styles.page}>
            <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
              {/* Image Container */}
              <View style={styles.imageContainer}>
                <Image
                  source={item.image}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>

              {/* Text Content */}
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>

                {/* Features List */}
                {item.features.length > 0 && (
                  <View style={styles.featuresContainer}>
                    {item.features.map((feature, idx) => (
                      <View key={idx} style={styles.featureItem}>
                        <Text style={styles.featureIcon}>✓</Text>
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </Animated.View>
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentPage === index && styles.dotActive,
            ]}
          />
        ))}
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        {currentPage > 0 && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              const prevPage = currentPage - 1;
              setCurrentPage(prevPage);
              scrollViewRef.current?.scrollTo({
                x: prevPage * width,
                animated: true,
              });
            }}
          >
            <Text style={styles.backButtonText}>Geri</Text>
          </TouchableOpacity>
        )}

        <CustomButton
          title={currentPage === onboardingData.length - 1 ? 'Başla' : 'İleri'}
          onPress={handleNext}
          variant="primary"
          style={styles.nextButton}
        />
      </View>
    </LinearGradient>
  );
};

export default OnboardingScreen;
