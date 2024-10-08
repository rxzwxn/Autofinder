import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { updatecars } from '../api/appwrite'; 

const AddCarListing = () => {
  const [carName, setCarName] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [carPrice, setCarPrice] = useState('');
  const [carCondition, setCarCondition] = useState('');
  const [carMileage, setCarMileage] = useState('');
  const [carImage, setCarImage] = useState(null); 

  /*useEffect(() => {
    testConnection()
      .then(() => console.log('Appwrite connection is healthy.'))
      .catch((error) => console.error('Failed to connect to Appwrite:', error));
  }, []);*/

  const handleAddCar = async () => {
    if (!carName || !carModel || !carYear || !carPrice || !carCondition || !carMileage || !carImage) {
      Alert.alert('Error', 'Please fill in all fields and select an image.');
      return;
    }

    const years = parseInt(carYear.trim(), 10); 
    const price = parseInt(carPrice.trim(), 10); 
    const mileage = parseInt(carMileage.trim(), 10);

    console.log(`Parsed values -> Year: ${years}, Price: ${price}, Mileage: ${mileage}`);
    console.log('Type check:', {
      yearsType: typeof years,
      priceType: typeof price,
      mileageType: typeof mileage,
    });

    if (isNaN(years) || isNaN(price) || isNaN(mileage)) {
      Alert.alert('Error', 'Year, Price, and Mileage must be valid numbers.');
      return;
    }

    try {
      const data = {
        carname: carName,
        models: carModel,
        years: years,
        price: price,
        condition: carCondition,
        mileage: mileage,
        images: carImage, 
      };
      console.log('Final data being sent:', data);

      await updatecars(data);
      Alert.alert('Success', 'Car listing added successfully!');

      setCarName('');
      setCarModel('');
      setCarYear('');
      setCarPrice('');
      setCarCondition('');
      setCarMileage('');
      setCarImage(null);
    } catch (error) {
      console.error("Appwrite Error:", error);
      Alert.alert('Error', 'Failed to add car listing.');
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setCarImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Car Listing</Text>
      <TextInput style={styles.input} placeholder="Car Name" value={carName} onChangeText={setCarName} />
      <TextInput style={styles.input} placeholder="Car Model" value={carModel} onChangeText={setCarModel} />
      <TextInput style={styles.input} placeholder="Car Year" value={carYear} keyboardType="numeric" onChangeText={setCarYear} />
      <TextInput style={styles.input} placeholder="Car Price" value={carPrice} keyboardType="numeric" onChangeText={setCarPrice} />
      <TextInput style={styles.input} placeholder="Car Condition" value={carCondition} onChangeText={setCarCondition} />
      <TextInput style={styles.input} placeholder="Car Mileage(kmph)" value={carMileage} keyboardType="numeric" onChangeText={setCarMileage} />

      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        <Text style={styles.buttonText}>{carImage ? 'Change Image' : 'Select Image'}</Text>
      </TouchableOpacity> 

      {carImage && <Image source={{ uri: carImage }} style={styles.imagePreview} />}
      <TouchableOpacity style={styles.button} onPress={handleAddCar}>
        <Text style={styles.buttonText}>Submit Listing</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  imagePickerButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
});

export default AddCarListing;
