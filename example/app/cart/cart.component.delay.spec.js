import { createTestApp } from '../angularjs-jest-snapshot'; // change to 'angularjs-jest' to use package from npm;
import CartModule from './cart.module';
import {
  CartServiceDelay500,
  PriceServiceDelay500,
  ProductServicePromise,
  UnitServiceDelay200,
} from '../serviceMocks';


describe('cart.component', () => {
  const testAppWithDelays = () => createTestApp({
    modules: [CartModule],
    mocks: {
      CartService: ($q) => CartServiceDelay500($q),
      ProductService: () => ProductServicePromise(),
      PriceService: ($q) => PriceServiceDelay500($q),
      UnitService: ($q) => UnitServiceDelay200($q),
    },
  });

  const patience = { interval: 200, limit: 10 };

  it('should render cart', async () => {
    const testApp = testAppWithDelays();
    const element = testApp.render('<cart />');

    // wait until all information is loaded
    await testApp.eventually(() => {
      const text = element.text().replace(/\s+/g, ' ');
      expect(text).toContain('3 Finishing coat 0.25 kg $ 1.99');
    }, patience);

    expect(element).toMatchSnapshot();
  });
});
