# `log4evm: ethereum event logging`

> Logging configuration for Ethereum Network Events

## Usage

```js
const log4-evm = require('logging');
```

### log4evm

```javascript
const log4evm = require('log4-evm');
const config = {
    "appenders": {
        "console":{"type":"console"},
        "rpc": {"type": "rpc", socket_config: {"rpcHost":  process.env.RPC_HOST, "topic": "global-log"}}
    },
    "categories": {
        "default": {"appenders": ["console", "rpc"], "level": "info"},
    }
};

log4evm.configure(config);
const Log4evmError = require('../utils/log4evm-error-util');

const logger = log4evm.getLogger('default');
logger.info('111','22' ,{a:1}, new Log4evmError('11', 2));
logger.error('111','22' ,{a:1}, new Log4evmError('11', 2));
```


