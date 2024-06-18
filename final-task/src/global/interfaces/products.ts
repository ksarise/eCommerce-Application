export interface Product {
  id: string;
  name: string;
  desc: string;
  image: string;
  price: string;
  discount: string;
  sizesList: string[];
}
export interface ParsedCategory {
  name: string;
  subCategories: SubCategory[];
}
interface SubCategory {
  id: string;
  name: string;
}
