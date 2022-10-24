import { Injectable } from '@angular/core';
import { IOrder, ItemTypesEnum, MealTypesEnum } from '../typings/order.typings'
import { breakfastMenu, lunchMenu, dinnerMenu } from '../constants/menus';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  private _outputOrderObject: IOrder = {
    [ItemTypesEnum.Main]: '',
    [ItemTypesEnum.Side]: '',
    [ItemTypesEnum.Drink]: '',
    [ItemTypesEnum.Dessert]: ''
  };

  private _processError = 'Unable to process:';
  private _notOnMenuError = 'not on menu';
  private _noMainError = 'Main is missing';
  private _noSideError = 'Side is missing';
  private _noDessertError = 'Dessert is missing';
  private _duplicateError = 'cannot be ordered more than once';

  public handleOrder(order: string): string {
    this._resetOutput();
    const orderSplit = order.trim().split(' ');
    let orderOutput: string;

    switch (orderSplit[0].toLowerCase()) {
      case MealTypesEnum.Breakfast:
        orderOutput = this._breakfastOrder(orderSplit.slice(1).join(''));
        break;
      case MealTypesEnum.Lunch:
        orderOutput = this._lunchOrder(orderSplit.slice(1).join(''));
        break;
      case MealTypesEnum.Dinner:
        orderOutput = this._dinnerOrder(orderSplit.slice(1).join(''));
        break;
      default:
        return `${this._processError} Invalid meal type`
    }
    return orderOutput;
  }

  private _breakfastOrder(order: string): string {
    if (!order) {
      return this._handleError(true, true, false);
    }

    let coffeeCount = 0;

    const orderArr = order.split(',');
    for (const el of orderArr) {
      const orderNum = el.trim();
      if (!breakfastMenu[orderNum]) {
        return `${this._processError} ${orderNum} ${this._notOnMenuError}`;
      } else if (breakfastMenu[orderNum].type === ItemTypesEnum.Drink) {
        if (!this._outputOrderObject[ItemTypesEnum.Drink].length) {
          this._outputOrderObject[ItemTypesEnum.Drink] = breakfastMenu[orderNum].item;
        } else if (this._outputOrderObject[ItemTypesEnum.Drink] !== breakfastMenu[orderNum].item
          && (this._outputOrderObject[ItemTypesEnum.Drink] !== 'Coffee' || breakfastMenu[orderNum].item !== 'Coffee')) {
          return `${this._processError} Multiple drink orders only allowed for coffee`
        } else if (breakfastMenu[orderNum].item !== 'Coffee') {
          return `${this._processError} ${breakfastMenu[orderNum].item} ${this._duplicateError}`
        }
        if (breakfastMenu[orderNum].item === 'Coffee') {
          coffeeCount++;
        }
      } else {
        if (!this._outputOrderObject[breakfastMenu[orderNum].type].length) {
          this._outputOrderObject[breakfastMenu[orderNum].type] = breakfastMenu[orderNum].item
        } else {
          return `${this._processError} ${breakfastMenu[orderNum].item} ${this._duplicateError}`
        }
      }
    }

    if (this._outputOrderObject[ItemTypesEnum.Main] === '' || this._outputOrderObject[ItemTypesEnum.Side] === '') {
      return this._handleError(this._outputOrderObject[ItemTypesEnum.Main] === '', this._outputOrderObject[ItemTypesEnum.Side] === '', false);
    }

    if (coffeeCount > 1) {
      this._outputOrderObject[ItemTypesEnum.Drink] = `Coffee(${coffeeCount})`
    }

    this._handleWater();

    return `${this._outputOrderObject[ItemTypesEnum.Main]}, ${this._outputOrderObject[ItemTypesEnum.Side]}, ${this._outputOrderObject[ItemTypesEnum.Drink]}`;
  }

  private _lunchOrder(order: string): string {
    if (!order) {
      return this._handleError(true, true, false);
    }

    const lunchSides: { [key: string]: number } = {};

    const orderArr = order.split(',');
    for (const el of orderArr) {
      const orderNum = el.trim();
      if (!lunchMenu[orderNum]) {
        return `${this._processError} ${orderNum} ${this._notOnMenuError}`
      } else if (lunchMenu[orderNum].type === ItemTypesEnum.Side) {
        if (lunchSides[lunchMenu[orderNum].item]) {
          lunchSides[lunchMenu[orderNum].item]++
        } else {
          lunchSides[lunchMenu[orderNum].item] = 1;
        }
      } else {
        if (!this._outputOrderObject[lunchMenu[orderNum].type].length) {
          this._outputOrderObject[lunchMenu[orderNum].type] = lunchMenu[orderNum].item
        } else {
          return `${this._processError} ${lunchMenu[orderNum].item} ${this._duplicateError}`
        }
      }
    }

    if (this._outputOrderObject[ItemTypesEnum.Main] === '' || !Object.keys(lunchSides).length) {
      return this._handleError(this._outputOrderObject[ItemTypesEnum.Main] === '', !Object.keys(lunchSides).length, false);
    }

    const sides = Object.entries(lunchSides).map((side) => {
      if (side[1] > 1) {
        return `${side[0]}(${side[1]})`
      } else {
        return side[0]
      }
    })

    this._handleWater();

    return `${this._outputOrderObject[ItemTypesEnum.Main]}, ${sides.join(', ')}, ${this._outputOrderObject[ItemTypesEnum.Drink]}`;
  }

  private _dinnerOrder(order: string): string {
    if (!order) {
      return this._handleError(true, true, true);
    }

    const orderArr = order.split(',');
    for (const el of orderArr) {
      const orderNum = el.trim();
      if (!dinnerMenu[orderNum]) {
        return `${this._processError} ${orderNum} ${this._notOnMenuError}`;
      } else {
        if (!this._outputOrderObject[dinnerMenu[orderNum].type].length) {
          this._outputOrderObject[dinnerMenu[orderNum].type] = dinnerMenu[orderNum].item;
        } else {
          return `${this._processError} ${dinnerMenu[orderNum].item} ${this._duplicateError}`;
        }
      }
    }

    if (this._outputOrderObject[ItemTypesEnum.Main] === '' || this._outputOrderObject[ItemTypesEnum.Side] === '' || this._outputOrderObject[ItemTypesEnum.Dessert] === '') {
      return this._handleError(this._outputOrderObject[ItemTypesEnum.Main] === '', this._outputOrderObject[ItemTypesEnum.Side] === '', this._outputOrderObject[ItemTypesEnum.Dessert] === '');
    }

    const drinkOutput = this._outputOrderObject[ItemTypesEnum.Drink].length ? `${this._outputOrderObject[ItemTypesEnum.Drink]}, Water` : 'Water'

    return `${this._outputOrderObject[ItemTypesEnum.Main]}, ${this._outputOrderObject[ItemTypesEnum.Side]}, ${drinkOutput}, ${this._outputOrderObject[ItemTypesEnum.Dessert]}`;
  }


  private _handleError(isMainMissing: boolean, isSideMissing: boolean, isDessertMissing: boolean) {
    const mainError = isMainMissing ? this._noMainError : '';
    const sideError = !isSideMissing
      ? ''
      : isMainMissing
        ? `, ${this._noSideError.toLowerCase()}`
        : this._noSideError;
    const dessertError = !isDessertMissing
      ? ''
      : isMainMissing || isSideMissing
        ? `, ${this._noDessertError.toLowerCase()}`
        : this._noDessertError;
    return `${this._processError} ${mainError}${sideError}${dessertError}`;
  }

  private _handleWater() {
    if (this._outputOrderObject[ItemTypesEnum.Drink] === '') {
      this._outputOrderObject[ItemTypesEnum.Drink] = 'Water';
    }
  }

  private _resetOutput() {
    this._outputOrderObject = {
      [ItemTypesEnum.Main]: '',
      [ItemTypesEnum.Side]: '',
      [ItemTypesEnum.Drink]: '',
      [ItemTypesEnum.Dessert]: ''
    };
  }
}
