import { createTestApp } from '../angularjs-jest-snapshot'; // change to 'angularjs-jest' to use package from npm;
import ProductModule from './product.module';
import { products } from '../dataMocks';
import { ProductServiceDelay200, UnitServiceDelay500 } from '../serviceMocks';

describe('productQuantity.component', () => {
  const [, product] = products;
  const patience = { interval: 200, limit: 10 };

  const appWithDelays = {
    modules: [ProductModule],
    mocks: {
      ProductService: ($q) => ProductServiceDelay200($q),
      UnitService: ($q) => UnitServiceDelay500($q),
    },
  };

  it('should render product quantity', async () => {
    const testApp = createTestApp(appWithDelays);
    const element = testApp.render(`
      <product-name product-id="'${product.id}'"></product-name>
      <product-quantity product-id="'${product.id}'" quantity="20"></product-quantity>
    `);

    const start = new Date().getTime();

    await testApp.eventually(() => {
      const text = element.text().trim().replace(/\s+/g, ' ');
      console.log(`[${new Date().getTime() - start}ms] ${text}`);
      expect(text).toEqual('Pliers 20.00 pcs');
    }, patience);
  });

  it('should match snapshot', async () => {
    const testApp = createTestApp(appWithDelays);
    const element = testApp.render(`<product-quantity product-id="'${product.id}'" quantity="20"></product-quantity>`);

    await testApp.eventually(() => {
      const text = element.text().trim().replace(/\s+/g, ' ');
      expect(text).toEqual('20.00 pcs');
    }, patience);

    expect(element).toMatchSnapshot();
  });
});
