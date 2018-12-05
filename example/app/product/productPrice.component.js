export default {
  template: '<span class="number text-nowrap">$ {{ ($ctrl.price | number:2) || \'-\' }}</span>',
  controller(PriceService) {
    'ngInject';

    this.$onChanges = () => {
      PriceService.getPrice(this.productId)
        .then((price) => {
          this.price = (price || {}).price;
        });
    };
  },
  bindings: {
    productId: '<',
  },
};
