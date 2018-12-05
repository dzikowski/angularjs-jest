import angular from 'angular';
import 'angular-mocks';
import ProductModule from './product.module';
import { ProductServiceInstant } from '../serviceMocks';
import { products } from '../dataMocks';

describe('productName.component', () => {
  const [product] = products;
  let scope;
  let compile;

  beforeEach(() => {
    angular.mock.module(ProductModule);

    angular.mock.module(($provide) => {
      $provide.factory('ProductService', ($q) => ProductServiceInstant($q));
    });

    angular.mock.inject(($rootScope, $compile) => {
      scope = $rootScope.$new();
      compile = $compile;
    });
  });

  it('should render product name', () => {
    const element = compile(`<product-name product-id="'${product.id}'" />`)(scope);
    scope.$digest();
    expect(element.html()).toContain(product.name);
  });

  it('should render information about missing product', () => {
    const missingId = 'missing-product-id';
    const element = compile(`<product-name product-id="'${missingId}'" />`)(scope);
    scope.$digest();

    expect(element.html()).toContain('Unknown product');
    expect(element.html()).toContain(missingId);
  });
});
