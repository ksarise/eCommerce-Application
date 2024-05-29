import tags from '../../tags/tags';
import ProductCard from './components/ProductCard';
import Product from '../../global/interfaces/products';

export default class MainView {
  private mainContainer: HTMLDivElement;

  constructor() {
    this.mainContainer = tags
      .div(['main'], 'Main page', {})
      .getElement() as HTMLDivElement;
  }

  public getContent(): HTMLElement {
    return this.mainContainer;
  }

  public renderProducts(products: Product[]) {
    console.log('products', products);
    this.mainContainer.innerHTML = '';

    products.forEach((product: Product) => {
      const productCard = new ProductCard(
        product.name,
        product.desc,
        product.image,
        product.id,
        product.price,
        product.discount,
      );
      this.mainContainer.append(productCard.renderCard());
    });
  }
}
