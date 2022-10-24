import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return invalid meal type error', () => {
    const output = service.handleOrder('Brunch 1,2,3');
    expect(output).toEqual(`${processError} Invalid meal type`);
  });

  const processError = 'Unable to process:';
  const duplicateError = 'cannot be ordered more than once';
  const notOnMenuError = 'not on menu';

  describe('Breakfast Order', () => {
    const order1 = 'Eggs, Toast, Coffee';
    const order2 = 'Pancake, Hash Browns, Water';

    it('Should return correct breakfast order', () => {
      const output = service.handleOrder('Breakfast 1,2,3');
      expect(output).toEqual(order1);
      const output2 = service.handleOrder('Breakfast 4,5,6')
      expect(output2).toEqual(order2);
    });

    it('shoud handle drink orders', () => {
      const output = service.handleOrder('Breakfast 1,2,3,3,3');
      expect(output).toEqual('Eggs, Toast, Coffee(3)');
      const output2 = service.handleOrder('Breakfast 1,2');
      expect(output2).toEqual('Eggs, Toast, Water');
      const output3 = service.handleOrder('Breakfast 1,2,3,6');
      expect(output3).toEqual(`${processError} Multiple drink orders only allowed for coffee`)
    });

    it('should be able to handle items out of order, different capitalization, and extra spaces', () => {
      const output = service.handleOrder(' breakfast 2, 3, 1');
      expect(output).toEqual(order1);
      const output2 = service.handleOrder(' BREAKFAST  6,4,5   ');
      expect(output2).toEqual(order2);
    });

    it('should return correct "Unable to process" errors', () => {
      const output = service.handleOrder('Breakfast 1');
      expect(output).toEqual(`${processError} Side is missing`);
      const output2 = service.handleOrder('Breakfast 2');
      expect(output2).toEqual(`${processError} Main is missing`);
      const output3 = service.handleOrder('Breakfast');
      expect (output3).toEqual(`${processError} Main is missing, side is missing`);
      const output4 = service.handleOrder('Breakfast 10,11,12');
      expect (output4).toEqual(`${processError} 10 ${notOnMenuError}`);
    });

    it('should return correct dublicate order errors', () => {
      const output = service.handleOrder('Breakfast 1,1,2,3');
      expect(output).toEqual(`${processError} Eggs ${duplicateError}`);
      const output2 = service.handleOrder('Breakfast 1,2,2,3');
      expect(output2).toEqual(`${processError} Toast ${duplicateError}`);
    });
  });

  describe('Lunch Order', () => {
    const order1 = 'Sandwich, Chips, Soda';
    const order2 = 'Salad, Fries, Water';
    const processError = 'Unable to process:';
    const duplicateError = 'cannot be ordered more than once';

    it('Should return correct lunch order', () => {
      const output = service.handleOrder('Lunch 1,2,3');
      expect(output).toEqual(order1);
      const output2 = service.handleOrder('Lunch 4,5,6')
      expect(output2).toEqual(order2);
      const output3 = service.handleOrder('Lunch 1,2');
      expect(output3).toEqual('Sandwich, Chips, Water');
    });

    it('should be able to handle multiple sides', () => {
      const output = service.handleOrder('Lunch 1,2,2');
      expect(output).toEqual('Sandwich, Chips(2), Water');
      const output2 = service.handleOrder('Lunch 1,5,5,5,3');
      expect(output2).toEqual('Sandwich, Fries(3), Soda')
    })

    it('should be able to handle items out of order, different capitalization, and extra spaces', () => {
      const output = service.handleOrder(' lunch 2, 3, 1');
      expect(output).toEqual(order1);
      const output2 = service.handleOrder(' LUNCH  6,4,5   ');
      expect(output2).toEqual(order2);
    });

    it('should return correct "Unable to process" errors', () => {
      const output = service.handleOrder('Lunch 1');
      expect(output).toEqual(`${processError} Side is missing`);
      const output2 = service.handleOrder('Lunch 2');
      expect(output2).toEqual(`${processError} Main is missing`);
      const output3 = service.handleOrder('Lunch');
      expect (output3).toEqual(`${processError} Main is missing, side is missing`);
      const output4 = service.handleOrder('Lunch 10,11,12');
      expect (output4).toEqual(`${processError} 10 ${notOnMenuError}`);
    });

    it('should return correct dublicate order errors', () => {
      const output = service.handleOrder('Lunch 1,1,2,3');
      expect(output).toEqual(`${processError} Sandwich ${duplicateError}`);
      const output2 = service.handleOrder('Lunch 1,2,3,3');
      expect(output2).toEqual(`${processError} Soda ${duplicateError}`);
    });
  });

  describe('Dinner Order', () => {
    const order1 = 'Steak, Potatoes, Wine, Water, Cake';
    const order2 = 'Chicken, Salad, Soda, Water, Pie';
    const processError = 'Unable to process:';
    const duplicateError = 'cannot be ordered more than once';

    it('Should return correct lunch order', () => {
      const output = service.handleOrder('Dinner 1,2,3,4');
      expect(output).toEqual(order1);
      const output2 = service.handleOrder('Dinner 5,6,7,8')
      expect(output2).toEqual(order2);
    });

    it('should be able to handle items out of order, different capitalization, and extra spaces', () => {
      const output = service.handleOrder(' dinner 2, 3, 4, 1');
      expect(output).toEqual(order1);
      const output2 = service.handleOrder(' DINNER  6,7,5,8   ');
      expect(output2).toEqual(order2);
    });

    it('should return correct "Unable to process" errors', () => {
      const output = service.handleOrder('Dinner 1,3,4');
      expect(output).toEqual(`${processError} Side is missing`);
      const output2 = service.handleOrder('Dinner 2,3,4');
      expect(output2).toEqual(`${processError} Main is missing`);
      const output3 = service.handleOrder('Dinner 1,3');
      expect(output3).toEqual(`${processError} Side is missing, dessert is missing`);
      const output4 = service.handleOrder('Dinner');
      expect (output4).toEqual(`${processError} Main is missing, side is missing, dessert is missing`);
      const output5 = service.handleOrder('Dinner 10,11,12');
      expect (output5).toEqual(`${processError} 10 ${notOnMenuError}`);
    });

    it('should return correct dublicate order errors', () => {
      const output = service.handleOrder('Dinner 1,1,2,3,4');
      expect(output).toEqual(`${processError} Steak ${duplicateError}`);
      const output2 = service.handleOrder('Dinner 1,2,3,3,4');
      expect(output2).toEqual(`${processError} Wine ${duplicateError}`);
      const output3 = service.handleOrder('Dinner 1,2,3,4,4');
      expect(output3).toEqual(`${processError} Cake ${duplicateError}`);
    });
  });

});
