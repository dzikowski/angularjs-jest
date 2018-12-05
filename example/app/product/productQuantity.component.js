export default {
  template: `
    <span class="value-unit-pair">
      <span class="value number">{{ $ctrl.quantity | number:2 }}</span>
      <product-unit class="unit" product-id="$ctrl.productId"/>
    </span>`,
  bindings: {
    productId: '<',
    quantity: '<',
  },
};
