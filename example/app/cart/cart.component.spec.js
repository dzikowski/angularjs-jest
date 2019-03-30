import { createTestApp } from '../angularjs-jest-snapshot'; // change to 'angularjs-jest' to use package from npm;
import CartModule from './cart.module';
import {
  CartServiceInstant, PriceServiceInstant, ProductServiceInstant, UnitServiceInstant,
} from '../serviceMocks';

describe('cart.component', () => {
  const testAppWithInstants = () => createTestApp({
    modules: [CartModule],
    mocks: {
      CartService: ($q) => CartServiceInstant($q),
      ProductService: ($q) => ProductServiceInstant($q),
      PriceService: ($q) => PriceServiceInstant($q),
      UnitService: ($q) => UnitServiceInstant($q),
    },
  });

  // this test works because we use $q(), which is synchronous
  it('should render cart', () => {
    const testApp = testAppWithInstants();
    const element = testApp.render('<cart />');
    expect(element).toMatchSnapshot();
  });
});
