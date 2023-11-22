import {Prices} from './coffeePrices.interface';

export interface BeanState {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: string;
  imagelink_portrait: string;
  ingredients: string;
  special_ingredient: string;
  prices: Prices[];
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  type: string;
  index: number;
}
