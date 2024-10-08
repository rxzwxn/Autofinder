import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Button, ActivityIndicator, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { databases } from '../api/appwrite'; 
import { config } from '../api/appwrite';

const ViewCars = () => {
  const [carListings, setCarListings] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchExpanded, setSearchExpanded] = useState(false); // State for collapsible search bar
  const [searchParams, setSearchParams] = useState({
    carname: '',
    models: '',
    years: '',
    price: '',
    condition: '',
    mileage: ''
  });

  useEffect(() => {
    const fetchCarListings = async () => {
      try {
        const response = await databases.listDocuments(
          config.databaseId,
          config.collectionId
        );
        setCarListings(response.documents);
        setFilteredCars(response.documents); // Set filtered cars to initial car list
      } catch (err) {
        console.error('Error fetching car listings:', err);
        setError('Failed to fetch car listings.');
      } finally {
        setLoading(false);
      }
    };

    fetchCarListings();
  }, []);

  // Function to handle input changes for search fields
  const handleInputChange = (key, value) => {
    setSearchParams(prevState => ({ ...prevState, [key]: value }));
  };

  // Function to filter car listings based on search input
  const handleSearch = () => {
    const filtered = carListings.filter(car => {
      const { carname, models, years, price, condition, mileage } = searchParams;
      return (
        (carname === '' || car.carname.toLowerCase().includes(carname.toLowerCase())) &&
        (models === '' || car.models.toLowerCase().includes(models.toLowerCase())) &&
        (years === '' || car.years.includes(years)) &&
        (price === '' || car.price.toString().includes(price)) &&
        (condition === '' || car.condition.toLowerCase().includes(condition.toLowerCase())) &&
        (mileage === '' || car.mileage.toString().includes(mileage))
      );
    });
    setFilteredCars(filtered);
  };

  const renderCarItem = ({ item }) => (
    <View style={styles.carContainer}>
      <Image source={{ uri: item.images }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.carTitle}>
          {item.carname} {item.models} ({item.years})
        </Text>
        <Text>Price: {item.price} USD</Text>
        <Text>Condition: {item.condition}</Text>
        <Text>Mileage: {item.mileage} km</Text>
        <Button title="Buy Now" onPress={() => alert(`Buying ${item.carname} ${item.models}`)} />
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" style={styles.loader} />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cars for Sale</Text>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cars for Sale</Text>

      {/* Search Bar */}
      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => setSearchExpanded(!searchExpanded)} // Toggle the search bar
      >
        <Text style={styles.searchBarText}>Search Cars...</Text>
      </TouchableOpacity>

      {searchExpanded && ( // Only show inputs when the search bar is expanded
        <ScrollView style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Car Name"
            value={searchParams.carname}
            onChangeText={value => handleInputChange('carname', value)}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Model"
            value={searchParams.models}
            onChangeText={value => handleInputChange('models', value)}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Year"
            value={searchParams.years}
            onChangeText={value => handleInputChange('years', value)}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Price"
            value={searchParams.price}
            onChangeText={value => handleInputChange('price', value)}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Condition"
            value={searchParams.condition}
            onChangeText={value => handleInputChange('condition', value)}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Mileage"
            value={searchParams.mileage}
            onChangeText={value => handleInputChange('mileage', value)}
          />
          <Button title="Search" onPress={handleSearch} />
        </ScrollView>
      )}

      {/* Car Listings */}
      {filteredCars.length === 0 ? (
        <Text>No car listings available.</Text>
      ) : (
        <FlatList
          data={filteredCars}
          renderItem={renderCarItem}
          keyExtractor={(item) => item.$id} // Use the document ID as the key
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  carContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  infoContainer: {
    marginTop: 10,
  },
  carTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  // Search Bar
  searchBar: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  searchBarText: {
    fontSize: 16,
    color: '#333',
  },
  // Search Input Fields (Visible when expanded)
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default ViewCars;
