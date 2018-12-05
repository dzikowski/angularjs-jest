

const createTestApp = require('./src/createTestApp');

module.exports = {
  createTestApp: createTestApp.default || createTestApp,
};
