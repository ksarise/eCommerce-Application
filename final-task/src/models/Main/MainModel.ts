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
      const productdata: ProductCard = {
        name: product.masterData.current.name['en-US'],
        desc: product.masterData.current.description!['en-US'],
        image: product.masterData.staged.masterVariant.images![0].url,
        id: product.id,
      };
      newProducts.push(productdata);
    });
    return newProducts;
  }

  public getProducts() {
    return this.getData();
  }
}
