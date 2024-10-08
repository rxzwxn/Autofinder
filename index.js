import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { login } from '../api/appwrite';

const HomePage = () => {
  const router = useRouter(); 

  const navigateToCarListing = () => {
    router.push('carlisting'); 
  };

  const navigateToviewcars = () => {
    router.push('viewcars'); 
  };

  login().then(function(){
    console.log('logged in')
  })



  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Welcome to AutoFinder</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={navigateToviewcars}>
          <Text style={styles.buttonText}>Buy a Car</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={navigateToCarListing}>
          <Text style={styles.buttonText}>Sell a Car</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.featuresTitle}>Features:</Text>

      <View style={styles.featuresContainer}>
        <Text style={styles.feature}>✓ Browse a wide variety of cars</Text>
        <Text style={styles.feature}>✓ Advanced search filters</Text>
        <Text style={styles.feature}>✓ Compare car prices</Text>
        <Text style={styles.feature}>✓ View detailed car specs and reviews</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
    padding: 20,

  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 50,
    color: '#0A0A0A',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#292929',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  featuresTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  featuresContainer: {
    backgroundColor: '#E0E0E0',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  feature: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
});

export default HomePage;
