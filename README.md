# code-export-node-nr-synthetics
New Relic Synthetics language library  for Selenium IDE

This library implements the Selenium IDE [code export framework](https://www.seleniumhq.org/selenium-ide/docs/en/plugins/code-export/) see details [here](https://github.com/SeleniumHQ/selenium-ide/blob/v3/docs/introduction/code-export.md)

# Disclaimer
New Relic has open-sourced this integration to enable monitoring of this technology. This integration is provided AS-IS WITHOUT WARRANTY OR SUPPORT, although you can report issues and contribute to this integration via GitHub.

### Usage

```

const  codeExport = require('code-export-node-nr-synthetics')

...



  if (message.action === 'export') {
    let funcExport = (typeof message.options.suite != 'undefined')?codeExport.emitSuite : codeExport.emitTest
    funcExport(parseMessage(message)).then( sendResponse)
    return true
  }
});



```

See sample usage in [New Relic Synthetics formatter for Selenium IDE](https://github.com/tanben/nrsynthetics-for-seleniumide/blob/master/src/background/index.js)




