export default {
  template: `
    <table class="table">
      <thead>
        <tr>
          <th scope="col" style="width: 10%;">#</th>
          <th scope="col" style="width: 50%;">Name</th>
          <th scope="col" style="width: 20%;">Quantity</thc>
          <th scope="col" style="width: 20%;">Price per unit</th>
        </tr>
      </thead>
      <tbody>
        <tr ng-repeat="item in $ctrl.items">
          <td scope="row">{{ $index + 1 }}</td>
          <td><product-name product-id="item.productId" /></td>
          <td class="text-right"><product-quantity product-id="item.productId" quantity="item.quantity" /></td>
          <td class="text-right"><product-price product-id="item.productId" /></td>
        </tr>
      </tbody>
    </table>
  `,
  controller(CartService) {
    'ngInject';

    this.$onInit = () => {
      CartService.getCart()
        .then((items) => {
          this.items = items;
        });
    };
  },
};
