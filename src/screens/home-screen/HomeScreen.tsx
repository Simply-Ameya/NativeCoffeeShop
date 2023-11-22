import {View, Text, StatusBar, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useStore} from '../../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import {CoreState} from '../../entities/store.interface';
import {CoffeeState} from '../../entities/coffeeData.interface';

import * as HomeScreenHelper from '../../helper/homeScreenHelper';
import {styles} from './HomeScreen.styles';
import {COLORS} from '../../theme/theme';
import HeaderBar from '../../components/header-bar/HeaderBar';

const HomeScreen = () => {
  const coffeeList = useStore((state: CoreState) => state.CoffeeList);
  const beanList = useStore((state: CoreState) => state.BeanList);

  const tabBarHeight = useBottomTabBarHeight();

  //component state
  const [categories, setCategories] = useState<string[]>(
    HomeScreenHelper.getCategoriesFromData(coffeeList),
  );
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState<CoffeeState[]>(
    HomeScreenHelper.getCoffeeList(categoryIndex.category, coffeeList),
  );

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        {/* App Header */}
        <HeaderBar />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
