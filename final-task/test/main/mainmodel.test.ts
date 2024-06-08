import { PagedQueryResponse } from '@commercetools/platform-sdk';
import MainModel from '../../src/models/Main/MainModel';
import { Product as ProductCard } from '../../src/global/interfaces/products';
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
      desc: "The Arbor Ethos Rocker Snowboard is a women-specific board designed to help beginner and intermediate riders progress their skills. With a fully rockered profile and smooth, soft flex, this board offers easy turn initiation and catch-free riding. Whether you're building confidence on park features or learning to ride top-to-bottom from the summit chair, the The Arbor Ethos Rocker Snowboard inspires growth all around the mountain.",
      discount: '209.97',
      id: 'b6446fc6-4675-4f95-99e4-bc85d8510f40',
      image:
        'https://raw.githubusercontent.com/ksarise/parser/main/assets/SNW-36-01/0.jpg',
      name: "Arbor Ethos Snowboard - Women's 2024",
      price: '279.96',
    };
    expect(products[0]).toEqual(expectedProduct);
  });

  it('should return correct product data without discount', () => {
    const noDiscountProduct = JSON.parse(JSON.stringify(mockProduct));
    delete noDiscountProduct.masterVariant.prices[0].discounted;

    const mockPagedQueryResponseNoDiscount: PagedQueryResponse = {
      count: 1,
      limit: 1,
      offset: 0,
      results: [noDiscountProduct],
    };

    model.setProducts(mockPagedQueryResponseNoDiscount);
    const products = model.getProducts();
    const expectedProduct: ProductCard = {
      desc: "The Arbor Ethos Rocker Snowboard is a women-specific board designed to help beginner and intermediate riders progress their skills. With a fully rockered profile and smooth, soft flex, this board offers easy turn initiation and catch-free riding. Whether you're building confidence on park features or learning to ride top-to-bottom from the summit chair, the The Arbor Ethos Rocker Snowboard inspires growth all around the mountain.",
      discount: '0.00',
      id: 'b6446fc6-4675-4f95-99e4-bc85d8510f40',
      image:
        'https://raw.githubusercontent.com/ksarise/parser/main/assets/SNW-36-01/0.jpg',
      name: "Arbor Ethos Snowboard - Women's 2024",
      price: '279.96',
    };
    expect(products[0]).toEqual(expectedProduct);
  });

  it('should return an empty array when no products are set', () => {
    expect(model.getProducts()).toEqual([]);
  });
});
