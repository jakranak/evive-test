export enum MealTypesEnum {
  Breakfast = 'breakfast',
  Lunch = 'lunch',
  Dinner = 'dinner'
}

export enum ItemTypesEnum {
  Main = 'main',
  Side = 'side',
  Drink = 'drink',
  Dessert = 'dessert'
}

export interface IOrder {
  [ItemTypesEnum.Main]: string,
  [ItemTypesEnum.Side]: string,
  [ItemTypesEnum.Drink]: string,
  [ItemTypesEnum.Dessert]: string
}

export interface IMenu {
  [key: string]: {
    item: string,
    type: ItemTypesEnum
  }
}
