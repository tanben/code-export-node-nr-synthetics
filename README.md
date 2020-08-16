# code-export-node-nr-synthetics
[![NPM](https://img.shields.io/badge/dynamic/json?color=red&label=NPM&query=engines.npm&url=https%3A%2F%2Fraw.githubusercontent.com%2Ftanben%2Fcode-export-node-nr-synthetics%2Fmaster%2Fpackage.json)]()
[![Version](https://img.shields.io/badge/dynamic/json?color=blue&label=Version&query=version&url=https%3A%2F%2Fraw.githubusercontent.com%2Ftanben%2Fcode-export-node-nr-synthetics%2Fmaster%2Fpackage.json)]()

New Relic Synthetics language library  for Selenium IDE


This library implements the Selenium IDE [code export framework](https://www.seleniumhq.org/selenium-ide/docs/en/plugins/code-export/) see details [here](https://github.com/SeleniumHQ/selenium-ide/blob/v3/docs/introduction/code-export.md)


# Usage

```

const  codeExport = require('@tanben/code-export-node-nr-synthetics')


  if (message.action === 'export') {
    let funcExport = (typeof message.options.suite != 'undefined')?codeExport.emitSuite : codeExport.emitTest
    funcExport(parseMessage(message)).then( sendResponse)
    return true
  }
});



```




