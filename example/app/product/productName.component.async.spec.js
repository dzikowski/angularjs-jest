import { createTestApp } from '../angularjs-jest-snapshot'; // change to 'angularjs-jest' to use package from npm;
import ProductModule from './product.module';
import { products } from '../dataMocks';
import { ProductServicePromise } from '../serviceMocks';

describe('productName.component', () => {
  const [product] = products;

  const createTestAppWithProductService = (ProductService) => createTestApp({
    modules: [ProductModule],
    mocks: { ProductService },
  });

  it('should render product name with service based on `$q`', () => {
    const testApp = createTestAppWithProductService(($q) => ({
      getProduct: () => $q((resolve) => resolve(product)),
    }));

    const element = testApp.render(`<product-name product-id="'${product.id}'" />`);
    expect(element.html()).toContain(product.name);
  });

  it('should NOT render product name with service based on `new Promise`', () => {
    const testApp = createTestAppWithProductService(() => ({
      getProduct: () => new Promise((resolve) => resolve(product)),
    }));

    const element = testApp.render(`<product-name product-id="'${product.id}'" />`);
    expect(element.html()).toContain('Unknown product');
  });

  it('should NOT render product name with service based on `Promise.resolve`', () => {
    const testApp = createTestAppWithProductService(() => ({
      getProduct: () => Promise.resolve(product),
    }));

    const element = testApp.render(`<product-name product-id="'${product.id}'" />`);
    expect(element.html()).toContain('Unknown product');
  });

  it('should NOT render product name with service based on `$q` with setTimeout', () => {
    const testApp = createTestAppWithProductService(($q) => ({
      getProduct: () => $q((resolve) => setTimeout(() => resolve(product))),
    }));

    const element = testApp.render(`<product-name product-id="'${product.id}'" />`);
    expect(element.html()).toContain('Unknown product');
  });

  it('should render "Unknown product" and then product name with service based on Promise (2)', async () => {
    const testApp = createTestAppWithProductService(() => ProductServicePromise());
    const element = testApp.render(`<product-name product-id="'${product.id}'" />`);

    expect(element.html()).toContain('Unknown product');
    expect(element.html()).toContain(product.id);

    await testApp.eventually(() => expect(element.html()).toContain(product.name));
  });
});
