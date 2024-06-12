import { LineItem } from '@commercetools/platform-sdk';
import BaseComponentGenerator from '../../../tags/base-component';
import tags from '../../../tags/tags';

export default class MyCartContainer {
  public myCartContainer: HTMLDivElement;

  public myCartTable: BaseComponentGenerator;

  public myCartHeaderContainer: BaseComponentGenerator;

  constructor() {
    this.myCartContainer = tags
      .div(['cart__my-cart', 'my-cart'])
      .getElement() as HTMLDivElement;
    this.myCartTable = new BaseComponentGenerator({
      tag: 'table',
      classNames: ['my-cart__table'],
    });
    this.myCartHeaderContainer = tags.div(['my-cart__header'], '');
    this.myCartContainer.append(this.myCartHeaderContainer.getElement());
    this.myCartContainer.append(this.myCartTable.getElement());
  }

  public create() {
    this.createHeaderContainer();
    this.createTable();
  }

  private createHeaderContainer() {
    const header = tags.h2(['my-cart__header-title'], 'My Cart');
    const clearCartButton = tags.button(['my-cart__header-button'], '');
    this.myCartHeaderContainer.getElement().append(header);
    this.myCartHeaderContainer.getElement().append(clearCartButton);
  }

  private createTable() {
    const tableHeader = new BaseComponentGenerator({
      tag: 'tr',
      classNames: ['my-cart__table-header'],
    });
    tableHeader.getElement().innerHTML = `
      <th class="my-cart__table-header-cell my-cart__table-header-product">Product</th>
      <th class="my-cart__table-header-cell my-cart__table-header-size">Size</th>
      <th class="my-cart__table-header-cell my-cart__table-header-quantity">Quantity</th>
      <th class="my-cart__table-header-cell my-cart__table-header-price">Price</th>
      <th class="my-cart__table-header-cell my-cart__table-header-remove"></th>`;
    this.myCartTable.getElement().append(tableHeader.getElement());
  }

  public getContent(): HTMLElement {
    return this.myCartContainer;
  }

  public renderProducts(products: LineItem[]) {
    const tableRows = this.myCartTable
      .getElement()
      .querySelectorAll('.my-cart__table-row');
    if (tableRows) {
      tableRows.forEach((row) => {
        row.remove();
      });
    }
    if (products.length === 0) {
      this.myCartContainer.innerHTML = 'Cart is empty';
    }
    products.forEach((product: LineItem) => {
      this.createProductRow(product);
    });
  }

  public createProductRow(product: LineItem) {
    const productRow = new BaseComponentGenerator({
      tag: 'tr',
      classNames: ['my-cart__table-row'],
    });
    const productCellName = new BaseComponentGenerator({
      tag: 'td',
      classNames: ['my-cart__table-cell', 'my-cart__table-cell-product'],
    });
    const productNameTag = tags.p(['my-cart__table-cell-product-name'], '');
    productNameTag.textContent = product.name['en-US'];
    productCellName.getElement().append(productNameTag);
    productRow.getElement().append(productCellName.getElement());
    if (product.variant?.images && product.variant?.images.length > 0) {
      const productImage = new BaseComponentGenerator({
        tag: 'img',
        classNames: ['my-cart__table-cell-image'],
        attributes: {
          src: product.variant?.images[0].url,
        },
      }).getElement() as HTMLImageElement;
      productCellName.getElement().prepend(productImage);
    }
    if (product.variant?.attributes) {
      const size = product.variant?.attributes.find(
        (attr) => attr.name === 'Size',
      );
      if (size) {
        const productCellSize = new BaseComponentGenerator({
          tag: 'td',
          classNames: ['my-cart__table-cell', 'my-cart__table-cell-size'],
          content: size.value,
        });
        productRow.getElement().append(productCellSize.getElement());
      }
    }
    const quantityCell = new BaseComponentGenerator({
      tag: 'td',
      classNames: ['my-cart__table-cell', 'my-cart__table-cell-quantity'],
    });
    const quantity = String(product.quantity);
    const quantityTag = tags.p(['my-cart__quantity'], quantity);
    const buttonPlus = tags.button(
      ['my-cart__quantity_plus', 'my-cart__quantity_button'],
      '+',
    );
    const buttonMinus = tags.button(
      ['my-cart__quantity_minus', 'my-cart__quantity_button'],
      '-',
    );
    quantityCell.getElement().append(buttonMinus);
    quantityCell.getElement().append(quantityTag);
    quantityCell.getElement().append(buttonPlus);
    productRow.getElement().append(quantityCell.getElement());
    const priceCell = new BaseComponentGenerator({
      tag: 'td',
      classNames: ['my-cart__table-cell', 'my-cart__table-cell-price'],
      content: `$${product.totalPrice.centAmount / 100}`,
    });
    productRow.getElement().append(priceCell.getElement());
    const removeCell = new BaseComponentGenerator({
      tag: 'td',
      classNames: ['my-cart__table-cell', 'my-cart__table-cell-remove'],
    });
    productRow.getElement().append(removeCell.getElement());
    this.myCartTable.getElement().append(productRow.getElement());
  }
}
