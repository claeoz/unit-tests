import { TestBed } from '@angular/core/testing';

import { PriceCalculatorService } from './price-calculator.service';

describe('PriceCalculatorService', () => {
  let service: PriceCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('if it is bellow bulk threshold price should be simply price * quantity', () => {
    const quantity: number = 5;
    const price: number = 5.67;

    const result = service.calculateFinalPrice(price, quantity)

    expect(result).toBe(30.62)
  });

  it('if it is above bulk threshold bulk discount should apply', () => {
    const quantity: number = 100;
    const price: number = 14.67;

    const result = service.calculateFinalPrice(price, quantity)

    expect(result).toBe(1,426.92)
  });

  it('this makes sure quantity is never negative', () => {
    expect(() => {
      service.calculateFinalPrice(3.21, -10)
    }).toThrowError()
  });
  it('this makes sure price is never negative', () => {
    expect(() => {
      service.calculateFinalPrice(-3.21, 10)
    }).toThrowError()
  });
  it('should round the result to 2 decimal places', () => {
  const price = 6.6666;
  const quantity = 3;
  const result = service.calculateFinalPrice(price, quantity);

  expect(result).toBeCloseTo(21.60, 2);
  });

});
