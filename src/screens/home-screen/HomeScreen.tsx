import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useStore} from '../../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import {CoreState} from '../../entities/store.interface';
import {CoffeeState} from '../../entities/coffeeData.interface';
import {CategoryIndex} from '../../entities/categoryIndex.interface';

import * as HomeScreenHelper from '../../helper/homeScreenHelper';

import {styles} from './HomeScreen.styles';
import {COLORS, FONTSIZE} from '../../theme/theme';

import HeaderBar from '../../components/header-bar/HeaderBar';
import CustomIcon from '../../components/CustomIcon';

const HomeScreen = () => {
  const coffeeList = useStore((state: CoreState) => state.CoffeeList);
  const beanList = useStore((state: CoreState) => state.BeanList);

  const tabBarHeight = useBottomTabBarHeight();

  //component state
  const [categories, setCategories] = useState<string[]>(
    HomeScreenHelper.getCategoriesFromData(coffeeList),
  );
  const [searchText, setSearchText] = useState<string>('');
  const [categoryIndex, setCategoryIndex] = useState<CategoryIndex>({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState<CoffeeState[]>(
    HomeScreenHelper.getCoffeeList(categoryIndex.category, coffeeList),
  );
  // console.log(sortedCoffee.length);
  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        {/* App Header */}
        <HeaderBar />

        <Text style={styles.ScreenTile}>
          Find the best{'\n'}coffee for you.
        </Text>

        {/* Search Input */}
        <View style={styles.InputContainer}>
          <TouchableOpacity onPress={() => {}}>
            <CustomIcon
              name="search"
              size={FONTSIZE.size_18}
              color={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
              style={styles.InputIcon}
            />
          </TouchableOpacity>

          <TextInput
            placeholder="Find coffee....."
            style={styles.TextInputContainer}
            value={searchText}
            onChangeText={(text: string) => setSearchText(text)}
            placeholderTextColor={COLORS.primaryLightGreyHex}
          />
        </View>

        {/* Category Scroller */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollView}>
          {categories.map((category: string, index: number) => (
            <View key={index} style={styles.CategoryViewContainer}>
              <TouchableOpacity
                onPress={() => {
                  setCategoryIndex({index, category});
                  setSortedCoffee(
                    HomeScreenHelper.getCoffeeList(category, coffeeList),
                  );
                }}
                style={styles.CategoryScrollViewItem}>
                <Text
                  style={[
                    styles.CategoryText,
                    categoryIndex.index === index && styles.CategoryTextActive,
                  ]}>
                  {category}
                </Text>

                {categoryIndex.index === index && (
                  <View style={styles.ActiveCategory} />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
