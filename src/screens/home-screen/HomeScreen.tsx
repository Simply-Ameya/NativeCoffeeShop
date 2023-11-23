import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import React, {MutableRefObject, useRef, useState} from 'react';
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
import FlatListItemsCard from '../../components/flat-list-items-card/FlatListItemsCard';

const HomeScreen = () => {
  const coffeeList = useStore((state: CoreState) => state.CoffeeList);
  const beanList = useStore((state: CoreState) => state.BeanList);

  const listRef = useRef() as MutableRefObject<FlatList>;

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

  //event handlers
  const searchCoffee = (search: string) => {
    if (search != 'empty') {
      listRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });

      setCategoryIndex({index: 0, category: categories[0]});
      setSortedCoffee(HomeScreenHelper.searchCoffeeResilt(coffeeList, search));
    }
  };

  const resetSearchCoffee = () => {
    listRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({index: 0, category: categories[0]});
    setSortedCoffee([...coffeeList]);
    setSearchText('');
  };

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
          <TouchableOpacity onPress={() => searchCoffee(searchText)}>
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
            onChangeText={(text: string) => {
              setSearchText(text);
              searchCoffee(searchText);
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
          />

          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => resetSearchCoffee()}>
              <CustomIcon
                name="close"
                size={FONTSIZE.size_16}
                color={COLORS.primaryLightGreyHex}
                style={styles.InputIcon}
              />
            </TouchableOpacity>
          )}
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
                  listRef?.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
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

        {/* Coffee list */}
        <FlatList
          ref={listRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryText}>No Coffee Found</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={(item: CoffeeState) => item.id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => {}}>
              <FlatListItemsCard
                name={item.name}
                id={item.id}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                prices={item.prices[2]}
                buttonPressHandler={() => {}}
              />
            </TouchableOpacity>
          )}
        />

        <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>

        {/* Beans flat list */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={beanList}
          contentContainerStyle={[
            styles.FlatListContainer,
            {marginBottom: tabBarHeight},
          ]}
          keyExtractor={(item: CoffeeState) => item.id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => {}}>
              <FlatListItemsCard
                name={item.name}
                id={item.id}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                prices={item.prices[2]}
                buttonPressHandler={() => {}}
              />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
