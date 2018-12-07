import angular from 'angular';
import 'angular-mocks';
import snapshotSerializer from './snapshotSerializer';

const render = ($compile, $scope) => (html) => {
  const element = $compile(html)($scope);
  $scope.$digest();
  return element;
};

const eventually = ($scope) => (fn, interval, limit) => new Promise((resolve, reject) => {
  const check = (iteration = 0) => {
    $scope.$digest();
    try {
      resolve(fn());
    } catch (e) {
      if (iteration >= limit) {
        console.warn(`[eventually] ${iteration} iteration reached with exception`);
        reject(e);
      } else {
        setTimeout(() => check(iteration + 1), interval);
      }
    }
  };

  check();
});

expect.addSnapshotSerializer(snapshotSerializer);

export default ({ modules, mocks, access }) => {
  (modules || []).forEach((module) => angular.mock.module(module));

  const mockNames = Object.keys(mocks || {});

  angular.mock.module(($provide) => {
    mockNames.forEach((mockName) => {
      const mockBuilder = typeof mocks[mockName] === 'function' ? mocks[mockName] : () => mocks[mockName];
      $provide.factory(mockName, mockBuilder);
    });
  });

  const app = {};

  const otherNames = [...new Set([...mockNames, ...(access || [])])];

  angular.mock.inject(['$rootScope', '$compile', ...otherNames, ($rootScope, $compile, ...other) => {
    app.$scope = $rootScope.$new();

    otherNames.forEach((name, index) => {
      app[name] = other[index];
    });

    app.render = (html) => render($compile, app.$scope)(html);

    app.eventually = (fn, config = { }) => {
      const interval = config.interval || 0;
      const limit = config.limit || 10;
      return eventually(app.$scope)(fn, interval, limit);
    };
  }]);

  return app;
};
