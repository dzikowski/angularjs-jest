import {
  items, prices, products, units,
} from './dataMocks';

/* @ngInject */
export const CartServiceDelay500 = ($q) => ({
  getCart() {
    return $q((resolve) => setTimeout(() => resolve(items), 500));
  },
});

/* @ngInject */
export const CartServiceInstant = ($q) => ({
  getCart() {
    return $q((resolve) => resolve(items));
  },
});

/* @ngInject */
export const PriceServiceDelay500 = ($q) => ({
  getPrice(productId) {
    return $q((resolve) => setTimeout(() => resolve(prices.find((p) => p.productId === productId)), 500));
  },
});

/* @ngInject */
export const PriceServiceInstant = ($q) => ({
  getPrice(productId) {
    return $q((resolve) => resolve(prices.find((p) => p.productId === productId)));
  },
});

/* @ngInject */
export const ProductServiceDelay500 = ($q) => ({
  getProduct(productId) {
    return $q((resolve) => setTimeout(() => resolve(products.find((p) => p.id === productId)), 500));
  },
});

/* @ngInject */
export const ProductServiceDelay200 = ($q) => ({
  getProduct(productId) {
    return $q((resolve) => setTimeout(() => resolve(products.find((p) => p.id === productId)), 200));
  },
});

/* @ngInject */
export const ProductServiceInstant = ($q) => ({
  getProduct(productId) {
    return $q((resolve) => resolve(products.find((p) => p.id === productId)));
  },
});

export const ProductServicePromise = () => ({
  getProduct(productId) {
    return new Promise((resolve) => resolve(products.find((p) => p.id === productId)));
  },
});

/* @ngInject */
export const UnitServiceDelay500 = ($q) => ({
  getUnit(unitId) {
    return $q((resolve) => setTimeout(() => resolve(units.find((p) => p.id === unitId)), 500));
  },
});

/* @ngInject */
export const UnitServiceDelay200 = ($q) => ({
  getUnit(unitId) {
    return $q((resolve) => setTimeout(() => resolve(units.find((p) => p.id === unitId)), 200));
  },
});

/* @ngInject */
export const UnitServiceInstant = ($q) => ({
  getUnit(unitId) {
    return $q((resolve) => resolve(units.find((p) => p.id === unitId)));
  },
});
