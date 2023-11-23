import {ImageProps} from 'react-native';
import {Prices} from './prices.interface';

export interface FlatListItemsCardProps {
  name: string;
  id: string;
  index: number;
  type: string;
  roasted: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  average_rating: number;
  prices: Prices;
  buttonPressHandler: any;
}
