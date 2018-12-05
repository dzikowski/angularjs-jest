import angular from 'angular';
import { PriceServiceDelay500, ProductServiceDelay500, UnitServiceDelay500 } from '../serviceMocks';
import ProductNameComponent from './productName.component';
import ProductPriceComponent from './productPrice.component';
import ProductQuantityComponent from './productQuantity.component';
import ProductUnitComponent from './productUnit.component';
import UnitShortNameComponent from './unitShortName.component';

export default angular
  .module('app.product', [])
  .service('PriceService', PriceServiceDelay500)
  .service('ProductService', ProductServiceDelay500)
  .service('UnitService', UnitServiceDelay500)
  .component('productName', ProductNameComponent)
  .component('productPrice', ProductPriceComponent)
  .component('productQuantity', ProductQuantityComponent)
  .component('productUnit', ProductUnitComponent)
  .component('unitShortName', UnitShortNameComponent)
  .name;
