import tags from '../../../tags/tags';

export default class PriceRangeSlider {
  public currentRange: { min: number; max: number; mean: number };

  private container: HTMLDivElement;

  private priceMinRange: HTMLInputElement;

  private priceMaxRange: HTMLInputElement;

  constructor() {
    this.currentRange = {
      min: 0,
      max: 1000,
      mean: 500,
    };

    this.priceMinRange = tags.input(['price-range-min'], {
      type: 'range',
      min: this.currentRange.min.toString(),
      max: this.currentRange.mean.toString(),
      value: this.currentRange.min.toString(),
    }) as HTMLInputElement;
    this.priceMinRange.dataset.optiontype = 'price';
    this.priceMaxRange = tags.input(['price-range-max'], {
      type: 'range',
      min: this.currentRange.mean.toString(),
      max: this.currentRange.max.toString(),
      value: this.currentRange.max.toString(),
    }) as HTMLInputElement;
    this.container = this.createPriceRangeSlider();
  }

  private createPriceRangeSlider(): HTMLDivElement {
    const priceRangeContainer = tags
      .div(['price-range-container'])
      .getElement() as HTMLDivElement;
    const priceRangeHeader = tags.h2(['price-range-header'], 'Price Range');

    this.priceMaxRange.dataset.optiontype = 'price';

    const minTooltip = tags.span(['tooltip', 'tooltip-min']);
    minTooltip.textContent = this.priceMinRange.value;

    const maxTooltip = tags.span(['tooltip', 'tooltip-max']);
    maxTooltip.textContent = this.priceMaxRange.value;

    const minRangeContainer = tags.div(['range-wrapper']).getElement();
    minRangeContainer.append(this.priceMinRange, minTooltip);

    const maxRangeContainer = tags.div(['range-wrapper']).getElement();
    maxRangeContainer.append(this.priceMaxRange, maxTooltip);

    const rangesContainer = tags.div(['price-ranges']).getElement();
    rangesContainer.append(minRangeContainer, maxRangeContainer);
    priceRangeContainer.append(priceRangeHeader, rangesContainer);

    this.priceMinRange.addEventListener('input', () => {
      minTooltip.innerHTML = ` From <br>$${this.priceMinRange.value}`;
      this.updateSliderStyles();
    });

    this.priceMaxRange.addEventListener('input', () => {
      maxTooltip.innerHTML = ` To<br>$${this.priceMaxRange.value}`;
      this.updateSliderStyles();
    });

    this.updateSliderStyles();

    return priceRangeContainer;
  }

  public updateSliderStyles() {
    const minValue =
      ((Number(this.priceMinRange.value) - Number(this.priceMinRange.min)) /
        (Number(this.priceMinRange.max) - Number(this.priceMinRange.min))) *
      100;

    const maxValue =
      ((Number(this.priceMaxRange.value) - Number(this.priceMaxRange.min)) /
        (Number(this.priceMaxRange.max) - Number(this.priceMaxRange.min))) *
      100;
    const primaryColor = '#b88e2f';
    this.priceMaxRange.style.background = `linear-gradient(to right, ${primaryColor} 0%, ${primaryColor} ${maxValue}%, #ddd ${maxValue}%, #ddd 100%)`;
    this.priceMinRange.style.background = `linear-gradient(to right, #ddd 0%, #ddd ${minValue}%, ${primaryColor} ${minValue}%, ${primaryColor} 100%)`;
  }

  getElement(): HTMLDivElement {
    return this.container;
  }

  public updateCurentRange(min: number, max: number, mean: number) {
    this.currentRange = {
      min,
      max,
      mean,
    };
    if (min && max && mean) {
      this.setSlidersRanges(min, max, mean);
    }
  }

  private setSlidersRanges(min: number, max: number, mean: number) {
    this.priceMinRange.setAttribute('min', Math.floor(min / 100).toString());
    this.priceMinRange.setAttribute('max', Math.floor(mean / 100).toString());
    this.priceMinRange.setAttribute('value', Math.floor(min / 100).toString());
    this.priceMaxRange.setAttribute('min', Math.floor(mean / 100).toString());
    this.priceMaxRange.setAttribute('max', Math.round(max / 100).toString());
    this.priceMaxRange.setAttribute('value', Math.round(max / 100).toString());
    this.container.querySelector('.tooltip-min')!.innerHTML =
      ` From <br>$${Math.floor(min / 100)}`;
    this.container.querySelector('.tooltip-max')!.innerHTML =
      ` To <br>$${Math.round(max / 100)}`;
    this.updateSliderStyles();
  }
}
