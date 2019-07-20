"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emitTest = emitTest;
exports.emitSuite = emitSuite;
exports.default = exports.opts = exports.displayName = void 0;

var _sideUtils = require("@seleniumhq/side-utils");

var _command = _interopRequireDefault(require("./command"));

var _location = _interopRequireDefault(require("./location"));

var _hook = require("./hook");

var _synthetics = _interopRequireDefault(require("./synthetics"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Define language options
const displayName = 'Node New Relic Synthetics';
exports.displayName = displayName;
global.nrsynthetics = _synthetics.default.commands();
let opts = {};
exports.opts = opts;
opts.emitter = _command.default;
opts.hooks = (0, _hook.generateHooks)();
opts.fileExtension = '.js';
opts.commandPrefixPadding = '  ';
opts.terminatingKeyword = '})';
opts.commentPrefix = '//';
opts.generateMethodDeclaration = generateMethodDeclaration; // Create generators for dynamic string creation of primary entities (e.g., filename, methods, test, and suite)

function generateTestDeclaration(name) {
  return `// Test Case: ${name}  \n.then(function (){\n\treturn Promise.resolve(true)\n`;
}

function generateMethodDeclaration(name) {
  // return `public void ${exporter.parsers.sanitizeName(name)}() {`
  const command = `function ${_sideUtils.codeExport.parsers.sanitizeName(name)}(){\n` + `\treturn Promise.resolve(true)`;
  return command;
}

function generateSuiteDeclaration(name) {
  return `\n`;
}

function generateFilename(name) {
  return `${_sideUtils.codeExport.parsers.capitalize(_sideUtils.codeExport.parsers.sanitizeName(name))}${opts.fileExtension}`;
} // Emit an individual test, wrapped in a suite (using the test name as the suite name)


async function emitTest({
  baseUrl,
  test,
  tests,
  project,
  enableOriginTracing
}) {
  global.nrsynthetics.setStep(1);
  global.baseUrl = baseUrl;
  const testDeclaration = generateTestDeclaration(test.name);
  const tcFooter = global.nrsynthetics.endOfTests().replace(/__TC_NAME__/g, test.name);
  let tmpOpts = Object.assign({}, opts, {
    terminatingKeyword: `${tcFooter}})\n`
  });
  var result = await _sideUtils.codeExport.emit.test(test, tests, _objectSpread2({}, tmpOpts, {
    testDeclaration,
    enableOriginTracing,
    project
  }));
  let {
    commands
  } = result;
  result.commands = commands.replace(/__STEP__/g, function () {
    return global.nrsynthetics.incrementStep();
  }).replace(/__TC_NAME__/g, test.name);
  const suiteName = test.name;
  const suiteDeclaration = generateSuiteDeclaration(suiteName);
  tmpOpts = Object.assign({}, opts, {
    terminatingKeyword: ''
  });

  const _suite = await _sideUtils.codeExport.emit.suite(result, tests, _objectSpread2({}, tmpOpts, {
    suiteDeclaration,
    suiteName,
    project
  }));

  return {
    filename: generateFilename(test.name),
    body: _sideUtils.codeExport.emit.orderedSuite(_suite)
  };
}

async function emitSuite({
  baseUrl,
  suite,
  tests,
  project,
  enableOriginTracing
}) {
  global.nrsynthetics.setStep(1);
  global.baseUrl = baseUrl;
  const tcFooter = global.nrsynthetics.endOfTests();
  let tmpOpts = Object.assign({}, opts, {
    terminatingKeyword: `${tcFooter}})\n`
  });
  var result = await _sideUtils.codeExport.emit.testsFromSuite(tests, suite, tmpOpts, {
    enableOriginTracing,
    generateTestDeclaration,
    project
  });
  var index = 0;

  for (let key in result) {
    let {
      commands,
      testEnd
    } = result[key];
    let testName = tests[index++].name;
    result[key].commands = commands.replace(/__STEP__/g, _ => {
      return global.nrsynthetics.incrementStep();
    }).replace(/__TC_NAME__/g, testName);
    result[key].testEnd = testEnd.replace(/__TC_NAME__/g, testName);
  }

  tmpOpts = Object.assign({}, opts, {
    terminatingKeyword: ' '
  });
  const suiteDeclaration = generateSuiteDeclaration(suite.name);

  const _suite = await _sideUtils.codeExport.emit.suite(result, tests, _objectSpread2({}, tmpOpts, {
    suiteDeclaration,
    suite,
    project
  }));

  return {
    filename: generateFilename(suite.name),
    body: _sideUtils.codeExport.emit.orderedSuite(_suite)
  };
}

var _default = {
  emit: {
    test: emitTest,
    suite: emitSuite,
    locator: _location.default.emit
  },
  register: {
    command: _command.default.register,
    variable: opts.hooks.declareVariables.register,
    dependency: opts.hooks.declareDependencies.register,
    beforeAll: opts.hooks.beforeAll.register,
    beforeEach: opts.hooks.beforeEach.register,
    afterEach: opts.hooks.afterEach.register,
    afterAll: opts.hooks.afterAll.register,
    inEachBegin: opts.hooks.inEachBegin.register,
    inEachEnd: opts.hooks.inEachEnd.register
  }
};
exports.default = _default;