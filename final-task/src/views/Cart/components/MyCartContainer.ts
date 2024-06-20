import { Cart, LineItem } from '@commercetools/platform-sdk';
import BaseComponentGenerator from '../../../tags/base-component';
import tags from '../../../tags/tags';
import parseSVG from '../../../services/svgParser';

export default class MyCartContainer {
  public myCartContainer: HTMLDivElement;

  public myCartTable: BaseComponentGenerator;

  public myCartHeaderContainer: BaseComponentGenerator;

  public handleClickQuantity:
    | ((productId: string, delta: number) => void)
    | undefined;

  public handleClickRemove: ((productId: string) => void) | undefined;

  public handleClickClearCart: (() => void) | undefined;

  public handleClickProduct: ((productId: string) => void) | undefined;

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
    const clearCartButton = tags.button(
      ['my-cart__header-button'],
      'Clear Cart',
    );
    clearCartButton.addEventListener('click', () => {
      if (this.handleClickClearCart) {
        this.handleClickClearCart();
      }
    });
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
    productRow.getElement().setAttribute('data-line-item-id', product.id);
    const productCellName = new BaseComponentGenerator({
      tag: 'td',
      classNames: ['my-cart__table-cell', 'my-cart__table-cell-product'],
    });
    const productNameTag = tags.p(['my-cart__table-cell-product-name'], '');
    productNameTag.textContent = product.name['en-US'];
    productCellName.getElement().append(productNameTag);
    if (this.handleClickProduct) {
      productCellName.getElement().addEventListener('click', () => {
        if (this.handleClickProduct) {
          this.handleClickProduct(product.productId);
        }
      });
    }
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
        (attr) => attr.name === 'SpecsTable_Size',
      )?.value;
      console.log(size);
      if (size) {
        const productCellSize = new BaseComponentGenerator({
          tag: 'td',
          classNames: ['my-cart__table-cell', 'my-cart__table-cell-size'],
          content: size.key,
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
    buttonPlus.addEventListener('click', () => {
      if (this.handleClickQuantity) {
        this.handleClickQuantity(product.id, 1);
      }
    });
    const buttonMinus = tags.button(
      ['my-cart__quantity_minus', 'my-cart__quantity_button'],
      '-',
    );
    buttonMinus.addEventListener('click', () => {
      if (this.handleClickQuantity) {
        this.handleClickQuantity(product.id, -1);
      }
    });
    quantityCell.getElement().append(buttonMinus);
    quantityCell.getElement().append(quantityTag);
    quantityCell.getElement().append(buttonPlus);
    productRow.getElement().append(quantityCell.getElement());
    const priceCell = new BaseComponentGenerator({
      tag: 'td',
      classNames: ['my-cart__table-cell', 'my-cart__table-cell-price'],
      content: `$${product.totalPrice.centAmount / 100}`,
    });
    if (
      product.price.discounted?.value.centAmount ||
      Math.ceil(product?.price.value.centAmount || 0) * product!.quantity >
        Math.ceil(product!.totalPrice.centAmount)
    ) {
      const realPrice = tags.div(
        ['my-cart__table-cell', 'my-cart__table-cell-realprice'],
        `$${((product.price.value.centAmount / 100) * product.quantity).toFixed(2)}`,
      );
      priceCell.appendChild(realPrice);
      priceCell
        .getElement()
        .classList.toggle('my-cart__table-cell-discount', true);
    }
    productRow.getElement().append(priceCell.getElement());
    const removeCell = new BaseComponentGenerator({
      tag: 'td',
      classNames: ['my-cart__table-cell', 'my-cart__table-cell-remove'],
    });
    const svgRemoveCode = `<svg fill="#b88e2f" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 width="800px" height="800px" viewBox="0 0 408.483 408.483"
	 xml:space="preserve">
    <g>
      <g>
        <path d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316
          H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293
          c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329
          c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355
          c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356
          c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"/>
        <path class="kryshka" d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916
          c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"/>
      </g>
    </g>
    </svg>`;
    const svgCartElement = parseSVG(svgRemoveCode);
    svgCartElement.classList.add('img_rubbish');
    svgCartElement.addEventListener('click', () => {
      if (this.handleClickRemove) {
        this.handleClickRemove(product.id);
      }
    });
    removeCell.getElement().append(svgCartElement);
    productRow.getElement().append(removeCell.getElement());
    this.myCartTable.getElement().append(productRow.getElement());
  }

  public changeQuantity(
    lineItemId: string,
    quantity: number,
    cart: Cart,
    totalCostLineItem?: number,
  ) {
    const tmpLineItem = cart.lineItems.find((item) => item.id === lineItemId);
    const row = this.myCartTable
      .getElement()
      .querySelector(`[data-line-item-id="${lineItemId}"]`);
    if (row) {
      if (quantity === 0 || totalCostLineItem === 0) {
        row.remove();
      }
      const quantityCell = row.querySelector(
        '.my-cart__quantity',
      ) as HTMLTableCellElement;
      const totalCostCell = row.querySelector(
        '.my-cart__table-cell-price',
      ) as HTMLTableCellElement;
      quantityCell.textContent = `${quantity}`;
      totalCostCell.textContent = `$${totalCostLineItem}`;
      if (
        tmpLineItem!.price.discounted?.value.centAmount ||
        Math.ceil(tmpLineItem?.price.value.centAmount || 0) *
          tmpLineItem!.quantity >
          Math.ceil(tmpLineItem!.totalPrice.centAmount)
      ) {
        const realPrice = tags
          .div(
            ['my-cart__table-cell', 'my-cart__table-cell-realprice'],
            `$${((tmpLineItem!.price.value.centAmount / 100) * tmpLineItem!.quantity).toFixed(2)}`,
          )
          .getElement();
        totalCostCell.appendChild(realPrice);
        totalCostCell.classList.toggle('my-cart__table-cell-discount', true);
      } else {
        totalCostCell.classList.toggle('my-cart__table-cell-discount', false);
      }
    }
  }
}
