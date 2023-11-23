import {CoffeeState} from '../entities/coffeeData.interface';
import {Dictionary} from '../entities/common.interface';

export const getCategoriesFromData = (data: CoffeeState[]) => {
  let temp: Dictionary = {};

  data.forEach((each: CoffeeState) => {
    if (temp[each.name] === undefined) {
      temp[each.name] = 1;
    } else {
      temp[each.name]++;
    }
  });

  let categories = Object.keys(temp);
  categories.unshift('All');

  return categories;
};

export const getCoffeeList = (category: string, data: CoffeeState[]) => {
  if (category === 'All') {
    return data;
  } else {
    return data.filter((each: CoffeeState) => each.name === category);
  }
};

export const searchCoffeeResilt = (
  coffeeList: CoffeeState[],
  searchString: string,
) => {
  return [
    ...coffeeList.filter((item: CoffeeState) =>
      item.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()),
    ),
  ];
};
