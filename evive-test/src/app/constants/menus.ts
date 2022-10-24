import { IMenu, ItemTypesEnum } from "../typings/order.typings"

export const breakfastMenu: IMenu = {
  1: {
    item: 'Eggs',
    type: ItemTypesEnum.Main
  },
  2: {
    item: 'Toast',
    type: ItemTypesEnum.Side
  },
  3: {
    item: 'Coffee',
    type: ItemTypesEnum.Drink
  },
  4: {
    item: 'Pancake',
    type: ItemTypesEnum.Main
  },
  5: {
    item: 'Hash Browns',
    type: ItemTypesEnum.Side
  },
  6: {
    item: 'Water',
    type: ItemTypesEnum.Drink
  }
};

export const lunchMenu: IMenu = {
  1: {
    item: 'Sandwich',
    type: ItemTypesEnum.Main
  },
  2: {
    item: 'Chips',
    type: ItemTypesEnum.Side
  },
  3: {
    item: 'Soda',
    type: ItemTypesEnum.Drink
  },
  4: {
    item: 'Salad',
    type: ItemTypesEnum.Main
  },
  5: {
    item: 'Fries',
    type: ItemTypesEnum.Side
  },
  6: {
    item: 'Water',
    type: ItemTypesEnum.Drink
  }
};

export const dinnerMenu: IMenu = {
  1: {
    item: 'Steak',
    type: ItemTypesEnum.Main
  },
  2: {
    item: 'Potatoes',
    type: ItemTypesEnum.Side
  },
  3: {
    item: 'Wine',
    type: ItemTypesEnum.Drink
  },
  4: {
    item: 'Cake',
    type: ItemTypesEnum.Dessert
  },
  5: {
    item: 'Chicken',
    type: ItemTypesEnum.Main
  },
  6: {
    item: 'Salad',
    type: ItemTypesEnum.Side
  },
  7: {
    item: 'Soda',
    type: ItemTypesEnum.Drink
  },
  8: {
    item: 'Pie',
    type: ItemTypesEnum.Dessert
  }
};
