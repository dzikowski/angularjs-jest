export default {
  template: '<unit-short-name unit-id=$ctrl.unitId />',
  controller(ProductService) {
    'ngInject';

    this.$onChanges = () => {
      ProductService.getProduct(this.productId)
        .then((product) => {
          this.unitId = (product || {}).unitId;
        });
    };
  },
  bindings: {
    productId: '<',
  },
};
