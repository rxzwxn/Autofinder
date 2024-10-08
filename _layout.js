import React from 'react';
import { Stack } from 'expo-router'; 
import { View, Text } from 'react-native';

const CustomLayout = ({ children }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, textAlign: 'center',color:'#212020',marginTop:70,backgroundColor:'#EBEBEB' }}>AutoFinder</Text>
      {children}
    </View>
  );
};
const Layout = () => {
  return (
    <CustomLayout>
      <Stack>
      <Stack.Screen name="index"/>
      <Stack.Screen name="carlisting"/>
      <Stack.Screen name="viewcars"/>

      </Stack> 

    </CustomLayout>
  );
};
export default Layout;

