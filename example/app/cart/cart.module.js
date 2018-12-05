import angular from 'angular';
import ProductModule from '../product/product.module';
import CartComponent from './cart.component';
import { CartServiceDelay500 } from '../serviceMocks';

export default angular
  .module('app.cart', [ProductModule])
  .component('cart', CartComponent)
  .service('CartService', CartServiceDelay500)
  .name;
