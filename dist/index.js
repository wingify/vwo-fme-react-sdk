
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./vwo-fme-react-sdk.cjs.production.min.js')
} else {
  module.exports = require('./vwo-fme-react-sdk.cjs.development.js')
}
