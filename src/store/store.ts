import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

import {CoreState} from '../entities/store.interface';

export const useStore = create<CoreState>()(
  persist(
    (set, get) => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      FavouritesList: [],
      CartPrice: 0,
      CartList: [],
      OrderHistoryList: [],
    }),
    {
      name: 'coffee-app',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
