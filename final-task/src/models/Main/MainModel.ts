import {
  PagedQueryResponse,
  Category,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
  RangeFacetResult,
  Cart,
  ProductType,
} from '@commercetools/platform-sdk';
import {
  Product as ProductCard,
  ParsedCategory,
} from '../../global/interfaces/products';

export default class MainModel {
  private products: ProductProjectionPagedSearchResponse = {
    count: 0,
    limit: 0,
    offset: 0,
    facets: {},
    results: [],
  };

  private categories: Category[] = [];

  public parsedCategories: Map<string, ParsedCategory> = new Map();

  public searchQuery: string[] = [];

  public sort: string = 'name.en-US asc';

  public textSearch: string = '';

  public attributesGroup: {
    specsMap: { [key: string]: { [key: string]: string } };
    specsTableMap: { [key: string]: { [key: string]: string } };
    detailsMap: { [key: string]: { [key: string]: string } };
  } = {
    specsMap: {},
    specsTableMap: {},
    detailsMap: {},
  };

  public currentCategory: { name: string; id: string } | null = null;

  public selectedFilters: {
    attributes: { key: string; value: string }[];
    priceRange: { min: number; max: number };
  };

  public variantsInCart: { [key: string]: string }[] = [];

  public cartProducts = [];

  constructor() {
    this.selectedFilters = {
      attributes: [],
      priceRange: { min: 0, max: 1000 },
    };
  }

  public setProducts(products: ProductProjectionPagedSearchResponse) {
    this.products = products;
  }

  public setCategories(categories: PagedQueryResponse) {
    this.categories = categories.results as Category[];
  }

  public getData() {
    const newProducts: ProductCard[] = [];
    let priceRangeFacet = { min: 0, max: 0, mean: 0 };
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
              variant.attributes?.find(
                (attribute) => attribute.name === 'SpecsTable_Size',
              )?.value.key || ''
            );
          })
          .filter((size) => size !== '');
        const gender = MainModel.markGenderCategory(product);
        const isSplit = product.slug['en-US'].includes('Splitboard');
        const productdata: ProductCard = {
          name: product.name['en-US'],
          desc: product.description!['en-US'],
          image: product.masterVariant.images![0].url,
          id: product.id,
          price: price.toFixed(2),
          discount: discountPrice.toFixed(2),
          sizesList: sizes,
          options: {
            gender,
            split: isSplit ? 'Split' : '',
          },
        };
        newProducts.push(productdata);
      },
    );
    const priceFacet = this.products.facets[
      'variants.price.centAmount'
    ] as RangeFacetResult;

    if (priceFacet && priceFacet.ranges) {
      const priceRanges = priceFacet.ranges?.[0];
      if (priceRanges) {
        priceRangeFacet = {
          min: priceRanges.min,
          max: priceRanges.max,
          mean: priceRanges.mean,
        };
      }
    }
    return { products: newProducts, priceRangeFacets: priceRangeFacet };
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
        query.push(`variants.attributes.${key}.key:${valueString}`);
      } else {
        query.push(`variants.attributes.${key}.key:"${values[0]}"`);
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
    console.log(name, main);
    const currentURL = new URL(window.location.href);
    if (main) {
      currentURL.pathname = `catalog/categories/${main.toLowerCase()}/${name.toLowerCase()}`;
    } else {
      currentURL.pathname = `catalog/categories/${name.toLowerCase()}`;
    }
    console.log(currentURL.toString());
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

  public async getVariantsFromCart(currentCart: Cart) {
    this.variantsInCart = [];
    if (!currentCart) return;
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

  public async getFullAttributesFromType(body: ProductType) {
    const specsMap: { [key: string]: { [key: string]: string } } = {};
    const specsTableMap: { [key: string]: { [key: string]: string } } = {};
    const detailsMap: { [key: string]: { [key: string]: string } } = {};

    body.attributes!.forEach((attribute) => {
      const { name, type } = attribute;
      if (type.name === 'enum') {
        const attributeName = `${name}`;
        const valueMap: { [key: string]: string } = {};
        type.values.forEach((value) => {
          if (value.key !== '') {
            valueMap[value.label] = value.key;
          }
        });
        if (name.startsWith('Specs_')) {
          specsMap[attributeName] = valueMap;
        } else if (name.startsWith('SpecsTable_')) {
          specsTableMap[attributeName] = valueMap;
        } else if (name.startsWith('Details_')) {
          detailsMap[attributeName] = valueMap;
        }
      }
    });
    // const specsMapArray = Object.entries(specsMap);
    // const specsTableMapArray = Object.entries(specsTableMap);
    // const detailsMapArray = Object.entries(detailsMap);

    // specsMapArray.sort((a, b) => a[0].localeCompare(b[0]));
    // specsTableMapArray.sort((a, b) => a[0].localeCompare(b[0]));
    // detailsMapArray.sort((a, b) => a[0].localeCompare(b[0]));
    // this.attributesGroup = {
    //   specsMap: Object.fromEntries(specsMapArray),
    //   specsTableMap: Object.fromEntries(specsTableMapArray),
    //   detailsMap: Object.fromEntries(detailsMapArray),
    // };
    this.attributesGroup = {
      specsMap,
      specsTableMap,
      detailsMap,
    };
  }

  static markGenderCategory(product: ProductProjection) {
    const femaleCategoryIds = [
      'e7b30d52-7126-49ea-97a6-b64cf33e6381',
      '4aa9cfa6-5541-4754-853b-9121c3340516',
    ];

    const maleCategoryIds = [
      '07788de1-155d-4299-a3da-1faded7b52a9',
      '2426b46a-daf2-43a2-8b54-0d18c41167d3',
    ];
    const productCategoryIds = product.categories.map(
      (category) => category.id,
    );
    const isFemale = productCategoryIds.some((id) =>
      femaleCategoryIds.includes(id),
    );
    const isMale = productCategoryIds.some((id) =>
      maleCategoryIds.includes(id),
    );
    let gender = '';
    if (isFemale && isMale) {
      gender = 'Unisex';
    } else if (isFemale) {
      gender = 'Female';
    } else if (isMale) {
      gender = 'Male';
    }
    return gender;
  }
}
