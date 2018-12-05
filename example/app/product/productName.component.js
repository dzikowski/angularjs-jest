export default {
  template: `
    <span ng-if="$ctrl.name">{{ $ctrl.name }}</span>
    <span ng-if="!$ctrl.name">Unknown product <span class="text-muted">({{ $ctrl.productId }})</span></span>
  `,
  controller(ProductService) {
    'ngInject';

    this.$onChanges = () => {
      ProductService.getProduct(this.productId)
        .then((product) => {
          this.name = (product || {}).name;
        });
    };
  },
  bindings: {
    productId: '<',
  },
};
