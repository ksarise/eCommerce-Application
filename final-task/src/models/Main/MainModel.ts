import {
  PagedQueryResponse,
  Category,
  ProductProjection,
} from '@commercetools/platform-sdk';
import {
  Product as ProductCard,
  ParsedCategory,
} from '../../global/interfaces/products';

export default class MainModel {
  private products: PagedQueryResponse = {
    count: 0,
    limit: 0,
    offset: 0,
    results: [],
  };

  private categories: Category[] = [];

  private parsedCategories: Map<string, ParsedCategory> = new Map();

  public searchQuery: string[] = [];

  public selectedFilters: {
    categoryIds: string[];
    attributes: { key: string; value: string }[];
    priceRange: { min: number; max: number };
  };

  constructor() {
    this.selectedFilters = {
      categoryIds: [],
      attributes: [],
      priceRange: { min: 0, max: 5000 },
    };
  }

  public setProducts(products: PagedQueryResponse) {
    this.products = products;
  }

  public setCategories(categories: PagedQueryResponse) {
    this.categories = categories.results as Category[];
    console.log('this', this.categories);
  }

  public getData() {
    const newProducts: ProductCard[] = [];
    (this.products.results as ProductProjection[]).forEach(
      (product: ProductProjection) => {
        const price = product.masterVariant.prices![0].value.centAmount / 100;
        const discountPrice = product.masterVariant.prices?.[0]?.discounted
          ?.value?.centAmount
          ? product.masterVariant.prices[0].discounted.value.centAmount / 100
          : 0;
        const productdata: ProductCard = {
          name: product.name['en-US'],
          desc: product.description!['en-US'],
          image: product.masterVariant.images![0].url,
          id: product.id,
          price: price.toFixed(2),
          discount: discountPrice.toFixed(2),
        };
        newProducts.push(productdata);
      },
    );
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
            parentCategory.subCategories.push({
              name: category.name['en-US'],
              id: category.id,
            });
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
    console.log(this.parsedCategories);
    return this.parsedCategories;
  }

  public createFilterResponse() {
    const {
      categoryIds = [],
      attributes = [],
      priceRange = { min: 0, max: 5000 },
    } = this.selectedFilters;
    const query = [];

    // Add category filters
    if (categoryIds.length > 0) {
      const categoryFilter = categoryIds.map((categoryId) => `"${categoryId}"`);
      query.push(`categories.id:${categoryFilter}`);
    }
    // Add attribute filters
    const attributeMap: { [key: string]: string[] } = {};
    attributes.forEach(({ key, value }) => {
      if (!attributeMap[key]) {
        attributeMap[key] = [];
      }
      attributeMap[key].push(value);
    });

    Object.entries(attributeMap).forEach(([key, values]) => {
      if (values.length > 1) {
        const valueString = values.map((value) => `"${value}"`).join(',');
        query.push(`variants.attributes.${key}:${valueString}`);
      } else {
        query.push(`variants.attributes.${key}:"${values[0]}"`);
      }
    });
    // Add price range filter
    if (priceRange.min !== undefined && priceRange.max !== undefined) {
      const minPrice = priceRange.min * 100;
      const maxPrice = priceRange.max * 100;
      query.push(
        `variants.price.centAmount:range (${minPrice} to ${maxPrice})`,
      );
    }
    this.searchQuery = query;
    console.log('Search Query:', this.searchQuery);
  }

  public handleOptionListCheck(
    option: string,
    name: string,
    id: string,
    checked: boolean,
  ) {
    if (checked) {
      if (option === 'category') {
        this.selectedFilters.categoryIds.push(id);
      } else {
        if (!this.selectedFilters.attributes) {
          this.selectedFilters.attributes = [];
        }
        this.selectedFilters.attributes.push({ key: name, value: id });
      }
    } else if (option === 'category') {
      this.selectedFilters.categoryIds =
        this.selectedFilters.categoryIds.filter(
          (identifier) => identifier !== id,
        );
    } else {
      this.selectedFilters.attributes = this.selectedFilters.attributes.filter(
        (attr) => !(attr.key === name && attr.value === id),
      );
    }

    console.log('Selected Filters:', this.selectedFilters);
  }

  public handlePriceRangeChange(minPrice: number, maxPrice: number) {
    this.selectedFilters.priceRange = {
      min: minPrice,
      max: maxPrice,
    };
    console.log('Price Range:', this.selectedFilters.priceRange);
  }

  public resetFilters() {
    this.selectedFilters = {
      categoryIds: [],
      attributes: [],
      priceRange: { min: 0, max: 1000 },
    };
  }
}
