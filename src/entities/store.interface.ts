import {CoffeeState} from './coffeeData.interface';
import {BeanState} from './beanData.interface';

export interface CoreState {
  CoffeeList: CoffeeState[];
  BeanList: BeanState[];
  FavouritesList: [];
  CartPrice: number;
  CartList: [];
  OrderHistoryList: [];
}
