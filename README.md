# code-export-node-nr-synthetics
New Relic Synthetics language library  for Selenium IDE

This library implements the Selenium IDE [code export framework](https://www.seleniumhq.org/selenium-ide/docs/en/plugins/code-export/)


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

see sample usage [here](https://github.com/tanben/syntheticsformatter-for-seleniumide/blob/master/src/background/index.js)



