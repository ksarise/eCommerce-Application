export interface Product {
  id: string;
  name: string;
  desc: string;
  image: string;
  price: string;
  discount: string;
}
export interface ParsedCategory {
  name: string;
  subCategories: string[];
}
