import { PagedQueryResponse } from '@commercetools/platform-sdk';
import MainModel from '../../src/models/Main/MainModel';
import ProductCard from '../../src/global/interfaces/products';
import mockProduct from './mockProduct.json';

describe('MainModel', () => {
  let model: MainModel;

  const mockPagedQueryResponse: PagedQueryResponse = {
    count: 1,
    limit: 1,
    offset: 0,
    results: [mockProduct],
  };

  beforeEach(() => {
    model = new MainModel();
  });

  it('should set products correctly', () => {
    model.setProducts(mockPagedQueryResponse);
    expect(model.getProducts()).toHaveLength(1);
  });

  it('should return correct product data', () => {
    model.setProducts(mockPagedQueryResponse);
    const products = model.getProducts();
    const expectedProduct: ProductCard = {
      name: 'MB PREMIUM TECH T',
      desc: 'Sample description',
      image: 'https://commercetools.com/cli/data/253245821_1.jpg',
      id: 'e7ba4c75-b1bb-483d-94d8-2c4a10f78472',
      price: 100.0,
      discount: 80.0,
    };
    expect(products[0]).toEqual(expectedProduct);
  });

  it('should return correct product data without discount', () => {
    const noDiscountProduct = JSON.parse(JSON.stringify(mockProduct));
    delete noDiscountProduct.masterData.current.masterVariant.prices[0]
      .discounted;

    const mockPagedQueryResponseNoDiscount: PagedQueryResponse = {
      count: 1,
      limit: 1,
      offset: 0,
      results: [noDiscountProduct],
    };

    model.setProducts(mockPagedQueryResponseNoDiscount);
    const products = model.getProducts();
    const expectedProduct: ProductCard = {
      name: 'MB PREMIUM TECH T',
      desc: 'Sample description',
      image: 'https://commercetools.com/cli/data/253245821_1.jpg',
      id: 'e7ba4c75-b1bb-483d-94d8-2c4a10f78472',
      price: 100.0,
      discount: 0,
    };
    expect(products[0]).toEqual(expectedProduct);
  });

  it('should return an empty array when no products are set', () => {
    expect(model.getProducts()).toEqual([]);
  });
});
