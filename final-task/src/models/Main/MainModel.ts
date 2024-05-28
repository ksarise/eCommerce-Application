import { Product, PagedQueryResponse } from '@commercetools/platform-sdk';
import ProductCard from '../../global/interfaces/products';

export default class MainModel {
  private products: PagedQueryResponse = {
    count: 0,
    limit: 0,
    offset: 0,
    results: [],
  };

  public setProducts(products: PagedQueryResponse) {
    this.products = products;
  }

  public getData() {
    const newProducts: ProductCard[] = [];
    (this.products.results as Product[]).forEach((product: Product) => {
      const price =
        product.masterData.current.masterVariant.prices![0].value.centAmount /
        100;
      const discountPrice = product.masterData.current.masterVariant.prices?.[0]
        ?.discounted?.value?.centAmount
        ? product.masterData.current.masterVariant.prices[0].discounted.value
            .centAmount / 100
        : 0;
      const productdata: ProductCard = {
        name: product.masterData.current.name['en-US'],
        desc: product.masterData.current.description!['en-US'],
        image: product.masterData.staged.masterVariant.images![0].url,
        id: product.id,
        price: price.toFixed(2),
        discount: discountPrice.toFixed(2),
      };
      newProducts.push(productdata);
    });
    return newProducts;
  }

  public getProducts() {
    return this.getData();
  }
}
