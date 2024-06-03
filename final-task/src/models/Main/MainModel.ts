import {
  Product,
  PagedQueryResponse,
  Category,
} from '@commercetools/platform-sdk';
import { Product as ProductCard } from '../../global/interfaces/products';

interface ParsedCategory {
  name: string;
  subCategories: string[];
}

export default class MainModel {
  private products: PagedQueryResponse = {
    count: 0,
    limit: 0,
    offset: 0,
    results: [],
  };

  private categories: Category[] = [];

  private parsedCategories: Map<string, ParsedCategory> = new Map();

  public setProducts(products: PagedQueryResponse) {
    this.products = products;
  }

  public setCategories(categories: PagedQueryResponse) {
    this.categories = categories.results as Category[];
    console.log('this', this.categories);
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

  private parseCategories(categories: Map<string, Category>) {
    categories.forEach((category) => {
      if (!category.parent) {
        this.parsedCategories.set(category.id, {
          name: category.name['en-US'],
          subCategories: [],
        });
      }
    });

    categories.forEach((category) => {
      if (category.parent) {
        const parentId = category.parent?.id;
        if (parentId) {
          const parentCategory = this.parsedCategories.get(parentId);
          if (parentCategory) {
            parentCategory.subCategories.push(category.name['en-US']);
          } else {
            console.error(`Main category ${parentId} not found`);
          }
        }
      }
    });
  }

  public getParsedCategories() {
    this.parseCategories(
      new Map(this.categories.map((category) => [category.id, category])),
    );
    return this.parsedCategories;
  }
}
