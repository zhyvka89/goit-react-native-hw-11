import { useGeneration } from "@/contexts/GenerationContext";
import { useThemeContext } from "@/contexts/ThemeContext";
import { getThemeColors } from "@/utilities/theme";
import React from 'react';
import { Button, FlatList, ImageSourcePropType, StyleSheet, View } from 'react-native';
import GenerationCard from '../components/GenerationCard';

type Generation = {
  id: string;
  title: string;
  image: ImageSourcePropType;
};

const generations: Generation[] = [
  { id: '1', title: 'U9', image: require('../assets/images/1.jpg') },
  { id: '2', title: 'U10', image: require('../assets/images/2.jpg') },
  { id: '3', title: 'U11', image: require('../assets/images/3.jpg') },
  { id: '4', title: 'U12', image: require('../assets/images/4.jpg') },
  { id: '5', title: 'U13', image: require('../assets/images/5.jpg') },
  { id: '6', title: 'U14', image: require('../assets/images/6.jpg') },
];

export default function GenerationsList({navigation}: {navigation: any}) {
  const { theme } = useThemeContext();
  const colors = getThemeColors(theme);
  const { setGeneration } = useGeneration();
  console.log(theme);
  
  const handleAddGeneration = () => {
    // later: navigation.navigate('AddGeneration');
    alert('Add Generation Pressed!');
  };

  const handleGenerationPress = (generation: any) => {
    setGeneration(generation);
    navigation.navigate('MembersList');
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={generations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GenerationCard
            title={item.title}
            image={item.image}
            onPress={() => handleGenerationPress(item)}
          />
        )}
        numColumns={2} 
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />

      <View style={styles.buttonContainer}> 
        <Button title="Add Generation" onPress={handleAddGeneration} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: { 
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  buttonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
});

