import {
  PagedQueryResponse,
  Category,
  ProductProjection,
} from '@commercetools/platform-sdk';
import {
  Product as ProductCard,
  ParsedCategory,
} from '../../global/interfaces/products';
import CartPageModel from '../Cart/CartModel';

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

  public sort: string = 'name.en-US asc';

  public textSearch: string = '';

  public currentCategory: { name: string; id: string } | null = null;

  public selectedFilters: {
    attributes: { key: string; value: string }[];
    priceRange: { min: number; max: number };
  };

  public variantsInCart: { [key: string]: string }[] = [];

  public cartProducts = [];

  private cartModel: CartPageModel;

  constructor(cartModel: CartPageModel) {
    this.cartModel = cartModel;
    this.getVariantsFromCart();
    this.selectedFilters = {
      attributes: [],
      priceRange: { min: 0, max: 1000 },
    };
  }

  public setProducts(products: PagedQueryResponse) {
    this.products = products;
  }

  // public addProducts(products: PagedQueryResponse) {
  //   this.products = this.products.concat(products);
  // }

  public setCategories(categories: PagedQueryResponse) {
    this.categories = categories.results as Category[];
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
        const sizes = product.variants
          ?.map((variant) => {
            return (
              variant.attributes?.find((attribute) => attribute.name === 'Size')
                ?.value || ''
            );
          })
          .filter((size) => size !== '');
        const productdata: ProductCard = {
          name: product.name['en-US'],
          desc: product.description!['en-US'],
          image: product.masterVariant.images![0].url,
          id: product.id,
          price: price.toFixed(2),
          discount: discountPrice.toFixed(2),
          sizesList: sizes,
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
    return this.parsedCategories;
  }

  public createFilterResponse() {
    const { attributes = [], priceRange = { min: 0, max: 5000 } } =
      this.selectedFilters;
    const query = [];

    // Add category filter
    if (this.currentCategory) {
      query.push(`categories.id:"${this.currentCategory.id}"`);
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
  }

  public handleOptionListCheck(
    option: string,
    name: string,
    id: string,
    checked: boolean,
    main?: string,
  ) {
    if (checked) {
      if (option === 'category') {
        MainModel.updateURLWithCategory(name, main!);
        this.currentCategory = { name, id };
      } else {
        if (!this.selectedFilters.attributes) {
          this.selectedFilters.attributes = [];
        }
        this.selectedFilters.attributes.push({ key: name, value: id });
      }
    } else if (option === 'attribute') {
      this.selectedFilters.attributes = this.selectedFilters.attributes.filter(
        (attr) => !(attr.key === name && attr.value === id),
      );
    }
  }

  static updateURLWithCategory(name: string, main: string) {
    const currentURL = new URL(window.location.href);
    if (main) {
      currentURL.pathname = `categories/${main.toLowerCase()}/${name.toLowerCase()}`;
    } else {
      currentURL.pathname = `categories/${name.toLowerCase()}`;
    }
    window.history.pushState({}, '', currentURL.toString());
  }

  public handlePriceRangeChange(minPrice: number, maxPrice: number) {
    this.selectedFilters.priceRange = {
      min: minPrice,
      max: maxPrice,
    };
  }

  public resetFilters() {
    this.selectedFilters = {
      attributes: [],
      priceRange: { min: 0, max: 1000 },
    };
    this.currentCategory = null;
    this.textSearch = '';
  }

  public handleSort(value: string) {
    this.sort = value;
  }

  public handleSearch(value: string) {
    this.textSearch = value;
  }

  public async getVariantsFromCart() {
    const cartId = localStorage.getItem('cartId');
    let currentCart;
    if (cartId) {
      currentCart = await this.cartModel.getCartById(cartId);
    }
    this.variantsInCart = [];
    currentCart?.lineItems.forEach((item) => {
      this.variantsInCart = [
        ...this.variantsInCart,
        {
          productId: item.productId,
          variantId: item.variant.id.toString(),
        },
      ];
    });
  }
}
